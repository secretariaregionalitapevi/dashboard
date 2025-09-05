from django.http import HttpResponseRedirect
from django.shortcuts import get_object_or_404, render, redirect
from django.urls import reverse
from django.views import generic
from django.http import HttpResponse

def index(request):
	return redirect('dashboard/v3')

def dashboardv1(request):
	return render(request, "pages/index.html")

def dashboardv2(request):
	return render(request, "pages/index-v2.html")

def dashboardv3(request):
	return render(request, "pages/index-v3.html")

def aiChat(request):
	context = {
		"appContentFullHeight": 1,
		"appContentClass": "p-0 d-flex position-relative bg-body"
	}
	return render(request, "pages/ai-chat.html", context)

def aiImageGenerator(request):
	return render(request, "pages/ai-image-generator.html")

def emailInbox(request):
	context = {
		"appContentFullHeight": 1,
		"appContentClass": "p-0"
	}
	return render(request, "pages/email-inbox.html", context)

def emailDetail(request):
	context = {
		"appContentFullHeight": 1,
		"appContentClass": "p-0"
	}
	return render(request, "pages/email-detail.html", context)

def emailCompose(request):
	context = {
		"appContentFullHeight": 1,
		"appContentClass": "p-0"
	}
	return render(request, "pages/email-compose.html", context)

def widgets(request):
	return render(request, "pages/widgets.html")

def uiGeneral(request):
	return render(request, "pages/ui-general.html")

def uiTypography(request):
	return render(request, "pages/ui-typography.html")

def uiTabsAccordions(request):
	return render(request, "pages/ui-tabs-accordions.html")

def uiUnlimitedNavTabs(request):
	return render(request, "pages/ui-unlimited-nav-tabs.html")

def uiModalNotifications(request):
	return render(request, "pages/ui-modal-notifications.html")

def uiWidgetBoxes(request):
	return render(request, "pages/ui-widget-boxes.html")

def uiMediaObject(request):
	return render(request, "pages/ui-media-object.html")

def uiButtons(request):
	return render(request, "pages/ui-buttons.html")

def uiIconFontawesome(request):
	return render(request, "pages/ui-icon-fontawesome.html")

def uiIconBootstrapIcons(request):
	return render(request, "pages/ui-icon-bootstrap-icons.html")

def uiIconDuotone(request):
	return render(request, "pages/ui-icon-duotone.html")

def uiIconSimpleLineIcons(request):
	return render(request, "pages/ui-icon-simple-line-icons.html")

def uiIconIonicons(request):
	return render(request, "pages/ui-icon-ionicons.html")

def uiTreeView(request):
	return render(request, "pages/ui-tree-view.html")

def uiLanguageBarIcon(request):
	context = {
		"appHeaderLanguageBar": 1
	}
	return render(request, "pages/ui-language-bar-icon.html", context)

def uiSocialButtons(request):
	return render(request, "pages/ui-social-buttons.html")

def uiIntroJS(request):
	return render(request, "pages/ui-intro-js.html")

def uiOffcanvasToasts(request):
	return render(request, "pages/ui-offcanvas-toasts.html")
	
def bootstrap5(request):
	return render(request, "pages/bootstrap-5.html")

def formElements(request):
	return render(request, "pages/form-elements.html")

def formPlugins(request):
	return render(request, "pages/form-plugins.html")

def formSliderSwitcher(request):
	return render(request, "pages/form-slider-switcher.html")
	
def formValidation(request):
	return render(request, "pages/form-validation.html")

def formWizards(request):
	return render(request, "pages/form-wizards.html")
	
def formWysiwyg(request):
	return render(request, "pages/form-wysiwyg.html")
	
def formXEditable(request):
	return render(request, "pages/form-x-editable.html")
	
def formMultipleFileUpload(request):
	return render(request, "pages/form-multiple-file-upload.html")
	
def formSummernote(request):
	return render(request, "pages/form-summernote.html")
	
def formDropzone(request):
	return render(request, "pages/form-dropzone.html")

def tableBasic(request):
	return render(request, "pages/table-basic.html")

def tableManageDefault(request):
	return render(request, "pages/table-manage-default.html")

def tableManageButtons(request):
	return render(request, "pages/table-manage-buttons.html")

def tableManageColReorder(request):
	return render(request, "pages/table-manage-col-reorder.html")

