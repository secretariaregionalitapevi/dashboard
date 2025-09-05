"""
Comando Django para configurar o Supabase
"""
from django.core.management.base import BaseCommand, CommandError
from django.conf import settings
import os
import logging

from ColorAdminApp.supabase_service import SupabaseService
from ColorAdminApp.supabase_config import get_supabase_service_client

logger = logging.getLogger(__name__)

class Command(BaseCommand):
    help = 'Configurar e testar conexão com Supabase'

    def add_arguments(self, parser):
        parser.add_argument(
            '--test-only',
            action='store_true',
            help='Apenas testar conexão, não criar usuários',
        )
        parser.add_argument(
            '--create-admin',
            action='store_true',
            help='Criar usuário administrador',
        )
        parser.add_argument(
            '--check-structure',
            action='store_true',
            help='Verificar estrutura do banco de dados',
        )

    def handle(self, *args, **options):
        self.stdout.write(
            self.style.SUCCESS('🚀 Iniciando configuração do Supabase...')
        )

        # Verificar variáveis de ambiente
        if not self._check_environment():
            raise CommandError('❌ Variáveis de ambiente não configuradas')

        # Testar conexão
        if not self._test_connection():
            raise CommandError('❌ Falha na conexão com Supabase')

        # Verificar estrutura do banco
        if options['check_structure'] or not options['test_only']:
            if not self._check_database_structure():
                raise CommandError('❌ Estrutura do banco incorreta')

        # Criar usuário administrador
        if options['create_admin'] or not options['test_only']:
            self._create_admin_user()

        self.stdout.write(
            self.style.SUCCESS('✅ Configuração do Supabase concluída!')
        )

    def _check_environment(self):
        """Verificar variáveis de ambiente"""
        required_vars = ['SUPABASE_URL', 'SUPABASE_ANON_KEY', 'SUPABASE_SERVICE_KEY']
        missing_vars = []

        for var in required_vars:
            if not os.getenv(var):
                missing_vars.append(var)

        if missing_vars:
            self.stdout.write(
                self.style.ERROR('❌ Variáveis de ambiente obrigatórias não encontradas:')
            )
            for var in missing_vars:
                self.stdout.write(f'   - {var}')
            self.stdout.write('\n📝 Configure as variáveis de ambiente ou crie um arquivo .env')
            self.stdout.write('   Use o arquivo env_example.txt como referência')
            return False

        self.stdout.write('✅ Variáveis de ambiente configuradas')
        return True

    def _test_connection(self):
        """Testar conexão com Supabase"""
        try:
            client = get_supabase_service_client()
            # Testar conexão fazendo uma consulta simples
            response = client.table('access_levels').select('count').execute()
            self.stdout.write('✅ Conexão com Supabase estabelecida')
            return True
        except Exception as e:
            self.stdout.write(
                self.style.ERROR(f'❌ Erro ao conectar com Supabase: {str(e)}')
            )
            return False

    def _check_database_structure(self):
        """Verificar estrutura do banco de dados"""
        try:
            service = SupabaseService()
            
            # Verificar níveis de acesso
            access_levels = service.get_access_levels()
            self.stdout.write(f'📊 Níveis de acesso encontrados: {len(access_levels)}')
            
            for level in access_levels:
                self.stdout.write(f'   - {level["name"]}: {level["description"]}')
            
            # Verificar permissões
            permissions = service.get_permissions()
            self.stdout.write(f'🔐 Permissões encontradas: {len(permissions)}')
            
            # Verificar usuários
            client = get_supabase_service_client()
            users_response = client.table('users').select('count').execute()
            user_count = users_response.data[0]['count'] if users_response.data else 0
            self.stdout.write(f'👥 Usuários cadastrados: {user_count}')
            
            return True
            
        except Exception as e:
            self.stdout.write(
                self.style.ERROR(f'❌ Erro ao verificar estrutura: {str(e)}')
            )
            return False

    def _create_admin_user(self):
        """Criar usuário administrador"""
        try:
            service = SupabaseService()
            
            # Dados do administrador
            admin_data = {
                'email': 'admin@sistema.com',
                'password': 'admin123',
                'first_name': 'Administrador',
                'last_name': 'Sistema',
                'access_level_id': 1,  # MASTER
                'church_code': 'BR-21-0001',
                'church_name': 'Regional Itapevi',
                'is_active': True,
                'is_verified': True
            }
            
            # Verificar se usuário já existe
            existing_user = service.get_user_by_email(admin_data['email'])
            if existing_user:
                self.stdout.write('👤 Usuário administrador já existe')
                return
            
            # Criar usuário
            user = service.create_user(admin_data)
            if user:
                self.stdout.write('✅ Usuário administrador criado!')
                self.stdout.write(f'   Email: {admin_data["email"]}')
                self.stdout.write(f'   Senha: {admin_data["password"]} (ALTERE IMEDIATAMENTE!)')
            else:
                self.stdout.write(
                    self.style.ERROR('❌ Erro ao criar usuário administrador')
                )
                
        except Exception as e:
            self.stdout.write(
                self.style.ERROR(f'❌ Erro ao criar usuário: {str(e)}')
            )
