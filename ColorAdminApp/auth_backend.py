"""
Backend de autenticação customizado para integração com Supabase
"""
import logging
from django.contrib.auth.backends import BaseBackend
from django.contrib.auth import get_user_model
from django.conf import settings
from .models import User, AccessLog
from .supabase_service import SupabaseService
import hashlib
import secrets
from datetime import datetime, timedelta

logger = logging.getLogger(__name__)
User = get_user_model()

class SupabaseAuthBackend(BaseBackend):
    """Backend de autenticação usando Supabase"""
    
    def authenticate(self, request, email=None, password=None, **kwargs):
        """Autenticar usuário via Supabase"""
        if not email or not password:
            return None
        
        try:
            # Verificar credenciais no Supabase
            supabase_service = SupabaseService()
            user_data = supabase_service.authenticate_user(email, password)
            
            if not user_data:
                self._log_access_attempt(email, 'login_failed', request, success=False)
                return None
            
            # Buscar ou criar usuário no Django
            user = self._get_or_create_user(user_data)
            
            if user and user.is_active:
                # Atualizar último login
                user.last_login = datetime.now()
                user.save(update_fields=['last_login'])
                
                # Log de acesso bem-sucedido
                self._log_access_attempt(email, 'login_success', request, user=user)
                
                return user
            
        except Exception as e:
            logger.error(f"Erro na autenticação: {str(e)}")
            self._log_access_attempt(email, 'login_error', request, success=False, error=str(e))
        
        return None
    
    def get_user(self, user_id):
        """Obter usuário por ID"""
        try:
            return User.objects.get(pk=user_id, is_active=True)
        except User.DoesNotExist:
            return None
    
    def _get_or_create_user(self, user_data):
        """Buscar ou criar usuário baseado nos dados do Supabase"""
        try:
            user = User.objects.get(email=user_data['email'])
            
            # Atualizar dados se necessário
            updated = False
            if user.first_name != user_data.get('first_name', ''):
                user.first_name = user_data.get('first_name', '')
                updated = True
            if user.last_name != user_data.get('last_name', ''):
                user.last_name = user_data.get('last_name', '')
                updated = True
            if user.church_code != user_data.get('church_code', ''):
                user.church_code = user_data.get('church_code', '')
                updated = True
            if user.church_name != user_data.get('church_name', ''):
                user.church_name = user_data.get('church_name', '')
                updated = True
            
            if updated:
                user.save()
            
            return user
            
        except User.DoesNotExist:
            # Criar novo usuário
            return self._create_user_from_supabase(user_data)
    
    def _create_user_from_supabase(self, user_data):
        """Criar novo usuário baseado nos dados do Supabase"""
        try:
            from .models import AccessLevel
            
            # Buscar nível de acesso padrão (MUSICIAN)
            try:
                default_level = AccessLevel.objects.get(name='MUSICIAN')
            except AccessLevel.DoesNotExist:
                # Se não existir, usar o primeiro nível disponível
                default_level = AccessLevel.objects.first()
                if not default_level:
                    logger.error("Nenhum nível de acesso encontrado no sistema")
                    return None
            
            user = User.objects.create(
                email=user_data['email'],
                first_name=user_data.get('first_name', ''),
                last_name=user_data.get('last_name', ''),
                phone=user_data.get('phone', ''),
                access_level=default_level,
                church_code=user_data.get('church_code', ''),
                church_name=user_data.get('church_name', ''),
                is_verified=user_data.get('is_verified', False),
                is_active=user_data.get('is_active', True)
            )
            
            logger.info(f"Novo usuário criado: {user.email}")
            return user
            
        except Exception as e:
            logger.error(f"Erro ao criar usuário: {str(e)}")
            return None
    
    def _log_access_attempt(self, email, action, request, user=None, success=True, error=None):
        """Registrar tentativa de acesso"""
        try:
            AccessLog.objects.create(
                user=user,
                action=action,
                module='auth',
                ip_address=self._get_client_ip(request),
                user_agent=request.META.get('HTTP_USER_AGENT', ''),
                success=success,
                error_message=error or ''
            )
        except Exception as e:
            logger.error(f"Erro ao registrar log de acesso: {str(e)}")
    
    def _get_client_ip(self, request):
        """Obter IP do cliente"""
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            ip = x_forwarded_for.split(',')[0]
        else:
            ip = request.META.get('REMOTE_ADDR')
        return ip

class SessionManager:
    """Gerenciador de sessões customizado"""
    
    @staticmethod
    def create_session(user, request):
        """Criar nova sessão para o usuário"""
        from .models import UserSession
        
        # Gerar token único
        token = secrets.token_urlsafe(32)
        
        # Definir expiração (24 horas por padrão)
        expires_at = datetime.now() + timedelta(seconds=settings.SESSION_COOKIE_AGE)
        
        # Criar sessão
        session = UserSession.objects.create(
            user=user,
            session_token=token,
            expires_at=expires_at,
            ip_address=SessionManager._get_client_ip(request),
            user_agent=request.META.get('HTTP_USER_AGENT', '')
        )
        
        return session
    
    @staticmethod
    def validate_session(token):
        """Validar sessão pelo token"""
        from .models import UserSession
        
        try:
            session = UserSession.objects.get(
                session_token=token,
                is_active=True
            )
            
            if session.is_expired():
                session.is_active = False
                session.save()
                return None
            
            return session.user
            
        except UserSession.DoesNotExist:
            return None
    
    @staticmethod
    def invalidate_session(token):
        """Invalidar sessão"""
        from .models import UserSession
        
        try:
            session = UserSession.objects.get(session_token=token)
            session.is_active = False
            session.save()
            return True
        except UserSession.DoesNotExist:
            return False
    
    @staticmethod
    def invalidate_user_sessions(user):
        """Invalidar todas as sessões de um usuário"""
        from .models import UserSession
        
        UserSession.objects.filter(user=user, is_active=True).update(is_active=False)
    
    @staticmethod
    def _get_client_ip(request):
        """Obter IP do cliente"""
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            ip = x_forwarded_for.split(',')[0]
        else:
            ip = request.META.get('REMOTE_ADDR')
        return ip
