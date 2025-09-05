#!/usr/bin/env python3
"""
Script para configurar o banco de dados Supabase com níveis de acesso
"""

import os
import sys
import django
from pathlib import Path

# Adicionar o diretório do projeto ao Python path
BASE_DIR = Path(__file__).resolve().parent
sys.path.append(str(BASE_DIR))

# Configurar Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ColorAdmin.settings')
django.setup()

from ColorAdminApp.supabase_service import SupabaseService
from ColorAdminApp.supabase_config import get_supabase_service_client
import logging

# Configurar logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def test_connection():
    """Testar conexão com o Supabase"""
    try:
        client = get_supabase_service_client()
        # Testar conexão fazendo uma consulta simples
        response = client.table('access_levels').select('count').execute()
        logger.info("✅ Conexão com Supabase estabelecida com sucesso!")
        return True
    except Exception as e:
        logger.error(f"❌ Erro ao conectar com Supabase: {str(e)}")
        return False

def create_admin_user():
    """Criar usuário administrador padrão"""
    try:
        service = SupabaseService()
        
        # Dados do administrador
        admin_data = {
            'email': 'admin@sistema.com',
            'password': 'admin123',  # Senha padrão - deve ser alterada
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
            logger.info("👤 Usuário administrador já existe")
            return existing_user
        
        # Criar usuário
        user = service.create_user(admin_data)
        if user:
            logger.info("✅ Usuário administrador criado com sucesso!")
            logger.info(f"   Email: {admin_data['email']}")
            logger.info(f"   Senha: {admin_data['password']} (ALTERE IMEDIATAMENTE!)")
            return user
        else:
            logger.error("❌ Erro ao criar usuário administrador")
            return None
            
    except Exception as e:
        logger.error(f"❌ Erro ao criar usuário administrador: {str(e)}")
        return None

def verify_database_structure():
    """Verificar se a estrutura do banco está correta"""
    try:
        service = SupabaseService()
        
        # Verificar níveis de acesso
        access_levels = service.get_access_levels()
        logger.info(f"📊 Níveis de acesso encontrados: {len(access_levels)}")
        for level in access_levels:
            logger.info(f"   - {level['name']}: {level['description']}")
        
        # Verificar permissões
        permissions = service.get_permissions()
        logger.info(f"🔐 Permissões encontradas: {len(permissions)}")
        
        # Verificar usuários
        client = get_supabase_service_client()
        users_response = client.table('users').select('count').execute()
        user_count = users_response.data[0]['count'] if users_response.data else 0
        logger.info(f"👥 Usuários cadastrados: {user_count}")
        
        return True
        
    except Exception as e:
        logger.error(f"❌ Erro ao verificar estrutura do banco: {str(e)}")
        return False

def main():
    """Função principal"""
    logger.info("🚀 Iniciando configuração do Supabase...")
    
    # Verificar variáveis de ambiente
    required_vars = ['SUPABASE_URL', 'SUPABASE_ANON_KEY', 'SUPABASE_SERVICE_KEY']
    missing_vars = [var for var in required_vars if not os.getenv(var)]
    
    if missing_vars:
        logger.error("❌ Variáveis de ambiente obrigatórias não encontradas:")
        for var in missing_vars:
            logger.error(f"   - {var}")
        logger.error("\n📝 Configure as variáveis de ambiente ou crie um arquivo .env")
        logger.error("   Use o arquivo env_example.txt como referência")
        return False
    
    # Testar conexão
    if not test_connection():
        return False
    
    # Verificar estrutura do banco
    if not verify_database_structure():
        logger.error("❌ Estrutura do banco não está correta")
        logger.error("   Execute o script SQL supabase_schema.sql no Supabase primeiro")
        return False
    
    # Criar usuário administrador
    create_admin_user()
    
    logger.info("✅ Configuração do Supabase concluída com sucesso!")
    logger.info("\n📋 Próximos passos:")
    logger.info("   1. Acesse o sistema com admin@sistema.com / admin123")
    logger.info("   2. ALTERE a senha do administrador imediatamente")
    logger.info("   3. Configure outros usuários conforme necessário")
    
    return True

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)
