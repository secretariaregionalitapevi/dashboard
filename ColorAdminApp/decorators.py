"""
Decorators para controle de acesso e permissões
"""
from functools import wraps
from django.shortcuts import redirect
from django.contrib import messages
from django.http import JsonResponse, HttpResponseForbidden
from django.urls import reverse
from django.core.exceptions import PermissionDenied
import logging

logger = logging.getLogger(__name__)

def login_required_custom(view_func):
    """Decorator para verificar se usuário está logado"""
    @wraps(view_func)
    def wrapper(request, *args, **kwargs):
        if not hasattr(request, 'user') or not request.user.is_authenticated:
            if request.headers.get('Accept') == 'application/json':
                return JsonResponse({'error': 'Acesso negado'}, status=401)
            return redirect('login')
        return view_func(request, *args, **kwargs)
    return wrapper

def access_level_required(required_level):
    """
    Decorator para verificar nível de acesso específico
    
    Args:
        required_level (str): Nome do nível de acesso necessário
    """
    def decorator(view_func):
        @wraps(view_func)
        def wrapper(request, *args, **kwargs):
            if not hasattr(request, 'user') or not request.user.is_authenticated:
                if request.headers.get('Accept') == 'application/json':
                    return JsonResponse({'error': 'Acesso negado'}, status=401)
                return redirect('login')
            
            if not request.user.has_access_level(required_level):
                logger.warning(f"Usuário {request.user.email} tentou acessar {request.path} sem nível {required_level}")
                messages.error(request, f'Acesso negado. Nível {required_level} necessário.')
                
                if request.headers.get('Accept') == 'application/json':
                    return JsonResponse({'error': 'Nível de acesso insuficiente'}, status=403)
                return redirect('dashboard')
            
            return view_func(request, *args, **kwargs)
        return wrapper
    return decorator

def permission_required(permission_name):
    """
    Decorator para verificar permissão específica
    
    Args:
        permission_name (str): Nome da permissão necessária
    """
    def decorator(view_func):
        @wraps(view_func)
        def wrapper(request, *args, **kwargs):
            if not hasattr(request, 'user') or not request.user.is_authenticated:
                if request.headers.get('Accept') == 'application/json':
                    return JsonResponse({'error': 'Acesso negado'}, status=401)
                return redirect('login')
            
            if not request.user.has_perm(permission_name):
                logger.warning(f"Usuário {request.user.email} tentou acessar {request.path} sem permissão {permission_name}")
                messages.error(request, f'Acesso negado. Permissão {permission_name} necessária.')
                
                if request.headers.get('Accept') == 'application/json':
                    return JsonResponse({'error': 'Permissão insuficiente'}, status=403)
                return redirect('dashboard')
            
            return view_func(request, *args, **kwargs)
        return wrapper
    return decorator

def module_access_required(module_name):
    """
    Decorator para verificar acesso a módulo específico
    
    Args:
        module_name (str): Nome do módulo
    """
    def decorator(view_func):
        @wraps(view_func)
        def wrapper(request, *args, **kwargs):
            if not hasattr(request, 'user') or not request.user.is_authenticated:
                if request.headers.get('Accept') == 'application/json':
                    return JsonResponse({'error': 'Acesso negado'}, status=401)
                return redirect('login')
            
            if not request.user.has_module_perms(module_name):
                logger.warning(f"Usuário {request.user.email} tentou acessar {request.path} sem acesso ao módulo {module_name}")
                messages.error(request, f'Acesso negado ao módulo {module_name}.')
                
                if request.headers.get('Accept') == 'application/json':
                    return JsonResponse({'error': 'Acesso ao módulo negado'}, status=403)
                return redirect('dashboard')
            
            return view_func(request, *args, **kwargs)
        return wrapper
    return decorator

def staff_required(view_func):
    """Decorator para verificar se usuário é staff"""
    @wraps(view_func)
    def wrapper(request, *args, **kwargs):
        if not hasattr(request, 'user') or not request.user.is_authenticated:
            if request.headers.get('Accept') == 'application/json':
                return JsonResponse({'error': 'Acesso negado'}, status=401)
            return redirect('login')
        
        if not request.user.is_staff:
            logger.warning(f"Usuário {request.user.email} tentou acessar {request.path} sem ser staff")
            messages.error(request, 'Acesso negado. Privilégios de staff necessários.')
            
            if request.headers.get('Accept') == 'application/json':
                return JsonResponse({'error': 'Privilégios de staff necessários'}, status=403)
            return redirect('dashboard')
        
        return view_func(request, *args, **kwargs)
    return wrapper

