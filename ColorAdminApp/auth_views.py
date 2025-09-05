"""
Views para autenticação e controle de acesso
"""
import logging
from django.shortcuts import render, redirect
from django.contrib.auth import login, logout, authenticate
from django.contrib import messages
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from django.utils.decorators import method_decorator
from django.views import View
from django.conf import settings
from .decorators import login_required_custom
import json

logger = logging.getLogger(__name__)

class LoginView(View):
    """View para login de usuários"""

    def get(self, request):
        """Exibir página de login"""
        # Se já estiver logado, redirecionar para dashboard
        if hasattr(request, 'user') and request.user.is_authenticated:
            return redirect('ColorAdminApp:dashboardv3')
        
        context = {
            "appSidebarHide": 1,
            "appHeaderHide": 1,
            "appContentClass": "p-0"
        }
        return render(request, 'pages/user-login-v1.html', context)
    
    def post(self, request):
        """Processar login"""
        try:
            email = request.POST.get('email', '').strip()
            password = request.POST.get('password', '')
            remember_me = request.POST.get('remember_me', False)
            
            if not email or not password:
                messages.error(request, 'Email e senha são obrigatórios.')
                context = {
                    "appSidebarHide": 1,
                    "appHeaderHide": 1,
                    "appContentClass": "p-0"
                }
                return render(request, 'pages/user-login-v1.html', context)
            
            # Autenticar usuário
            user = authenticate(request, username=email, password=password)
            logger.info(f"Tentativa de login: email={email}, user={user}")
            
            if user:
                if not user.is_active:
                    messages.error(request, 'Sua conta está inativa. Entre em contato com o administrador.')
                    context = {
                        "appSidebarHide": 1,
                        "appHeaderHide": 1,
                        "appContentClass": "p-0"
                    }
                    return render(request, 'pages/user-login-v1.html', context)
                
                # Fazer login
                login(request, user)
                
                # Lembrar usuário se solicitado
                if remember_me:
                    request.session.set_expiry(30 * 24 * 60 * 60)  # 30 dias
                
                # Limpar mensagens anteriores
                list(messages.get_messages(request))
                
                # Adicionar mensagem de boas-vindas
                messages.success(request, f'Bem-vindo, {user.get_full_name()}!')
                
                # Configurar resposta
                response = redirect('ColorAdminApp:dashboardv3')
                return response
            
            else:
                messages.error(request, 'Email ou senha incorretos.')
                context = {
                    "appSidebarHide": 1,
                    "appHeaderHide": 1,
                    "appContentClass": "p-0"
                }
                return render(request, 'pages/user-login-v1.html', context)
        
        except Exception as e:
            logger.error(f"Erro no login: {str(e)}")
            messages.error(request, 'Ocorreu um erro interno. Tente novamente.')
            context = {
                "appSidebarHide": 1,
                "appHeaderHide": 1,
                "appContentClass": "p-0"
            }
            return render(request, 'pages/user-login-v1.html', context)
    
    def _get_client_ip(self, request):
        """Obter IP do cliente"""
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            ip = x_forwarded_for.split(',')[0]
        else:
            ip = request.META.get('REMOTE_ADDR')
        return ip

class LogoutView(View):
    """View para logout de usuários"""
    
    def get(self, request):
        """Processar logout"""
        return self._logout_user(request)
    
    def post(self, request):
        """Processar logout via POST"""
        return self._logout_user(request)
    
    def _logout_user(self, request):
        """Processar logout do usuário"""
        try:
            logger.info(f"Processando logout para usuário: {request.user}")
            
            # Fazer logout do Django
            logout(request)
            
            logger.info("Logout realizado com sucesso")
            
            # Limpar mensagens anteriores
            from django.contrib import messages
            list(messages.get_messages(request))
            
            # Adicionar mensagem de logout
            messages.info(request, 'Você foi desconectado com sucesso.')
            
            # Configurar resposta
            response = redirect('ColorAdminApp:login')
            return response
        
        except Exception as e:
            logger.error(f"Erro no logout: {str(e)}")
            messages.error(request, 'Ocorreu um erro ao fazer logout.')
            return redirect('ColorAdminApp:login')
    
    def _get_client_ip(self, request):
        """Obter IP do cliente"""
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            ip = x_forwarded_for.split(',')[0]
        else:
            ip = request.META.get('REMOTE_ADDR')
        return ip

@login_required_custom
def profile_view(request):
    """View para perfil do usuário"""
    try:
        user = request.user
        
        # Obter permissões do usuário
        permissions = user.get_permissions()
        
        context = {
            'user': user,
            'permissions': permissions,
            'access_level': user.access_level,
        }
        
        return render(request, 'pages/user-profile.html', context)
    
    except Exception as e:
        logger.error(f"Erro ao carregar perfil: {str(e)}")
        messages.error(request, 'Erro ao carregar perfil do usuário.')
        return redirect('dashboard')