def tableManageFixedColumn(request):
	return render(request, "pages/table-manage-fixed-column.html")

def tableManageFixedHeader(request):
	return render(request, "pages/table-manage-fixed-header.html")

def tableManageKeytable(request):
	return render(request, "pages/table-manage-keytable.html")

def tableManageResponsive(request):
	return render(request, "pages/table-manage-responsive.html")

def tableManageRowReorder(request):
	return render(request, "pages/table-manage-row-reorder.html")

def tableManageScroller(request):
	return render(request, "pages/table-manage-scroller.html")

def tableManageSelect(request):
	return render(request, "pages/table-manage-select.html")

def tableManageExtensionCombination(request):
	return render(request, "pages/table-manage-extension-combination.html")

def posCustomerOrder(request):
	context = {
		"appSidebarHide": 1, 
		"appHeaderHide": 1,  
		"appContentFullHeight": 1,
		"appContentClass": "p-0"
	}
	return render(request, "pages/pos-customer-order.html", context)

def posKitchenOrder(request):
	context = {
		"appSidebarHide": 1, 
		"appHeaderHide": 1,  
		"appContentFullHeight": 1,
		"appContentClass": "p-0"
	}
	return render(request, "pages/pos-kitchen-order.html", context)

def posCounterCheckout(request):
	context = {
		"appSidebarHide": 1, 
		"appHeaderHide": 1,  
		"appContentFullHeight": 1,
		"appContentClass": "p-0"
	}
	return render(request, "pages/pos-counter-checkout.html", context)

def posTableBooking(request):
	context = {
		"appSidebarHide": 1, 
		"appHeaderHide": 1,  
		"appContentFullHeight": 1,
		"appContentClass": "p-0"
	}
	return render(request, "pages/pos-table-booking.html", context)

def posMenuStock(request):
	context = {
		"appSidebarHide": 1, 
		"appHeaderHide": 1,  
		"appContentFullHeight": 1,
		"appContentClass": "p-0"
	}
	return render(request, "pages/pos-menu-stock.html", context)

def chartFlot(request):
	return render(request, "pages/chart-flot.html")

def chartJs(request):
	return render(request, "pages/chart-js.html")

def chartD3(request):
	return render(request, "pages/chart-d3.html")

def chartApex(request):
	return render(request, "pages/chart-apex.html")
	
def landing(request):
	context = {
		"appSidebarHide": 1,
		"appHeaderHide": 1,
		"appContentClass": "p-0"
	}
	return render(request, "pages/landing.html", context)

def calendar(request):
	return render(request, "pages/calendar.html")

def mapVector(request):
	context = {
		"appContentFullHeight": 1,
		"appContentClass": "p-0 position-relative"
	}
	return render(request, "pages/map-vector.html", context)

def mapGoogle(request):
	context = {
		"appContentFullHeight": 1,
		"appContentClass": "p-0 position-relative"
	}
	return render(request, "pages/map-google.html", context)

def galleryV1(request):
	return render(request, "pages/gallery-v1.html")

def galleryV2(request):
	return render(request, "pages/gallery-v2.html")

def pageOptionBlank(request):
	return render(request, "pages/page-option-blank.html")

def pageOptionWithFooter(request):
	return render(request, "pages/page-option-with-footer.html")

def pageOptionWithFixedFooter(request):
	context = {
		"appContentFullHeight": 1,
		"appContentClass": "d-flex flex-column p-0"
	}
	return render(request, "pages/page-option-with-fixed-footer.html", context)

def pageOptionWithoutSidebar(request):
	context = {
		"appSidebarHide": 1
	}
	return render(request, "pages/page-option-without-sidebar.html", context)

def pageOptionWithRightSidebar(request):
	context = {
		"appSidebarEnd": 1
	}
	return render(request, "pages/page-option-with-right-sidebar.html", context)

def pageOptionWithMinifiedSidebar(request):
	context = {
		"appSidebarMinified": 1
	}
	return render(request, "pages/page-option-with-minified-sidebar.html", context)

def pageOptionWithTwoSidebar(request):
	context = {
		"appSidebarTwo": 1,
		"appSidebarEndToggled": 1
	}
	return render(request, "pages/page-option-with-two-sidebar.html", context)