def superuser_required(view_func):
    """Decorator para verificar se usuário é superusuário"""
    @wraps(view_func)
    def wrapper(request, *args, **kwargs):
        if not hasattr(request, 'user') or not request.user.is_authenticated:
            if request.headers.get('Accept') == 'application/json':
                return JsonResponse({'error': 'Acesso negado'}, status=401)
            return redirect('login')
        
        if not request.user.is_superuser:
            logger.warning(f"Usuário {request.user.email} tentou acessar {request.path} sem ser superusuário")
            messages.error(request, 'Acesso negado. Privilégios de superusuário necessários.')
            
            if request.headers.get('Accept') == 'application/json':
                return JsonResponse({'error': 'Privilégios de superusuário necessários'}, status=403)
            return redirect('dashboard')
        
        return view_func(request, *args, **kwargs)
    return wrapper

def verified_user_required(view_func):
    """Decorator para verificar se usuário está verificado"""
    @wraps(view_func)
    def wrapper(request, *args, **kwargs):
        if not hasattr(request, 'user') or not request.user.is_authenticated:
            if request.headers.get('Accept') == 'application/json':
                return JsonResponse({'error': 'Acesso negado'}, status=401)
            return redirect('login')
        
        if not request.user.is_verified:
            logger.warning(f"Usuário {request.user.email} tentou acessar {request.path} sem estar verificado")
            messages.warning(request, 'Sua conta precisa ser verificada para acessar esta funcionalidade.')
            
            if request.headers.get('Accept') == 'application/json':
                return JsonResponse({'error': 'Conta não verificada'}, status=403)
            return redirect('profile')
        
        return view_func(request, *args, **kwargs)
    return wrapper

def active_user_required(view_func):
    """Decorator para verificar se usuário está ativo"""
    @wraps(view_func)
    def wrapper(request, *args, **kwargs):
        if not hasattr(request, 'user') or not request.user.is_authenticated:
            if request.headers.get('Accept') == 'application/json':
                return JsonResponse({'error': 'Acesso negado'}, status=401)
            return redirect('login')
        
        if not request.user.is_active:
            logger.warning(f"Usuário {request.user.email} tentou acessar {request.path} com conta inativa")
            messages.error(request, 'Sua conta está inativa. Entre em contato com o administrador.')
            
            if request.headers.get('Accept') == 'application/json':
                return JsonResponse({'error': 'Conta inativa'}, status=403)
            return redirect('login')
        
        return view_func(request, *args, **kwargs)
    return wrapper

def log_access(action, module=None, resource_id=None):
    """
    Decorator para registrar logs de acesso
    
    Args:
        action (str): Ação realizada
        module (str): Módulo acessado
        resource_id (str): ID do recurso acessado
    """
    def decorator(view_func):
        @wraps(view_func)
        def wrapper(request, *args, **kwargs):
            from .models import AccessLog
            
            try:
                # Registrar log de acesso
                AccessLog.objects.create(
                    user=request.user if hasattr(request, 'user') and request.user.is_authenticated else None,
                    action=action,
                    module=module,
                    resource_id=resource_id,
                    ip_address=get_client_ip(request),
                    user_agent=request.META.get('HTTP_USER_AGENT', ''),
                    success=True
                )
            except Exception as e:
                logger.error(f"Erro ao registrar log de acesso: {str(e)}")
            
            return view_func(request, *args, **kwargs)
        return wrapper
    return decorator

def get_client_ip(request):
    """Obter IP do cliente"""
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0]
    else:
        ip = request.META.get('REMOTE_ADDR')
    return ip

# Decorators combinados para casos comuns
def admin_required(view_func):
    """Decorator combinado para administradores"""
    return access_level_required('ADMIN')(view_func)

def coordinator_required(view_func):
    """Decorator combinado para coordenadores"""
    return access_level_required('COORDINATOR')(view_func)

def instructor_required(view_func):
    """Decorator combinado para instrutores"""
    return access_level_required('INSTRUCTOR')(view_func)

def musician_required(view_func):
    """Decorator combinado para músicos"""
    return access_level_required('MUSICIAN')(view_func)

def dashboard_access(view_func):
    """Decorator para acesso ao dashboard"""
    return permission_required('dashboard.view')(view_func)

def musicians_access(view_func):
    """Decorator para acesso aos músicos"""
    return permission_required('musicians.view')(view_func)

def churches_access(view_func):
    """Decorator para acesso às igrejas"""
    return permission_required('churches.view')(view_func)

def reports_access(view_func):
    """Decorator para acesso aos relatórios"""
    return permission_required('reports.view')(view_func)
