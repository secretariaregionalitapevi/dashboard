#!/usr/bin/env bash
# Script de build para Render

echo "🚀 Iniciando build do Sistema REG-IT..."

# Instalar dependências
echo "📦 Instalando dependências Python..."
pip install -r requirements.txt

# Coletar arquivos estáticos
echo "📁 Coletando arquivos estáticos..."
python manage.py collectstatic --noinput

# Executar migrações
echo "🗄️ Executando migrações do banco de dados..."
python manage.py migrate

# Configurar Supabase (se necessário)
echo "🔧 Configurando Supabase..."
python manage.py setup_supabase --check-structure

echo "✅ Build concluído com sucesso!"
