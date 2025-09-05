"""
Comando simples para configurar o sistema básico
"""
from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from ColorAdminApp.models import AccessLevel, Permission, AccessLevelPermission

User = get_user_model()

class Command(BaseCommand):
    help = 'Configurar sistema básico'

    def handle(self, *args, **options):
        self.stdout.write('Configurando sistema básico...')
        
        try:
            # Criar nível MASTER
            master_level, created = AccessLevel.objects.get_or_create(
                name='MASTER',
                defaults={
                    'description': 'Acesso total ao sistema',
                    'level_order': 1
                }
            )
            
            if created:
                self.stdout.write('  ✓ Nível MASTER criado')
            else:
                self.stdout.write('  - Nível MASTER já existe')
            
            # Criar permissão básica
            dashboard_permission, created = Permission.objects.get_or_create(
                name='dashboard.view',
                defaults={
                    'description': 'Visualizar dashboard',
                    'module': 'dashboard',
                    'action': 'view'
                }
            )
            
            if created:
                self.stdout.write('  ✓ Permissão dashboard.view criada')
            else:
                self.stdout.write('  - Permissão dashboard.view já existe')
            
            # Conceder permissão ao nível MASTER
            AccessLevelPermission.objects.get_or_create(
                access_level=master_level,
                permission=dashboard_permission,
                defaults={'granted': True}
            )
            
            # Criar usuário administrador
            admin_user, created = User.objects.get_or_create(
                email='admin@sistema.com',
                defaults={
                    'first_name': 'Administrador',
                    'last_name': 'Sistema',
                    'access_level': master_level,
                    'is_active': True,
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
            else:
                self.stdout.write('  - Usuário administrador já existe')
                
            self.stdout.write(self.style.SUCCESS('Sistema configurado com sucesso!'))
            
        except Exception as e:
            self.stdout.write(self.style.ERROR(f'Erro: {str(e)}'))
