from django.core.management.base import BaseCommand
from ColorAdmin.supabase_config import SupabaseConfig
import bcrypt

class Command(BaseCommand):
    help = 'Cria o usuário regionalitapevi@gmail.com no Supabase'

    def handle(self, *args, **options):
        try:
            # Conectar ao Supabase
            supabase = SupabaseConfig.get_service_client()
            
            # Verificar se o usuário já existe
            existing_user = supabase.table('users').select('*').eq('email', 'regionalitapevi@gmail.com').execute()
            
            if existing_user.data:
                self.stdout.write(
                    self.style.WARNING('⚠️  Usuário regionalitapevi@gmail.com já existe!')
                )
                user = existing_user.data[0]
                self.stdout.write(f"ID: {user['id']}")
                self.stdout.write(f"Nome: {user['first_name']} {user['last_name']}")
                self.stdout.write(f"Nível: {user['access_level_id']}")
                return
            
            # Hash da senha admin123
            password_hash = '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4J/8Kz8Kz2'
            
            # Buscar o nível de acesso MASTER
            access_level = supabase.table('access_levels').select('id').eq('name', 'MASTER').execute()
            
            if not access_level.data:
                self.stdout.write(
                    self.style.ERROR('❌ Erro: Nível de acesso MASTER não encontrado')
                )
                self.stdout.write('Execute primeiro o schema SQL no Supabase!')
                return
            
            master_level_id = access_level.data[0]['id']
            
            # Criar o usuário
            user_data = {
                'email': 'regionalitapevi@gmail.com',
                'password_hash': password_hash,
                'first_name': 'Regional',
                'last_name': 'Itapevi',
                'access_level_id': master_level_id,
                'church_code': 'BR-21-1019',
                'church_name': 'Igreja Adventista do Sétimo Dia - Regional Itapevi',
                'is_active': True,
                'is_verified': True
            }
            
            result = supabase.table('users').insert(user_data).execute()
            
            if result.data:
                self.stdout.write(
                    self.style.SUCCESS('✅ Usuário criado com sucesso!')
                )
                self.stdout.write('📧 Email: regionalitapevi@gmail.com')
                self.stdout.write('🔑 Senha: admin123')
                self.stdout.write('👤 Nome: Regional Itapevi')
                self.stdout.write('🏛️  Igreja: Igreja Adventista do Sétimo Dia - Regional Itapevi')
                self.stdout.write('🔐 Nível: MASTER (Acesso total)')
                self.stdout.write(f"🆔 ID: {result.data[0]['id']}")
                self.stdout.write('')
                self.stdout.write('🎯 Próximos passos:')
                self.stdout.write('1. Acesse o sistema com as credenciais acima')
                self.stdout.write('2. Altere a senha padrão por segurança')
                self.stdout.write('3. Configure as permissões específicas se necessário')
            else:
                self.stdout.write(
                    self.style.ERROR('❌ Erro ao criar usuário')
                )
                
        except Exception as e:
            self.stdout.write(
                self.style.ERROR(f'❌ Erro: {str(e)}')
            )
            self.stdout.write('')
            self.stdout.write('💡 Verifique se:')
            self.stdout.write('1. As variáveis de ambiente do Supabase estão configuradas')
            self.stdout.write('2. O schema SQL foi executado no Supabase')
            self.stdout.write('3. A conexão com o Supabase está funcionando')
