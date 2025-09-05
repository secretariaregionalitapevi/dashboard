"""
Comando Django para configurar o sistema de autenticação
"""
from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from ColorAdminApp.models import AccessLevel, Permission, AccessLevelPermission
import logging

logger = logging.getLogger(__name__)
User = get_user_model()

class Command(BaseCommand):
    help = 'Configurar sistema de autenticação com níveis de acesso e permissões'

    def handle(self, *args, **options):
        self.stdout.write('Configurando sistema de autenticação...')
        
        try:
            # Criar níveis de acesso
            self.create_access_levels()
            
            # Criar permissões
            self.create_permissions()
            
            # Configurar permissões por nível
            self.setup_access_level_permissions()
            
            # Criar usuário administrador padrão
            self.create_admin_user()
            
            self.stdout.write(
                self.style.SUCCESS('Sistema de autenticação configurado com sucesso!')
            )
            
        except Exception as e:
            self.stdout.write(
                self.style.ERROR(f'Erro ao configurar sistema: {str(e)}')
            )
            logger.error(f"Erro no comando setup_auth_system: {str(e)}")

    def create_access_levels(self):
        """Criar níveis de acesso"""
        self.stdout.write('Criando níveis de acesso...')
        
        levels = [
            ('MASTER', 'Acesso total ao sistema - administradores gerais', 1),
            ('ADMIN', 'Administradores regionais - acesso amplo', 2),
            ('COORDINATOR', 'Coordenadores musicais - acesso a funcionalidades específicas', 3),
            ('INSTRUCTOR', 'Instrutores - acesso limitado a suas turmas', 4),
            ('MUSICIAN', 'Músicos - acesso básico ao sistema', 5),
            ('CANDIDATE', 'Candidatos - acesso muito limitado', 6),
        ]
        
        for name, description, order in levels:
            level, created = AccessLevel.objects.get_or_create(
                name=name,
                defaults={
                    'description': description,
                    'level_order': order
                }
            )
            
            if created:
                self.stdout.write(f'  ✓ Nível {name} criado')
            else:
                self.stdout.write(f'  - Nível {name} já existe')

    def create_permissions(self):
        """Criar permissões"""
        self.stdout.write('Criando permissões...')
        
        permissions = [
            # Dashboard
            ('dashboard.view', 'Visualizar dashboard principal', 'dashboard', 'view'),
            ('dashboard.admin', 'Acesso completo ao dashboard administrativo', 'dashboard', 'admin'),
            
            # Músicos
            ('musicians.view', 'Visualizar lista de músicos', 'musicians', 'view'),
            ('musicians.create', 'Cadastrar novos músicos', 'musicians', 'create'),
            ('musicians.edit', 'Editar dados de músicos', 'musicians', 'edit'),
            ('musicians.delete', 'Excluir músicos', 'musicians', 'delete'),
            
            # Organistas
            ('organists.view', 'Visualizar lista de organistas', 'organists', 'view'),
            ('organists.create', 'Cadastrar novos organistas', 'organists', 'create'),
            ('organists.edit', 'Editar dados de organistas', 'organists', 'edit'),
            ('organists.delete', 'Excluir organistas', 'organists', 'delete'),
            
            # Igrejas
            ('churches.view', 'Visualizar lista de igrejas', 'churches', 'view'),
            ('churches.create', 'Cadastrar novas igrejas', 'churches', 'create'),
            ('churches.edit', 'Editar dados de igrejas', 'churches', 'edit'),
            ('churches.delete', 'Excluir igrejas', 'churches', 'delete'),
            
            # Relatórios
            ('reports.view', 'Visualizar relatórios', 'reports', 'view'),
            ('reports.export', 'Exportar relatórios', 'reports', 'export'),
            
            # Usuários
            ('users.view', 'Visualizar lista de usuários', 'users', 'view'),
            ('users.create', 'Criar novos usuários', 'users', 'create'),
            ('users.edit', 'Editar usuários', 'users', 'edit'),
            ('users.delete', 'Excluir usuários', 'users', 'delete'),
            
            # Configurações
            ('settings.view', 'Visualizar configurações', 'settings', 'view'),
            ('settings.edit', 'Editar configurações', 'settings', 'edit'),
        ]
        
        for name, description, module, action in permissions:
            permission, created = Permission.objects.get_or_create(
                name=name,
                defaults={
                    'description': description,
                    'module': module,
                    'action': action
                }
            )
            
            if created:
                self.stdout.write(f'  ✓ Permissão {name} criada')
            else:
                self.stdout.write(f'  - Permissão {name} já existe')

    def setup_access_level_permissions(self):
        """Configurar permissões por nível de acesso"""
        self.stdout.write('Configurando permissões por nível...')
        
        # MASTER - Acesso total
        master_level = AccessLevel.objects.get(name='MASTER')
        all_permissions = Permission.objects.all()
        
        for permission in all_permissions:
            AccessLevelPermission.objects.get_or_create(
                access_level=master_level,
                permission=permission,
                defaults={'granted': True}
            )
        
        self.stdout.write(f'  ✓ MASTER: {all_permissions.count()} permissões')
        
        # ADMIN - Acesso amplo (exceto configurações críticas)
        admin_level = AccessLevel.objects.get(name='ADMIN')
        admin_permissions = Permission.objects.exclude(
            name__in=['settings.edit', 'users.delete']
        )
        
        for permission in admin_permissions:
            AccessLevelPermission.objects.get_or_create(
                access_level=admin_level,
                permission=permission,
                defaults={'granted': True}
            )
        
        self.stdout.write(f'  ✓ ADMIN: {admin_permissions.count()} permissões')
        
        # COORDINATOR - Acesso a músicos, organistas e relatórios
        coordinator_level = AccessLevel.objects.get(name='COORDINATOR')
        coordinator_permissions = Permission.objects.filter(
            module__in=['musicians', 'organists', 'reports', 'dashboard'],
            action__in=['view', 'create', 'edit']
        )
        
        for permission in coordinator_permissions:
            AccessLevelPermission.objects.get_or_create(
                access_level=coordinator_level,
                permission=permission,
                defaults={'granted': True}
            )
        
        self.stdout.write(f'  ✓ COORDINATOR: {coordinator_permissions.count()} permissões')
        
        # INSTRUCTOR - Acesso limitado a músicos
        instructor_level = AccessLevel.objects.get(name='INSTRUCTOR')
        instructor_permissions = Permission.objects.filter(
            module__in=['musicians', 'dashboard'],
            action__in=['view', 'edit']
        )
        
        for permission in instructor_permissions:
            AccessLevelPermission.objects.get_or_create(
                access_level=instructor_level,
                permission=permission,
                defaults={'granted': True}
            )
        
        self.stdout.write(f'  ✓ INSTRUCTOR: {instructor_permissions.count()} permissões')
        
        # MUSICIAN - Acesso básico
        musician_level = AccessLevel.objects.get(name='MUSICIAN')
        musician_permissions = Permission.objects.filter(
            name__in=['dashboard.view', 'musicians.view']
        )
        
        for permission in musician_permissions:
            AccessLevelPermission.objects.get_or_create(
                access_level=musician_level,
                permission=permission,
                defaults={'granted': True}
            )
        
        self.stdout.write(f'  ✓ MUSICIAN: {musician_permissions.count()} permissões')
        
        # CANDIDATE - Acesso muito limitado
        candidate_level = AccessLevel.objects.get(name='CANDIDATE')
        candidate_permissions = Permission.objects.filter(
            name='dashboard.view'
        )
        
        for permission in candidate_permissions:
            AccessLevelPermission.objects.get_or_create(
                access_level=candidate_level,
                permission=permission,
                defaults={'granted': True}
            )
        
        self.stdout.write(f'  ✓ CANDIDATE: {candidate_permissions.count()} permissões')

    def create_admin_user(self):
        """Criar usuário administrador padrão"""
        self.stdout.write('Criando usuário administrador...')
        
        try:
            master_level = AccessLevel.objects.get(name='MASTER')
            
            admin_user, created = User.objects.get_or_create(
                email='admin@sistema.com',
                defaults={
                    'first_name': 'Administrador',
                    'last_name': 'Sistema',
                    'access_level': master_level,
                    'is_active': True,
                    'is_verified': True,
                    'is_staff': True,
                    'is_superuser': True,
                }
            )
            
            if created:
                admin_user.set_password('admin123')
                admin_user.save()
                self.stdout.write('  ✓ Usuário administrador criado')
                self.stdout.write('    Email: admin@sistema.com')
                self.stdout.write('    Senha: admin123')
                self.stdout.write('    ⚠️  ALTERE A SENHA IMEDIATAMENTE!')
            else:
                self.stdout.write('  - Usuário administrador já existe')
                
        except AccessLevel.DoesNotExist:
            self.stdout.write('  ✗ Erro: Nível MASTER não encontrado')
