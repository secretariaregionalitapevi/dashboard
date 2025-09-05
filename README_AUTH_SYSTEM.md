# Sistema de Autenticação Musical

Este sistema implementa um controle de acesso robusto para administração musical eclesiástica, com integração ao Supabase e níveis de acesso hierárquicos.

## 🚀 Instalação e Configuração

### 1. Instalar Dependências

```bash
pip install -r requirements.txt
```

### 2. Configurar Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
# Configurações do Supabase
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_KEY=your-service-key

# Configurações do Django
SECRET_KEY=your-secret-key
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1

# Configurações de Sessão
SESSION_COOKIE_AGE=86400  # 24 horas
SESSION_EXPIRE_AT_BROWSER_CLOSE=False
```

### 3. Configurar Banco de Dados Supabase

Execute o script SQL fornecido no arquivo `supabase_schema.sql` no seu projeto Supabase:

1. Acesse o painel do Supabase
2. Vá para SQL Editor
3. Execute o conteúdo do arquivo `supabase_schema.sql`

### 4. Executar Migrações Django

```bash
python manage.py makemigrations
python manage.py migrate
```

### 5. Configurar Sistema de Autenticação

```bash
python manage.py setup_auth_system
```

Este comando irá:
- Criar níveis de acesso
- Configurar permissões
- Criar usuário administrador padrão

### 6. Executar Servidor

```bash
python manage.py runserver
```

## 👥 Níveis de Acesso

O sistema possui 6 níveis hierárquicos de acesso:

### 1. MASTER (Nível 1)
- **Descrição**: Acesso total ao sistema
- **Usuários**: Administradores gerais
- **Permissões**: Todas as permissões do sistema

### 2. ADMIN (Nível 2)
- **Descrição**: Administradores regionais
- **Usuários**: Coordenadores regionais
- **Permissões**: Acesso amplo (exceto configurações críticas)

### 3. COORDINATOR (Nível 3)
- **Descrição**: Coordenadores musicais
- **Usuários**: Responsáveis por grupos musicais
- **Permissões**: Músicos, organistas, relatórios

### 4. INSTRUCTOR (Nível 4)
- **Descrição**: Instrutores
- **Usuários**: Professores de música
- **Permissões**: Acesso limitado a músicos

### 5. MUSICIAN (Nível 5)
- **Descrição**: Músicos
- **Usuários**: Membros da orquestra
- **Permissões**: Acesso básico ao sistema

### 6. CANDIDATE (Nível 6)
- **Descrição**: Candidatos
- **Usuários**: Aspirantes a músicos
- **Permissões**: Acesso muito limitado

## 🔐 Permissões por Módulo

### Dashboard
- `dashboard.view`: Visualizar dashboard principal
- `dashboard.admin`: Acesso completo ao dashboard administrativo

### Músicos
- `musicians.view`: Visualizar lista de músicos
- `musicians.create`: Cadastrar novos músicos
- `musicians.edit`: Editar dados de músicos
- `musicians.delete`: Excluir músicos

### Organistas
- `organists.view`: Visualizar lista de organistas
- `organists.create`: Cadastrar novos organistas
- `organists.edit`: Editar dados de organistas
- `organists.delete`: Excluir organistas

### Igrejas
- `churches.view`: Visualizar lista de igrejas
- `churches.create`: Cadastrar novas igrejas
- `churches.edit`: Editar dados de igrejas
- `churches.delete`: Excluir igrejas

### Relatórios
- `reports.view`: Visualizar relatórios
- `reports.export`: Exportar relatórios

### Usuários
- `users.view`: Visualizar lista de usuários
- `users.create`: Criar novos usuários
- `users.edit`: Editar usuários
- `users.delete`: Excluir usuários

### Configurações
- `settings.view`: Visualizar configurações
- `settings.edit`: Editar configurações

## 🛡️ Decorators de Controle de Acesso

### Decorators Básicos
```python
from ColorAdminApp.decorators import login_required_custom, access_level_required, permission_required

@login_required_custom
def minha_view(request):
    pass

@access_level_required('ADMIN')
def view_admin(request):
    pass

@permission_required('musicians.view')
def view_musicians(request):
    pass
```

### Decorators Combinados
```python
from ColorAdminApp.decorators import admin_required, musicians_access, dashboard_access

@admin_required
def view_admin(request):
    pass

@musicians_access
def view_musicians(request):
    pass

@dashboard_access
def view_dashboard(request):
    pass
```

## 🔧 APIs de Autenticação

### Login
```javascript
POST /api/auth/login/
{
    "email": "user@example.com",
    "password": "password"
}
```

### Logout
```javascript
POST /api/auth/logout/
```

### Informações do Usuário
```javascript
GET /api/auth/user-info/
```

## 📊 Logs de Acesso

O sistema registra automaticamente:
- Tentativas de login (sucesso/falha)
- Acessos a páginas protegidas
- Alterações de permissões
- Ações administrativas

## 🔒 Segurança

### Recursos Implementados
- Hash de senhas com bcrypt
- Sessões seguras com tokens
- Headers de segurança
- Logs de auditoria
- Controle de timeout de sessão
- Proteção CSRF

### Middleware de Segurança
- `AuthenticationMiddleware`: Verificação de autenticação
- `AccessLogMiddleware`: Registro de logs
- `PermissionMiddleware`: Verificação de permissões
- `SecurityMiddleware`: Headers de segurança
- `SessionTimeoutMiddleware`: Controle de timeout

## 🚨 Usuário Administrador Padrão

Após executar `setup_auth_system`, será criado um usuário administrador:

- **Email**: admin@sistema.com
- **Senha**: admin123
- **Nível**: MASTER

⚠️ **IMPORTANTE**: Altere a senha imediatamente após o primeiro login!

## 📝 Estrutura do Banco de Dados

### Tabelas Principais
- `users`: Usuários do sistema
- `access_levels`: Níveis de acesso
- `permissions`: Permissões disponíveis
- `access_level_permissions`: Permissões por nível
- `user_sessions`: Sessões ativas
- `access_logs`: Logs de acesso

### Views Úteis
- `user_permissions_view`: Usuários com suas permissões
- Função `user_has_permission()`: Verificar permissão específica

## 🛠️ Comandos de Manutenção

### Recriar Sistema de Autenticação
```bash
python manage.py setup_auth_system
```

### Limpar Sessões Expiradas
```python
from ColorAdminApp.models import UserSession
from django.utils import timezone

# Invalidar sessões expiradas
UserSession.objects.filter(expires_at__lt=timezone.now()).update(is_active=False)
```

## 📞 Suporte

Para dúvidas, sugestões e adequações, entre em contato com o suporte técnico.

---

**Desenvolvido para administração musical eclesiástica com foco em segurança e escalabilidade.**