def pageOptionFullHeight(request):
	context = {
		"appContentFullHeight": 1,
		"appContentClass": "p-0"
	}
	return render(request, "pages/page-option-full-height.html", context)

def pageOptionWithWideSidebar(request):
	context = {
		"appSidebarWide": 1
	}
	return render(request, "pages/page-option-with-wide-sidebar.html", context)

def pageOptionWithLightSidebar(request):
	context = {
		"appSidebarLight": 1
	}
	return render(request, "pages/page-option-with-light-sidebar.html", context)

def pageOptionWithMegaMenu(request):
	context = {
		"appHeaderMegaMenu": 1
	}
	return render(request, "pages/page-option-with-mega-menu.html", context)

def pageOptionWithTopMenu(request):
	context = {
		"appTopMenu": 1,
		"appSidebarHide": 1
	}
	return render(request, "pages/page-option-with-top-menu.html", context)

def pageOptionWithBoxedLayout(request):
	context = {
		"appBoxedLayout": 1
	}
	return render(request, "pages/page-option-with-boxed-layout.html", context)

def pageOptionWithMixedMenu(request):
	context = {
		"appTopMenu": 1
	}
	return render(request, "pages/page-option-with-mixed-menu.html", context)

def pageOptionBoxedLayoutWithMixedMenu(request):
	context = {
		"appBoxedLayout": 1,
		"appTopMenu": 1
	}
	return render(request, "pages/page-option-boxed-layout-with-mixed-menu.html", context)

def pageOptionWithTransparentSidebar(request):
	context = {
		"appSidebarTransparent": 1
	}
	return render(request, "pages/page-option-with-transparent-sidebar.html", context)

def pageOptionWithSearchSidebar(request):
	context = {
		"appSidebarSearch": 1
	}
	return render(request, "pages/page-option-with-search-sidebar.html", context)

def pageOptionWithHoverSidebar(request):
	context = {
		"appSidebarHover": 1
	}
	return render(request, "pages/page-option-with-hover-sidebar.html", context)

def extraTimeline(request):
	return render(request, "pages/extra-timeline.html")

def extraComingSoon(request):
	context = {
		"appSidebarHide": 1,
		"appHeaderHide": 1,
		"appContentClass": "p-0"
	}
	return render(request, "pages/extra-coming-soon.html", context)

def extraSearch(request):
	return render(request, "pages/extra-search.html")

def extraInvoice(request):
	return render(request, "pages/extra-invoice.html")

def extraError(request):
	context = {
		"appSidebarHide": 1,
		"appHeaderHide": 1,
		"appContentClass": "p-0"
	}
	return render(request, "pages/extra-error.html", context)

def extraProfile(request):
	context = {
		"appContentClass": "p-0"
	}
	return render(request, "pages/extra-profile.html", context)

def extraScrumBoard(request):
	context = {
		"appContentClass": "p-0",
		"appContentFullHeight": 1
	}
	return render(request, "pages/extra-scrum-board.html", context)

def extraCookieAcceptanceBanner(request):
	return render(request, "pages/extra-cookie-acceptance-banner.html")

def extraOrders(request):
	return render(request, "pages/extra-orders.html")

def extraOrderDetails(request):
	return render(request, "pages/extra-order-details.html")

def extraProducts(request):
	return render(request, "pages/extra-products.html")

def extraProductDetails(request):
	return render(request, "pages/extra-product-details.html")

def extraFileManager(request):
	context = {
		"appSidebarMinified": 1,
		"appHeaderInverse": 1,
		"appContentFullHeight": 1,
		"appContentClass": "d-flex flex-column"
	}
	return render(request, "pages/extra-file-manager.html", context)

def extraPricing(request):
	return render(request, "pages/extra-pricing.html")

def extraMessenger(request):
	context = {
		"appSidebarMinified": 1,
		"appHeaderInverse": 1,
		"appContentClass": "p-0",
		"appContentFullHeight": 1
	}
	return render(request, "pages/extra-messenger.html", context)

def extraDataManagement(request):
	context = {
		"appSidebarMinified": 1,
		"appHeaderInverse": 1,
		"appContentClass": "p-0 bg-component",
		"appContentFullHeight": 1
	}
	return render(request, "pages/extra-data-management.html", context)

def extraSettings(request):
	return render(request, "pages/extra-settings.html")
	
