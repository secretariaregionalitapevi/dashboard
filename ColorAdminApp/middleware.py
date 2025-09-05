"""
Middleware customizado para autenticação e controle de acesso
"""
import logging
from django.utils.deprecation import MiddlewareMixin
from django.shortcuts import redirect
from django.contrib import messages
from django.urls import reverse
from django.conf import settings
from .auth_backend import SessionManager
from .models import AccessLog
import json

logger = logging.getLogger(__name__)

class AuthenticationMiddleware(MiddlewareMixin):
    """Middleware para autenticação customizada"""
    
    def process_request(self, request):
        """Processar requisição para autenticação"""
        # URLs que não precisam de autenticação
        public_urls = [
            '/login/',
            '/logout/',
            '/register/',
            '/forgot-password/',
            '/reset-password/',
            '/static/',
            '/media/',
            '/admin/',
        ]
        
        # Verificar se é uma URL pública
        if any(request.path.startswith(url) for url in public_urls):
            return None
        
        # Verificar se usuário está autenticado via sessão Django
        if hasattr(request, 'user') and request.user.is_authenticated:
            return None
        
        # Verificar sessão customizada
        session_token = request.COOKIES.get('session_token')
        if session_token:
            user = SessionManager.validate_session(session_token)
            if user:
                # Definir usuário na requisição
                request.user = user
                request._cached_user = user
                return None
        
        # Se não estiver autenticado, redirecionar para login
        if request.path != '/login/':
            if request.headers.get('Accept') == 'application/json':
                from django.http import JsonResponse
                return JsonResponse({'error': 'Acesso negado'}, status=401)
            return redirect('login')
        
        return None

class AccessLogMiddleware(MiddlewareMixin):
    """Middleware para registrar logs de acesso"""
    
    def process_request(self, request):
        """Registrar início da requisição"""
        request._access_start_time = self._get_current_time()
        return None
    
    def process_response(self, request, response):
        """Registrar fim da requisição"""
        if hasattr(request, '_access_start_time'):
            duration = self._get_current_time() - request._access_start_time
            
            # Registrar log apenas para usuários autenticados e URLs importantes
            if (hasattr(request, 'user') and 
                request.user.is_authenticated and 
                not request.path.startswith('/static/') and
                not request.path.startswith('/media/')):
                
                self._log_access(request, response, duration)
        
        return response
    
    def _log_access(self, request, response, duration):
        """Registrar log de acesso"""
        try:
            # Determinar ação baseada no método HTTP e status
            action = f"{request.method}_{response.status_code}"
            
            # Determinar módulo baseado na URL
            module = self._get_module_from_path(request.path)
            
            AccessLog.objects.create(
                user=request.user,
                action=action,
                module=module,
                ip_address=self._get_client_ip(request),
                user_agent=request.META.get('HTTP_USER_AGENT', ''),
                success=response.status_code < 400,
                error_message='' if response.status_code < 400 else f'HTTP {response.status_code}'
            )
            
        except Exception as e:
            logger.error(f"Erro ao registrar log de acesso: {str(e)}")
    
    def _get_module_from_path(self, path):
        """Determinar módulo baseado no caminho da URL"""
        if path.startswith('/dashboard'):
            return 'dashboard'
        elif path.startswith('/musicians'):
            return 'musicians'
        elif path.startswith('/organists'):
            return 'organists'
        elif path.startswith('/churches'):
            return 'churches'
        elif path.startswith('/reports'):
            return 'reports'
        elif path.startswith('/users'):
            return 'users'
        elif path.startswith('/settings'):
            return 'settings'
        else:
            return 'general'
    
    def _get_client_ip(self, request):
        """Obter IP do cliente"""
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            ip = x_forwarded_for.split(',')[0]
        else:
            ip = request.META.get('REMOTE_ADDR')
        return ip
    
    def _get_current_time(self):
        """Obter tempo atual"""
        import time
        return time.time()