@login_required_custom
def change_password_view(request):
    """View para alterar senha"""
    if request.method == 'POST':
        try:
            current_password = request.POST.get('current_password', '')
            new_password = request.POST.get('new_password', '')
            confirm_password = request.POST.get('confirm_password', '')
            
            if not all([current_password, new_password, confirm_password]):
                messages.error(request, 'Todos os campos são obrigatórios.')
                return render(request, 'pages/change-password.html')
            
            if new_password != confirm_password:
                messages.error(request, 'As senhas não coincidem.')
                return render(request, 'pages/change-password.html')
            
            if len(new_password) < 8:
                messages.error(request, 'A senha deve ter pelo menos 8 caracteres.')
                return render(request, 'pages/change-password.html')
            
            # Verificar senha atual
            if not request.user.check_password(current_password):
                messages.error(request, 'Senha atual incorreta.')
                return render(request, 'pages/change-password.html')
            
            # Alterar senha
            request.user.set_password(new_password)
            request.user.save()
            
            # Log da alteração
            AccessLog.objects.create(
                user=request.user,
                action='password_changed',
                module='auth',
                ip_address=request.META.get('REMOTE_ADDR'),
                user_agent=request.META.get('HTTP_USER_AGENT', ''),
                success=True
            )
            
            messages.success(request, 'Senha alterada com sucesso!')
            return redirect('profile')
        
        except Exception as e:
            logger.error(f"Erro ao alterar senha: {str(e)}")
            messages.error(request, 'Erro ao alterar senha.')
    
    return render(request, 'pages/change-password.html')

@csrf_exempt
@require_http_methods(["POST"])
def api_login(request):
    """API para login via AJAX"""
    try:
        data = json.loads(request.body)
        email = data.get('email', '').strip()
        password = data.get('password', '')
        
        if not email or not password:
            return JsonResponse({'success': False, 'error': 'Email e senha são obrigatórios.'})
        
        # Autenticar usuário
        from django.contrib.auth import authenticate
        
        user = authenticate(request, email=email, password=password)
        
        if user and user.is_active:
            login(request, user)
            
            # Criar sessão customizada
            session = SessionManager.create_session(user, request)
            
            response_data = {
                'success': True,
                'user': {
                    'id': str(user.id),
                    'email': user.email,
                    'name': user.get_full_name(),
                    'access_level': user.access_level.name,
                }
            }
            
            response = JsonResponse(response_data)
            
            # Definir cookie de sessão
            if session:
                response.set_cookie(
                    'session_token',
                    session.session_token,
                    max_age=settings.SESSION_COOKIE_AGE,
                    httponly=True,
                    secure=settings.SESSION_COOKIE_SECURE,
                    samesite=settings.SESSION_COOKIE_SAMESITE
                )
            
            return response
        
        else:
            return JsonResponse({'success': False, 'error': 'Email ou senha incorretos.'})
    
    except Exception as e:
        logger.error(f"Erro na API de login: {str(e)}")
        return JsonResponse({'success': False, 'error': 'Erro interno do servidor.'})

@csrf_exempt
@require_http_methods(["POST"])
def api_logout(request):
    """API para logout via AJAX"""
    try:
        if hasattr(request, 'user') and request.user.is_authenticated:
            # Invalidar sessão customizada
            session_token = request.COOKIES.get('session_token')
            if session_token:
                SessionManager.invalidate_session(session_token)
            
            logout(request)
        
        response = JsonResponse({'success': True})
        response.delete_cookie('session_token')
        response.delete_cookie('remember_user')
        
        return response
    
    except Exception as e:
        logger.error(f"Erro na API de logout: {str(e)}")
        return JsonResponse({'success': False, 'error': 'Erro interno do servidor.'})

@login_required_custom
def api_user_info(request):
    """API para informações do usuário"""
    try:
        user = request.user
        
        return JsonResponse({
            'success': True,
            'user': {
                'id': str(user.id),
                'email': user.email,
                'name': user.get_full_name(),
                'access_level': user.access_level.name,
                'permissions': list(user.get_permissions()),
                'church_code': user.church_code,
                'church_name': user.church_name,
                'is_verified': user.is_verified,
                'is_active': user.is_active,
            }
        })
    
    except Exception as e:
        logger.error(f"Erro na API de informações do usuário: {str(e)}")
        return JsonResponse({'success': False, 'error': 'Erro interno do servidor.'})
