# 🚀 Guia de Configuração do Supabase - Sistema REG-IT

## 📋 Pré-requisitos

1. **Conta no Supabase**: [https://supabase.com](https://supabase.com)
2. **Projeto criado no Supabase**
3. **Python 3.8+** instalado
4. **Dependências do projeto** instaladas

## 🔧 Passo 1: Configurar Variáveis de Ambiente

### 1.1 Criar arquivo `.env`

Copie o arquivo `env_example.txt` para `.env` e configure as variáveis:

```bash
cp env_example.txt .env
```

### 1.2 Obter credenciais do Supabase

1. Acesse seu projeto no [Supabase Dashboard](https://app.supabase.com)
2. Vá em **Settings** → **API**
3. Copie as seguintes informações:

```env
# URL do seu projeto
SUPABASE_URL=https://seu-projeto-id.supabase.co

# Chave anônima (pública)
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Chave de serviço (privada) - NUNCA compartilhe!
SUPABASE_SERVICE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 🗄️ Passo 2: Configurar Banco de Dados

### 2.1 Executar Schema SQL

1. Acesse o **SQL Editor** no Supabase Dashboard
2. Copie todo o conteúdo do arquivo `supabase_schema.sql`
3. Cole e execute o script

Este script criará:
- ✅ Tabelas de usuários e níveis de acesso
- ✅ Sistema de permissões
- ✅ Usuário administrador padrão
- ✅ Índices para performance
- ✅ Funções e triggers

### 2.2 Verificar estrutura criada

No **Table Editor** do Supabase, você deve ver as seguintes tabelas:

- `access_levels` - Níveis de acesso (MASTER, ADMIN, COORDINATOR, etc.)
- `users` - Usuários do sistema
- `permissions` - Permissões disponíveis
- `access_level_permissions` - Permissões por nível
- `user_sessions` - Sessões ativas
- `access_logs` - Logs de acesso

## 🐍 Passo 3: Configurar Python

### 3.1 Instalar dependências

```bash
pip install supabase bcrypt python-dotenv
```

### 3.2 Testar conexão

Execute o script de configuração:

```bash
python setup_supabase.py
```

Este script irá:
- ✅ Testar conexão com Supabase
- ✅ Verificar estrutura do banco
- ✅ Criar usuário administrador
- ✅ Validar configurações

## 🔐 Passo 4: Níveis de Acesso Configurados

### 4.1 Hierarquia de Acesso

| Nível | Descrição | Permissões |
|-------|-----------|------------|
| **MASTER** | Administradores gerais | Acesso total ao sistema |
| **ADMIN** | Administradores regionais | Acesso amplo (exceto configurações críticas) |
| **COORDINATOR** | Coordenadores musicais | Músicos, organistas, relatórios |
| **INSTRUCTOR** | Instrutores | Acesso limitado a suas turmas |
| **MUSICIAN** | Músicos | Acesso básico ao sistema |
| **CANDIDATE** | Candidatos | Acesso muito limitado |

### 4.2 Permissões por Módulo

- **Dashboard**: Visualização e administração
- **Músicos**: CRUD completo
- **Organistas**: CRUD completo
- **Igrejas**: CRUD completo
- **Relatórios**: Visualização e exportação
- **Usuários**: Gerenciamento de usuários
- **Configurações**: Configurações do sistema

## 🚀 Passo 5: Testar Sistema

### 5.1 Login inicial

Use as credenciais padrão:
- **Email**: `admin@sistema.com`
- **Senha**: `admin123`

⚠️ **IMPORTANTE**: Altere a senha imediatamente após o primeiro login!

### 5.2 Verificar funcionalidades

1. ✅ Login/logout
2. ✅ Navegação entre páginas
3. ✅ Verificação de permissões
4. ✅ Logs de acesso
5. ✅ Gerenciamento de sessões

## 🔧 Passo 6: Configurações Avançadas

### 6.1 Configurar Email (Opcional)

Para envio de emails de verificação:

```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USE_TLS=True
EMAIL_HOST_USER=seu-email@gmail.com
EMAIL_HOST_PASSWORD=sua-senha-de-app
```

### 6.2 Configurar Logging

```env
LOG_LEVEL=INFO  # DEBUG, INFO, WARNING, ERROR, CRITICAL
```

### 6.3 Configurar Segurança

```env
SESSION_EXPIRE_HOURS=24
MAX_LOGIN_ATTEMPTS=5
LOGIN_LOCKOUT_MINUTES=30
```

## 🛠️ Comandos Úteis

### Verificar status da conexão
```bash
python setup_supabase.py
```

### Criar novo usuário (via Django shell)
```python
python manage.py shell
>>> from ColorAdminApp.supabase_service import SupabaseService
>>> service = SupabaseService()
>>> user_data = {
...     'email': 'novo@usuario.com',
...     'password': 'senha123',
...     'first_name': 'Nome',
...     'last_name': 'Sobrenome',
...     'access_level_id': 3,  # COORDINATOR
...     'church_code': 'BR-21-1019',
...     'church_name': 'Igreja Exemplo'
... }
>>> user = service.create_user(user_data)
```

### Verificar permissões de um usuário
```python
>>> permissions = service.get_user_access_level_permissions(3)  # COORDINATOR
>>> for perm in permissions:
...     print(f"- {perm['name']}: {perm['description']}")
```

## 🚨 Solução de Problemas

### Erro de conexão
- ✅ Verifique se as variáveis de ambiente estão corretas
- ✅ Confirme se o projeto Supabase está ativo
- ✅ Teste a conectividade de rede

### Erro de permissão
- ✅ Verifique se o usuário tem o nível de acesso correto
- ✅ Confirme se as permissões estão configuradas
- ✅ Verifique os logs de acesso

### Erro de autenticação
- ✅ Confirme se o usuário existe no banco
- ✅ Verifique se a senha está correta
- ✅ Confirme se o usuário está ativo

## 📞 Suporte

Se encontrar problemas:

1. Verifique os logs do sistema
2. Consulte a documentação do Supabase
3. Execute o script de diagnóstico: `python setup_supabase.py`
4. Verifique as configurações de rede e firewall

---

## ✅ Checklist de Configuração

- [ ] Projeto Supabase criado
- [ ] Variáveis de ambiente configuradas
- [ ] Schema SQL executado
- [ ] Dependências Python instaladas
- [ ] Conexão testada com sucesso
- [ ] Usuário administrador criado
- [ ] Login inicial realizado
- [ ] Senha do administrador alterada
- [ ] Permissões verificadas
- [ ] Logs de acesso funcionando

**🎉 Sistema configurado com sucesso!**
