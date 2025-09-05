-- =====================================================
-- CRIAR USUÁRIO REGIONALITAPEVI@GMAIL.COM
-- =====================================================

-- Inserir usuário regionalitapevi@gmail.com com senha admin123
INSERT INTO users (
    email, 
    password_hash, 
    first_name, 
    last_name, 
    access_level_id,
    church_code,
    church_name,
    is_verified,
    is_active
) VALUES (
    'regionalitapevi@gmail.com',
    '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4J/8Kz8Kz2', -- admin123
    'Regional',
    'Itapevi',
    (SELECT id FROM access_levels WHERE name = 'MASTER'),
    'BR-21-1019',
    'Igreja Adventista do Sétimo Dia - Regional Itapevi',
    TRUE,
    TRUE
) ON CONFLICT (email) DO UPDATE SET
    password_hash = EXCLUDED.password_hash,
    first_name = EXCLUDED.first_name,
    last_name = EXCLUDED.last_name,
    access_level_id = EXCLUDED.access_level_id,
    church_code = EXCLUDED.church_code,
    church_name = EXCLUDED.church_name,
    is_verified = EXCLUDED.is_verified,
    is_active = EXCLUDED.is_active,
    updated_at = NOW();

-- Verificar se o usuário foi criado
SELECT 
    id,
    email,
    first_name,
    last_name,
    access_level_id,
    church_code,
    church_name,
    is_active,
    is_verified,
    created_at
FROM users 
WHERE email = 'regionalitapevi@gmail.com';
