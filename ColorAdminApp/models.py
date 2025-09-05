"""
Modelos para o sistema de autenticação e níveis de acesso
"""
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.utils import timezone
import uuid
import logging

logger = logging.getLogger(__name__)

class AccessLevel(models.Model):
    """Níveis de acesso do sistema"""
    name = models.CharField(max_length=50, unique=True, verbose_name="Nome")
    description = models.TextField(blank=True, verbose_name="Descrição")
    level_order = models.IntegerField(unique=True, verbose_name="Ordem do Nível")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'access_levels'
        verbose_name = "Nível de Acesso"
        verbose_name_plural = "Níveis de Acesso"
        ordering = ['level_order']

    def __str__(self):
        return self.name

class Permission(models.Model):
    """Permissões específicas do sistema"""
    name = models.CharField(max_length=100, unique=True, verbose_name="Nome")
    description = models.TextField(blank=True, verbose_name="Descrição")
    module = models.CharField(max_length=50, verbose_name="Módulo")
    action = models.CharField(max_length=50, verbose_name="Ação")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'permissions'
        verbose_name = "Permissão"
        verbose_name_plural = "Permissões"
        ordering = ['module', 'action']

    def __str__(self):
        return f"{self.module}.{self.action}"

class AccessLevelPermission(models.Model):
    """Permissões por nível de acesso"""
    access_level = models.ForeignKey(AccessLevel, on_delete=models.CASCADE, verbose_name="Nível de Acesso")
    permission = models.ForeignKey(Permission, on_delete=models.CASCADE, verbose_name="Permissão")
    granted = models.BooleanField(default=True, verbose_name="Concedida")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'access_level_permissions'
        verbose_name = "Permissão por Nível"
        verbose_name_plural = "Permissões por Nível"
        unique_together = ['access_level', 'permission']

    def __str__(self):
        status = "✓" if self.granted else "✗"
        return f"{self.access_level.name} - {self.permission.name} {status}"

class UserManager(BaseUserManager):
    """Gerenciador customizado para usuários"""
    
    def create_user(self, email, password=None, **extra_fields):
        """Criar usuário comum"""
        if not email:
            raise ValueError('O email é obrigatório')
        
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        """Criar superusuário"""
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_verified', True)
        extra_fields.setdefault('is_active', True)
        
        # Buscar nível MASTER
        try:
            master_level = AccessLevel.objects.get(name='MASTER')
            extra_fields.setdefault('access_level', master_level)
        except AccessLevel.DoesNotExist:
            logger.warning("Nível MASTER não encontrado. Execute as migrações do Supabase.")
        
        return self.create_user(email, password, **extra_fields)

