"""
Comando simples para criar usuário administrador
"""
from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model

User = get_user_model()

class Command(BaseCommand):
    help = 'Criar usuário administrador'

    def handle(self, *args, **options):
        self.stdout.write('Criando usuário administrador...')
        
        try:
            # Criar usuário administrador
            admin_user, created = User.objects.get_or_create(
                email='admin@sistema.com',
                defaults={
                    'first_name': 'Administrador',
                    'last_name': 'Sistema',
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
                self.stdout.write('    ⚠️  ALTERE A SENHA IMEDIATAMENTE!')
            else:
                self.stdout.write('  - Usuário administrador já existe')
                
        except Exception as e:
            self.stdout.write(f'  ✗ Erro: {str(e)}')
