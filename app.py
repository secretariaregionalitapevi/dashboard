"""
Arquivo de configuração para o Render
"""
import os
import sys
import django
from django.core.wsgi import get_wsgi_application

# Adicionar o diretório do projeto ao Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

# Configurar Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ColorAdmin.settings')
django.setup()

# Aplicação WSGI
application = get_wsgi_application()