def userLoginV1(request):
	context = {
		"appSidebarHide": 1,
		"appHeaderHide": 1,
		"appContentClass": "p-0"
	}
	return render(request, "pages/user-login-v1.html", context)

def userLoginV2(request):
	context = {
		"appSidebarHide": 1,
		"appHeaderHide": 1,
		"appContentClass": "p-0"
	}
	return render(request, "pages/user-login-v2.html", context)

def userLoginV3(request):
	context = {
		"appSidebarHide": 1,
		"appHeaderHide": 1,
		"appContentClass": "p-0"
	}
	return render(request, "pages/user-login-v3.html", context)

def userRegisterV3(request):
	context = {
		"appSidebarHide": 1,
		"appHeaderHide": 1,
		"appContentClass": "p-0"
	}
	return render(request, "pages/user-register-v3.html", context)

def helperCss(request):
	return render(request, "pages/helper-css.html")
	
def error404(request):
	context = {
		"appSidebarHide": 1,
		"appHeaderHide": 1,
		"appContentClass": 'p-0'
	}
	return render(request, "pages/extra-error.html", context)

def resumoMusico(request):
	"""View para a página de resumo do músico"""
	# Dados de exemplo para demonstração
	context = {
		"musico": {
			"nome": "ABÍLIO DOS SANTOS VIEIRA",
			"congregacao": "PAISAGEM CASA GRANDE",
			"ministerio": "MÚSICO",
			"instrumento": "TUBA",
			"nivel": "RJM",
			"status": "Ativo",
			"criado_em": "2024-01-15"
		},
		"nome_congregacao": "PAISAGEM CASA GRANDE",
		"total_participacoes": 12,
		"progresso": 70,
		"mensagem_progresso": "O aluno completou 70% do Programa Mínimo. Já pode pedir carta de Culto Oficial.",
		"estudos_msa": [
			{
				"id": 1,
				"data_aula": "17/05/2025",
				"fase": "8.2 - 11.2",
				"pagina_inicial": 53,
				"pagina_final": 57,
				"licoes": "53-57",
				"clave": "Sol",
				"observacoes": "",
				"instrutor": "RICARDO C. GRANGEIRO"
			},
			{
				"id": 2,
				"data_aula": "16/05/2025",
				"fase": "7.4 - 8.1",
				"pagina_inicial": 48,
				"pagina_final": 52,
				"licoes": "48-52",
				"clave": "Sol",
				"observacoes": "",
				"instrutor": "RICARDO C. GRANGEIRO"
			},
			{
				"id": 3,
				"data_aula": "15/05/2025",
				"fase": "7.1 - 7.3",
				"pagina_inicial": 45,
				"pagina_final": 47,
				"licoes": "45-47",
				"clave": "Sol",
				"observacoes": "",
				"instrutor": "RICARDO C. GRANGEIRO"
			},
			{
				"id": 4,
				"data_aula": "14/05/2025",
				"fase": "6.3 - 7.0",
				"pagina_inicial": 42,
				"pagina_final": 44,
				"licoes": "42-44",
				"clave": "Sol",
				"observacoes": "",
				"instrutor": "RICARDO C. GRANGEIRO"
			},
			{
				"id": 5,
				"data_aula": "13/05/2025",
				"fase": "6.1 - 6.2",
				"pagina_inicial": 40,
				"pagina_final": 41,
				"licoes": "40-41",
				"clave": "Sol",
				"observacoes": "",
				"instrutor": "RICARDO C. GRANGEIRO"
			},
			{
				"id": 6,
				"data_aula": "12/05/2025",
				"fase": "5.4 - 6.0",
				"pagina_inicial": 38,
				"pagina_final": 39,
				"licoes": "38-39",
				"clave": "Sol",
				"observacoes": "",
				"instrutor": "RICARDO C. GRANGEIRO"
			}
		],
		"avaliacoes": [
			{
				"id": 1,
				"data_avaliacao": "2024-01-25",
				"modulo": "Fase 1",
				"nota": 8.5,
				"avaliador": "Pedro Costa",
				"observacoes": "Excelente desempenho"
			}
		],
		"metodos": [],
		"hinario": [],
		"escalas": [],
		"atividades": []
	}
	return render(request, "pages/resumo_musico.html", context)

def handler404(request, exception = None):
	return redirect('/404/')