class PermissionMiddleware(MiddlewareMixin):
    """Middleware para verificação de permissões"""
    
    def process_request(self, request):
        """Verificar permissões para URLs protegidas"""
        # URLs que precisam de verificação de permissão
        protected_urls = {
            '/dashboard/admin/': 'dashboard.admin',
            '/musicians/': 'musicians.view',
            '/musicians/create/': 'musicians.create',
            '/musicians/edit/': 'musicians.edit',
            '/musicians/delete/': 'musicians.delete',
            '/organists/': 'organists.view',
            '/organists/create/': 'organists.create',
            '/organists/edit/': 'organists.edit',
            '/organists/delete/': 'organists.delete',
            '/churches/': 'churches.view',
            '/churches/create/': 'churches.create',
            '/churches/edit/': 'churches.edit',
            '/churches/delete/': 'churches.delete',
            '/reports/': 'reports.view',
            '/users/': 'users.view',
            '/users/create/': 'users.create',
            '/users/edit/': 'users.edit',
            '/users/delete/': 'users.delete',
            '/settings/': 'settings.view',
        }
        
        # Verificar se a URL atual precisa de permissão
        required_permission = None
        for url_pattern, permission in protected_urls.items():
            if request.path.startswith(url_pattern):
                required_permission = permission
                break
        
        if required_permission and hasattr(request, 'user') and request.user.is_authenticated:
            if not request.user.has_perm(required_permission):
                logger.warning(f"Usuário {request.user.email} tentou acessar {request.path} sem permissão {required_permission}")
                messages.error(request, f'Acesso negado. Permissão {required_permission} necessária.')
                
                if request.headers.get('Accept') == 'application/json':
                    from django.http import JsonResponse
                    return JsonResponse({'error': 'Permissão insuficiente'}, status=403)
                return redirect('dashboard')
        
        return None

class SecurityMiddleware(MiddlewareMixin):
    """Middleware para configurações de segurança"""
    
    def process_response(self, request, response):
        """Adicionar headers de segurança"""
        # Headers de segurança
        response['X-Content-Type-Options'] = 'nosniff'
        response['X-Frame-Options'] = 'DENY'
        response['X-XSS-Protection'] = '1; mode=block'
        
        # CSP básico (pode ser customizado conforme necessário)
        if not request.path.startswith('/admin/'):
            response['Content-Security-Policy'] = (
                "default-src 'self'; "
                "script-src 'self' 'unsafe-inline' 'unsafe-eval'; "
                "style-src 'self' 'unsafe-inline'; "
                "img-src 'self' data: https:; "
                "font-src 'self' data:; "
                "connect-src 'self'"
            )
        
        return response

class SessionTimeoutMiddleware(MiddlewareMixin):
    """Middleware para controle de timeout de sessão"""
    
    def process_request(self, request):
        """Verificar timeout de sessão"""
        if (hasattr(request, 'user') and 
            request.user.is_authenticated and 
            not request.path.startswith('/static/') and
            not request.path.startswith('/media/')):
            
            # Verificar se sessão expirou
            session_token = request.COOKIES.get('session_token')
            if session_token:
                user = SessionManager.validate_session(session_token)
                if not user:
                    # Sessão expirou, limpar cookie
                    response = redirect('login')
                    response.delete_cookie('session_token')
                    messages.warning(request, 'Sua sessão expirou. Faça login novamente.')
                    return response
        
        return None

class UserActivityMiddleware(MiddlewareMixin):
    """Middleware para rastrear atividade do usuário"""
    
    def process_request(self, request):
        """Atualizar última atividade do usuário"""
        if (hasattr(request, 'user') and 
            request.user.is_authenticated and 
            not request.path.startswith('/static/') and
            not request.path.startswith('/media/')):
            
            # Atualizar última atividade (pode ser implementado conforme necessário)
            # request.user.last_activity = timezone.now()
            # request.user.save(update_fields=['last_activity'])
            pass
        
        return None