class User(AbstractBaseUser):
    """Modelo de usuário customizado"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(unique=True, verbose_name="Email")
    first_name = models.CharField(max_length=100, verbose_name="Nome")
    last_name = models.CharField(max_length=100, verbose_name="Sobrenome")
    phone = models.CharField(max_length=20, blank=True, verbose_name="Telefone")
    
    # Nível de acesso
    access_level = models.ForeignKey(
        AccessLevel, 
        on_delete=models.PROTECT, 
        verbose_name="Nível de Acesso"
    )
    
    # Dados da igreja
    church_code = models.CharField(max_length=20, blank=True, verbose_name="Código da Igreja")
    church_name = models.CharField(max_length=255, blank=True, verbose_name="Nome da Igreja")
    
    # Status do usuário
    is_active = models.BooleanField(default=True, verbose_name="Ativo")
    is_verified = models.BooleanField(default=False, verbose_name="Verificado")
    is_staff = models.BooleanField(default=False, verbose_name="Staff")
    is_superuser = models.BooleanField(default=False, verbose_name="Superusuário")
    
    # Timestamps
    last_login = models.DateTimeField(null=True, blank=True, verbose_name="Último Login")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    # Auditoria
    created_by = models.ForeignKey('self', on_delete=models.SET_NULL, null=True, blank=True, related_name='created_users')
    updated_by = models.ForeignKey('self', on_delete=models.SET_NULL, null=True, blank=True, related_name='updated_users')

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    class Meta:
        db_table = 'users'
        verbose_name = "Usuário"
        verbose_name_plural = "Usuários"
        ordering = ['first_name', 'last_name']

    def __str__(self):
        return f"{self.first_name} {self.last_name} ({self.email})"

    def get_full_name(self):
        return f"{self.first_name} {self.last_name}"

    def get_short_name(self):
        return self.first_name

    def has_perm(self, perm, obj=None):
        """Verificar se usuário tem permissão específica"""
        if self.is_superuser:
            return True
        
        try:
            permission = Permission.objects.get(name=perm)
            return AccessLevelPermission.objects.filter(
                access_level=self.access_level,
                permission=permission,
                granted=True
            ).exists()
        except Permission.DoesNotExist:
            return False

    def has_module_perms(self, app_label):
        """Verificar se usuário tem permissões no módulo"""
        if self.is_superuser:
            return True
        
        return AccessLevelPermission.objects.filter(
            access_level=self.access_level,
            permission__module=app_label,
            granted=True
        ).exists()

    def get_permissions(self):
        """Retornar todas as permissões do usuário"""
        return Permission.objects.filter(
            accesslevelpermission__access_level=self.access_level,
            accesslevelpermission__granted=True
        ).values_list('name', flat=True)

    def has_access_level(self, level_name):
        """Verificar se usuário tem nível de acesso específico ou superior"""
        if self.is_superuser:
            return True
        
        try:
            required_level = AccessLevel.objects.get(name=level_name)
            return self.access_level.level_order <= required_level.level_order
        except AccessLevel.DoesNotExist:
            return False

class UserSession(models.Model):
    """Sessões de usuário"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name="Usuário")
    session_token = models.CharField(max_length=255, unique=True, verbose_name="Token da Sessão")
    expires_at = models.DateTimeField(verbose_name="Expira em")
    ip_address = models.GenericIPAddressField(null=True, blank=True, verbose_name="Endereço IP")
    user_agent = models.TextField(blank=True, verbose_name="User Agent")
    is_active = models.BooleanField(default=True, verbose_name="Ativa")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'user_sessions'
        verbose_name = "Sessão de Usuário"
        verbose_name_plural = "Sessões de Usuário"
        ordering = ['-created_at']

    def __str__(self):
        return f"Sessão de {self.user.get_full_name()} - {self.created_at}"

    def is_expired(self):
        """Verificar se sessão expirou"""
        return timezone.now() > self.expires_at

class AccessLog(models.Model):
    """Log de acessos e ações"""
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, verbose_name="Usuário")
    action = models.CharField(max_length=100, verbose_name="Ação")
    module = models.CharField(max_length=50, blank=True, verbose_name="Módulo")
    resource_id = models.CharField(max_length=100, blank=True, verbose_name="ID do Recurso")
    ip_address = models.GenericIPAddressField(null=True, blank=True, verbose_name="Endereço IP")
    user_agent = models.TextField(blank=True, verbose_name="User Agent")
    success = models.BooleanField(default=True, verbose_name="Sucesso")
    error_message = models.TextField(blank=True, verbose_name="Mensagem de Erro")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'access_logs'
        verbose_name = "Log de Acesso"
        verbose_name_plural = "Logs de Acesso"
        ordering = ['-created_at']

    def __str__(self):
        status = "✓" if self.success else "✗"
        user_name = self.user.get_full_name() if self.user else "Anônimo"
        return f"{status} {user_name} - {self.action} - {self.created_at}"

# Sinais para sincronização com Supabase (opcional)
from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver

@receiver(post_save, sender=User)
def sync_user_to_supabase(sender, instance, created, **kwargs):
    """Sincronizar usuário com Supabase quando salvo no Django"""
    # Implementar sincronização se necessário
    pass

@receiver(post_save, sender=AccessLog)
def log_user_action(sender, instance, created, **kwargs):
    """Log automático de ações"""
    if created:
        logger.info(f"Log de acesso: {instance}")