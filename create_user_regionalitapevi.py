#!/usr/bin/env python3
"""
Script para criar usuário regionalitapevi@gmail.com no Supabase
"""

import os
import sys
import bcrypt
from supabase import create_client, Client

# Configurações do Supabase
SUPABASE_URL = os.getenv('SUPABASE_URL')
SUPABASE_SERVICE_KEY = os.getenv('SUPABASE_SERVICE_KEY')

if not SUPABASE_URL or not SUPABASE_SERVICE_KEY:
    print("❌ Erro: Variáveis de ambiente SUPABASE_URL e SUPABASE_SERVICE_KEY não encontradas")
    print("Configure as variáveis de ambiente ou execute:")
    print("export SUPABASE_URL='sua-url'")
    print("export SUPABASE_SERVICE_KEY='sua-chave'")
    sys.exit(1)

def hash_password(password: str) -> str:
    """Hash da senha usando bcrypt"""
    salt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(password.encode('utf-8'), salt)
    return hashed.decode('utf-8')

def create_user():
    """Cria o usuário regionalitapevi@gmail.com"""
    
    # Conectar ao Supabase
    supabase: Client = create_client(SUPABASE_URL, SUPABASE_SERVICE_KEY)
    
    try:
        # Verificar se o usuário já existe
        existing_user = supabase.table('users').select('*').eq('email', 'regionalitapevi@gmail.com').execute()
        
        if existing_user.data:
            print("⚠️  Usuário regionalitapevi@gmail.com já existe!")
            print(f"ID: {existing_user.data[0]['id']}")
            print(f"Nome: {existing_user.data[0]['first_name']} {existing_user.data[0]['last_name']}")
            print(f"Nível: {existing_user.data[0]['access_level_id']}")
            return
        
        # Hash da senha
        password_hash = hash_password('admin123')
        
        # Buscar o nível de acesso MASTER
        access_level = supabase.table('access_levels').select('id').eq('name', 'MASTER').execute()
        
        if not access_level.data:
            print("❌ Erro: Nível de acesso MASTER não encontrado")
            return
        
        master_level_id = access_level.data[0]['id']
        
        # Criar o usuário
        user_data = {
            'email': 'regionalitapevi@gmail.com',
            'password_hash': password_hash,
            'first_name': 'Regional',
            'last_name': 'Itapevi',
            'access_level_id': master_level_id,
            'church_code': 'BR-21-1019',  # Código da igreja regional
            'church_name': 'Igreja Adventista do Sétimo Dia - Regional Itapevi',
            'is_active': True,
            'is_verified': True
        }
        
        result = supabase.table('users').insert(user_data).execute()
        
        if result.data:
            print("✅ Usuário criado com sucesso!")
            print(f"📧 Email: regionalitapevi@gmail.com")
            print(f"🔑 Senha: admin123")
            print(f"👤 Nome: Regional Itapevi")
            print(f"🏛️  Igreja: Igreja Adventista do Sétimo Dia - Regional Itapevi")
            print(f"🔐 Nível: MASTER (Acesso total)")
            print(f"🆔 ID: {result.data[0]['id']}")
            print("\n🎯 Próximos passos:")
            print("1. Acesse o sistema com as credenciais acima")
            print("2. Altere a senha padrão por segurança")
            print("3. Configure as permissões específicas se necessário")
        else:
            print("❌ Erro ao criar usuário")
            
    except Exception as e:
        print(f"❌ Erro: {str(e)}")

if __name__ == "__main__":
    print("🚀 Criando usuário regionalitapevi@gmail.com no Supabase...")
    print("=" * 60)
    create_user()
