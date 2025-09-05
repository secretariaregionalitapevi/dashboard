-- =====================================================
-- SISTEMA DE AUTENTICAÇÃO E NÍVEIS DE ACESSO
-- =====================================================

-- Tabela de níveis de acesso
CREATE TABLE IF NOT EXISTS access_levels (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    description TEXT,
    level_order INTEGER NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Inserir níveis de acesso padrão
INSERT INTO access_levels (name, description, level_order) VALUES
('MASTER', 'Acesso total ao sistema - administradores gerais', 1),
('ADMIN', 'Administradores regionais - acesso amplo', 2),
('COORDINATOR', 'Coordenadores musicais - acesso a funcionalidades específicas', 3),
('INSTRUCTOR', 'Instrutores - acesso limitado a suas turmas', 4),
('MUSICIAN', 'Músicos - acesso básico ao sistema', 5),
('CANDIDATE', 'Candidatos - acesso muito limitado', 6)
ON CONFLICT (name) DO NOTHING;

-- Tabela de usuários
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    access_level_id INTEGER NOT NULL REFERENCES access_levels(id),
    church_code VARCHAR(20), -- Código da igreja (ex: BR-21-1019)
    church_name VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    is_verified BOOLEAN DEFAULT FALSE,
    last_login TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID REFERENCES users(id),
    updated_by UUID REFERENCES users(id)
);

