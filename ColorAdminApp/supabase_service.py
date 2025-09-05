"""
Serviço para integração com Supabase
"""
import logging
from django.conf import settings
from .supabase_config import get_supabase_client, get_supabase_service_client
import bcrypt
from datetime import datetime

logger = logging.getLogger(__name__)

class SupabaseService:
    """Serviço para operações com Supabase"""
    
    def __init__(self):
        self.client = get_supabase_client()
        self.service_client = get_supabase_service_client()
    
    def authenticate_user(self, email, password):
        """Autenticar usuário no Supabase"""
        try:
            # Buscar usuário por email
            response = self.service_client.table('users').select('*').eq('email', email).execute()
            
            if not response.data:
                return None
            
            user_data = response.data[0]
            
            # Verificar senha
            if self._verify_password(password, user_data['password_hash']):
                # Remover hash da senha dos dados retornados
                user_data.pop('password_hash', None)
                return user_data
            
            return None
            
        except Exception as e:
            logger.error(f"Erro na autenticação Supabase: {str(e)}")
            return None
    
    def get_user_by_email(self, email):
        """Buscar usuário por email"""
        try:
            response = self.client.table('users').select('*').eq('email', email).execute()
            return response.data[0] if response.data else None
        except Exception as e:
            logger.error(f"Erro ao buscar usuário: {str(e)}")
            return None
    
    def get_user_permissions(self, user_id):
        """Obter permissões do usuário"""
        try:
            response = self.client.rpc('user_has_permission', {
                'user_id': user_id,
                'permission_name': 'dashboard.view'
            }).execute()
            
            return response.data
        except Exception as e:
            logger.error(f"Erro ao buscar permissões: {str(e)}")
            return []
    
    def create_user(self, user_data):
        """Criar novo usuário no Supabase"""
        try:
            # Hash da senha
            password_hash = self._hash_password(user_data['password'])
            user_data['password_hash'] = password_hash
            user_data.pop('password', None)
            
            # Definir valores padrão
            user_data.setdefault('is_active', True)
            user_data.setdefault('is_verified', False)
            user_data.setdefault('created_at', datetime.now().isoformat())
            user_data.setdefault('updated_at', datetime.now().isoformat())
            
            response = self.service_client.table('users').insert(user_data).execute()
            return response.data[0] if response.data else None
            
        except Exception as e:
            logger.error(f"Erro ao criar usuário: {str(e)}")
            return None
    
    def update_user(self, user_id, user_data):
        """Atualizar usuário no Supabase"""
        try:
            user_data['updated_at'] = datetime.now().isoformat()
            
            response = self.service_client.table('users').update(user_data).eq('id', user_id).execute()
            return response.data[0] if response.data else None
            
        except Exception as e:
            logger.error(f"Erro ao atualizar usuário: {str(e)}")
            return None
    
    def get_access_levels(self):
        """Obter todos os níveis de acesso"""
        try:
            response = self.client.table('access_levels').select('*').order('level_order').execute()
            return response.data
        except Exception as e:
            logger.error(f"Erro ao buscar níveis de acesso: {str(e)}")
            return []
    
    def get_permissions(self):
        """Obter todas as permissões"""
        try:
            response = self.client.table('permissions').select('*').order('module', 'action').execute()
            return response.data
        except Exception as e:
            logger.error(f"Erro ao buscar permissões: {str(e)}")
            return []
    
    def get_user_access_level_permissions(self, access_level_id):
        """Obter permissões de um nível de acesso"""
        try:
            response = self.client.table('access_level_permissions').select(
                'permission:permissions(*)'
            ).eq('access_level_id', access_level_id).eq('granted', True).execute()
            
            return [item['permission'] for item in response.data]
        except Exception as e:
            logger.error(f"Erro ao buscar permissões do nível: {str(e)}")
            return []
    
    def log_access(self, log_data):
        """Registrar log de acesso"""
        try:
            log_data['created_at'] = datetime.now().isoformat()
            response = self.service_client.table('access_logs').insert(log_data).execute()
            return response.data[0] if response.data else None
        except Exception as e:
            logger.error(f"Erro ao registrar log: {str(e)}")
            return None
    
    def create_session(self, session_data):
        """Criar sessão no Supabase"""
        try:
            session_data['created_at'] = datetime.now().isoformat()
            response = self.service_client.table('user_sessions').insert(session_data).execute()
            return response.data[0] if response.data else None
        except Exception as e:
            logger.error(f"Erro ao criar sessão: {str(e)}")
            return None
    
    def validate_session(self, session_token):
        """Validar sessão no Supabase"""
        try:
            response = self.client.table('user_sessions').select(
                'user:users(*)'
            ).eq('session_token', session_token).eq('is_active', True).execute()
            
            if response.data:
                session_data = response.data[0]
                # Verificar se não expirou
                expires_at = datetime.fromisoformat(session_data['expires_at'].replace('Z', '+00:00'))
                if datetime.now(expires_at.tzinfo) < expires_at:
                    return session_data['user']
            
            return None
            
        except Exception as e:
            logger.error(f"Erro ao validar sessão: {str(e)}")
            return None
    
    def invalidate_session(self, session_token):
        """Invalidar sessão no Supabase"""
        try:
            response = self.service_client.table('user_sessions').update({
                'is_active': False
            }).eq('session_token', session_token).execute()
            
            return len(response.data) > 0
            
        except Exception as e:
            logger.error(f"Erro ao invalidar sessão: {str(e)}")
            return False
    
    def _hash_password(self, password):
        """Hash da senha usando bcrypt"""
        salt = bcrypt.gensalt()
        return bcrypt.hashpw(password.encode('utf-8'), salt).decode('utf-8')
    
    def _verify_password(self, password, password_hash):
        """Verificar senha usando bcrypt"""
        try:
            return bcrypt.checkpw(password.encode('utf-8'), password_hash.encode('utf-8'))
        except Exception as e:
            logger.error(f"Erro ao verificar senha: {str(e)}")
            return False
    
    def sync_django_to_supabase(self, django_user):
        """Sincronizar usuário do Django para o Supabase"""
        try:
            user_data = {
                'email': django_user.email,
                'first_name': django_user.first_name,
                'last_name': django_user.last_name,
                'phone': django_user.phone or '',
                'access_level_id': django_user.access_level.id,
                'church_code': django_user.church_code or '',
                'church_name': django_user.church_name or '',
                'is_active': django_user.is_active,
                'is_verified': django_user.is_verified,
                'last_login': django_user.last_login.isoformat() if django_user.last_login else None,
                'updated_at': datetime.now().isoformat()
            }
            
            # Verificar se usuário já existe
            existing_user = self.get_user_by_email(django_user.email)
            
            if existing_user:
                # Atualizar
                return self.update_user(existing_user['id'], user_data)
            else:
                # Criar novo (sem senha, pois não temos acesso ao hash)
                user_data['password_hash'] = ''  # Será definido no primeiro login
                return self.create_user(user_data)
                
        except Exception as e:
            logger.error(f"Erro ao sincronizar usuário: {str(e)}")
            return None
