"""
Configurações do Supabase para o sistema de autenticação
"""
import os
from supabase import create_client, Client
import logging

logger = logging.getLogger(__name__)

class SupabaseConfig:
    """Configuração centralizada do Supabase"""
    
    def __init__(self):
        # Configurações do Supabase - substitua pelos seus valores
        self.url = os.getenv('SUPABASE_URL', 'https://your-project.supabase.co')
        self.key = os.getenv('SUPABASE_ANON_KEY', 'your-anon-key')
        self.service_key = os.getenv('SUPABASE_SERVICE_KEY', 'your-service-key')
        
        # Validação básica
        if self.url == 'https://your-project.supabase.co':
            logger.warning("Configurações do Supabase não encontradas. Configure as variáveis de ambiente.")
    
    def get_client(self) -> Client:
        """Retorna cliente do Supabase para operações públicas"""
        return create_client(self.url, self.key)
    
    def get_service_client(self) -> Client:
        """Retorna cliente do Supabase para operações administrativas"""
        return create_client(self.url, self.service_key)

# Instância global
supabase_config = SupabaseConfig()

# Funções de conveniência
def get_supabase_client() -> Client:
    """Cliente para operações públicas"""
    return supabase_config.get_client()

def get_supabase_service_client() -> Client:
    """Cliente para operações administrativas"""
    return supabase_config.get_service_client()