-- Tabela de permissões específicas
CREATE TABLE IF NOT EXISTS permissions (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    module VARCHAR(50) NOT NULL, -- Ex: 'dashboard', 'musicians', 'churches', etc.
    action VARCHAR(50) NOT NULL, -- Ex: 'view', 'create', 'edit', 'delete'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Inserir permissões padrão
INSERT INTO permissions (name, description, module, action) VALUES
-- Dashboard
('dashboard.view', 'Visualizar dashboard principal', 'dashboard', 'view'),
('dashboard.admin', 'Acesso completo ao dashboard administrativo', 'dashboard', 'admin'),

-- Músicos
('musicians.view', 'Visualizar lista de músicos', 'musicians', 'view'),
('musicians.create', 'Cadastrar novos músicos', 'musicians', 'create'),
('musicians.edit', 'Editar dados de músicos', 'musicians', 'edit'),
('musicians.delete', 'Excluir músicos', 'musicians', 'delete'),

-- Organistas
('organists.view', 'Visualizar lista de organistas', 'organists', 'view'),
('organists.create', 'Cadastrar novos organistas', 'organists', 'create'),
('organists.edit', 'Editar dados de organistas', 'organists', 'edit'),
('organists.delete', 'Excluir organistas', 'organists', 'delete'),

-- Igrejas
('churches.view', 'Visualizar lista de igrejas', 'churches', 'view'),
('churches.create', 'Cadastrar novas igrejas', 'churches', 'create'),
('churches.edit', 'Editar dados de igrejas', 'churches', 'edit'),
('churches.delete', 'Excluir igrejas', 'churches', 'delete'),

-- Relatórios
('reports.view', 'Visualizar relatórios', 'reports', 'view'),
('reports.export', 'Exportar relatórios', 'reports', 'export'),

-- Usuários
('users.view', 'Visualizar lista de usuários', 'users', 'view'),
('users.create', 'Criar novos usuários', 'users', 'create'),
('users.edit', 'Editar usuários', 'users', 'edit'),
('users.delete', 'Excluir usuários', 'users', 'delete'),

-- Configurações
('settings.view', 'Visualizar configurações', 'settings', 'view'),
('settings.edit', 'Editar configurações', 'settings', 'edit')
ON CONFLICT (name) DO NOTHING;

-- Tabela de permissões por nível de acesso
CREATE TABLE IF NOT EXISTS access_level_permissions (
    id SERIAL PRIMARY KEY,
    access_level_id INTEGER NOT NULL REFERENCES access_levels(id) ON DELETE CASCADE,
    permission_id INTEGER NOT NULL REFERENCES permissions(id) ON DELETE CASCADE,
    granted BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(access_level_id, permission_id)
);

-- Configurar permissões por nível
-- MASTER - Acesso total
INSERT INTO access_level_permissions (access_level_id, permission_id, granted)
SELECT al.id, p.id, TRUE
FROM access_levels al, permissions p
WHERE al.name = 'MASTER'
ON CONFLICT (access_level_id, permission_id) DO NOTHING;

-- ADMIN - Acesso amplo (exceto configurações críticas)
INSERT INTO access_level_permissions (access_level_id, permission_id, granted)
SELECT al.id, p.id, TRUE
FROM access_levels al, permissions p
WHERE al.name = 'ADMIN' 
AND p.name NOT IN ('settings.edit', 'users.delete')
ON CONFLICT (access_level_id, permission_id) DO NOTHING;

-- COORDINATOR - Acesso a músicos, organistas e relatórios
INSERT INTO access_level_permissions (access_level_id, permission_id, granted)
SELECT al.id, p.id, TRUE
FROM access_levels al, permissions p
WHERE al.name = 'COORDINATOR' 
AND p.module IN ('musicians', 'organists', 'reports', 'dashboard')
AND p.action IN ('view', 'create', 'edit')
ON CONFLICT (access_level_id, permission_id) DO NOTHING;

-- INSTRUCTOR - Acesso limitado a músicos
INSERT INTO access_level_permissions (access_level_id, permission_id, granted)
SELECT al.id, p.id, TRUE
FROM access_levels al, permissions p
WHERE al.name = 'INSTRUCTOR' 
AND p.module IN ('musicians', 'dashboard')
AND p.action IN ('view', 'edit')
ON CONFLICT (access_level_id, permission_id) DO NOTHING;

-- MUSICIAN - Acesso básico
INSERT INTO access_level_permissions (access_level_id, permission_id, granted)
SELECT al.id, p.id, TRUE
FROM access_levels al, permissions p
WHERE al.name = 'MUSICIAN' 
AND p.name IN ('dashboard.view', 'musicians.view')
ON CONFLICT (access_level_id, permission_id) DO NOTHING;

-- CANDIDATE - Acesso muito limitado
INSERT INTO access_level_permissions (access_level_id, permission_id, granted)
SELECT al.id, p.id, TRUE
FROM access_levels al, permissions p
WHERE al.name = 'CANDIDATE' 
AND p.name = 'dashboard.view'
ON CONFLICT (access_level_id, permission_id) DO NOTHING;

-- Tabela de sessões
CREATE TABLE IF NOT EXISTS user_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    session_token VARCHAR(255) NOT NULL UNIQUE,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    ip_address INET,
    user_agent TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de logs de acesso
CREATE TABLE IF NOT EXISTS access_logs (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    action VARCHAR(100) NOT NULL,
    module VARCHAR(50),
    resource_id VARCHAR(100),
    ip_address INET,
    user_agent TEXT,
    success BOOLEAN DEFAULT TRUE,
    error_message TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_access_level ON users(access_level_id);
CREATE INDEX IF NOT EXISTS idx_users_church_code ON users(church_code);
CREATE INDEX IF NOT EXISTS idx_user_sessions_token ON user_sessions(session_token);
CREATE INDEX IF NOT EXISTS idx_user_sessions_user_id ON user_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_user_sessions_expires ON user_sessions(expires_at);
CREATE INDEX IF NOT EXISTS idx_access_logs_user_id ON access_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_access_logs_created_at ON access_logs(created_at);

-- Função para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers para updated_at
CREATE TRIGGER update_access_levels_updated_at BEFORE UPDATE ON access_levels FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- View para facilitar consultas de usuários com permissões
CREATE OR REPLACE VIEW user_permissions_view AS
SELECT 
    u.id,
    u.email,
    u.first_name,
    u.last_name,
    u.access_level_id,
    al.name as access_level_name,
    al.level_order,
    u.church_code,
    u.church_name,
    u.is_active,
    u.is_verified,
    u.last_login,
    u.created_at,
    u.updated_at,
    array_agg(
        CASE 
            WHEN alp.granted = TRUE THEN p.name 
            ELSE NULL 
        END
    ) FILTER (WHERE alp.granted = TRUE) as permissions
FROM users u
JOIN access_levels al ON u.access_level_id = al.id
LEFT JOIN access_level_permissions alp ON al.id = alp.access_level_id
LEFT JOIN permissions p ON alp.permission_id = p.id
GROUP BY u.id, u.email, u.first_name, u.last_name, u.access_level_id, 
         al.name, al.level_order, u.church_code, u.church_name, 
         u.is_active, u.is_verified, u.last_login, u.created_at, u.updated_at;

-- Função para verificar se usuário tem permissão
CREATE OR REPLACE FUNCTION user_has_permission(user_id UUID, permission_name VARCHAR)
RETURNS BOOLEAN AS $$
DECLARE
    has_permission BOOLEAN := FALSE;
BEGIN
    SELECT EXISTS(
        SELECT 1 
        FROM user_permissions_view 
        WHERE id = user_id 
        AND permission_name = ANY(permissions)
    ) INTO has_permission;
    
    RETURN has_permission;
END;
$$ LANGUAGE plpgsql;

-- Inserir usuário administrador padrão (senha: admin123 - deve ser alterada)
INSERT INTO users (
    email, 
    password_hash, 
    first_name, 
    last_name, 
    access_level_id,
    is_verified,
    is_active
) VALUES (
    'admin@sistema.com',
    '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4J/8Kz8Kz2', -- admin123
    'Administrador',
    'Sistema',
    (SELECT id FROM access_levels WHERE name = 'MASTER'),
    TRUE,
    TRUE
) ON CONFLICT (email) DO NOTHING;
