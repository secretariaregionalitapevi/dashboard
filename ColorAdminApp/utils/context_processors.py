from django.urls import resolve

def mark_active_link(menu, current_path_name):
    for item in menu:
        item['is_active'] = item.get('name', '') == current_path_name

        if 'children' in item:
            item['children'] = mark_active_link(item['children'], current_path_name)

            if any(child.get('is_active', False) for child in item['children']):
                item['is_active'] = True

    return menu

def sidebar_menu(request):
	sidebar_menu = [{
		'text': 'Navigation',
		'is_header': 'true'
	},
	{ 
		'url': '/dashboard/v3', 'icon': 'fa fa-sitemap', 'title': 'Dashboard',
		
	},
	{ 'url': '/ai', 'icon': 'fa fa-child', 'title': 'Musicalização',
		'children': [
			{ 'url': '/ai/chat', 'title': 'Crianças', 'name': 'criancas' },
			{ 'url': '/ai/image-generator', 'title': 'Polos', 'name': 'polos' }
		]
	},
	{ 'url': '/email', 'icon': 'fa fa-medkit', 'title': 'D.A.R.P.E', 'label': 'NOVO',
		'children': [
			{ 'url': '/email/inbox', 'title': 'Músicos', 'name': 'musicos' },
			{ 'url': '/email/compose', 'title': 'Clínica', 'name': 'clinica' },
			{ 'url': '/ai/chat', 'title': 'Ministério', 'name': 'ministerio' },
			{ 'url': '/ai/chat', 'title': 'Atendimentos', 'name': 'atendimentos' },
			{ 'url': '/ai/chat', 'title': 'Membros', 'name': 'membros' },
			{ 'url': '/email/detail', 'title': 'Batismos', 'name': 'batismos' }
		]
	},
	{ 'url': '/widgets', 'icon': 'fab fa-simplybuilt', 'title': 'Widgets', 'label': 'NOVO', 'name': 'widgets' },
	{ 'url': '/ui', 'icon': 'fa fa-gem', 'title': 'UI Elements', 'label': 'NOVO',
		'children': [
			{ 'url': '/ui/general', 'title': 'General', 'highlight': 'true', 'name': 'uiGeneral' },
			{ 'url': '/ui/typography', 'title': 'Typograhy', 'name': 'uiTypography' },
			{ 'url': '/ui/tabs-accordions', 'title': 'Tabs & Accordions', 'name': 'uiTabsAccordions' },
			{ 'url': '/ui/unlimited-nav-tabs', 'title': 'Unlimited Nav Tabs', 'name': 'uiUnlimitedNavTabs' },
			{ 'url': '/ui/modal-notifications', 'title': 'Modal & Notification', 'name': 'uiModalNotifications' },
			{ 'url': '/ui/widget-boxes', 'title': 'Widget Boxes', 'name': 'uiWidgetBoxes' },
			{ 'url': '/ui/media-object', 'title': 'Media Object', 'name': 'uiMediaObject' },
			{ 'url': '/ui/buttons', 'title': 'Buttons', 'highlight': 'true', 'name': 'uiButtons' },
			{ 'url': '/ui/icon-fontawesome', 'title': 'FontAwesome', 'name': 'uiIconFontawesome' },
			{ 'url': '/ui/icon-bootstrap-icons', 'title': 'Bootstrap Icons', 'name': 'uiIconBootstrapIcons' },
			{ 'url': '/ui/icon-duotone', 'title': 'Duotone Icons', 'highlight': 'true', 'name': 'uiIconDuotone' },
			{ 'url': '/ui/icon-simple-line-icons', 'title': 'Simple Line Icons', 'name': 'uiIconSimpleLineIcons' },
			{ 'url': '/ui/icon-ionicons', 'title': 'Ionicons', 'name': 'uiIconIonicons' },
			{ 'url': '/ui/tree-view', 'title': 'Tree View', 'highlight': 'true', 'name': 'uiTreeView' },
			{ 'url': '/ui/language-bar-icon', 'title': 'Language Bar & Icon', 'name': 'uiLanguageBarIcon' },
			{ 'url': '/ui/social-buttons', 'title': 'Social Buttons', 'name': 'uiSocialButtons' },
			{ 'url': '/ui/intro-js', 'title': 'Intro JS', 'name': 'uiIntroJS' },
			{ 'url': '/ui/offcanvas-toasts', 'title': 'Offcanvas & Toasts', 'name': 'uiOffcanvasToasts' }
		]
	},
	{ 'url': '/bootstrap-5', 'img': '/img/logo/logo-bs5.png', 'title': 'Bootstrap 5', 'label': 'NOVO', 'name': 'bootstrap5' },
	{ 'url': '/form', 'icon': 'fa fa-list-ol', 'title': 'Form Stuff', 'label': 'NOVO',
		'children': [
			{ 'url': '/form/elements', 'title': 'Form Elements', 'highlight': 'true', 'name': 'formElements' },
			{ 'url': '/form/plugins', 'title': 'Form Plugins', 'highlight': 'true', 'name': 'formPlugins' },
			{ 'url': '/form/slider-switcher', 'title': 'Form Slider + Switcher', 'name': 'formSliderSwitcher' },
			{ 'url': '/form/validation', 'title': 'Form Validation', 'name': 'formValidation' },
			{ 'url': '/form/wizards', 'title': 'Form Wizards', 'highlight': 'true', 'name': 'formWizards' },
			{ 'url': '/form/wysiwyg', 'title': 'WYSIWYG', 'name': 'formWysiwyg' },
			{ 'url': '/form/x-editable', 'title': 'X-Editable', 'name': 'formXEditable' },
			{ 'url': '/form/multiple-file-upload', 'title': 'Multiple File Upload', 'name': 'formMultipleFileUpload' },
			{ 'url': '/form/summernote', 'title': 'Summernote', 'name': 'formSummernote' },
			{ 'url': '/form/dropzone', 'title': 'Dropzone', 'name': 'formDropzone' },
		]
	},
	{ 'url': '/table', 'icon': 'fa fa-table', 'title': 'Tables',
		'children': [
			{ 'url': '/table/basic', 'title': 'Basic Tables', 'name': 'tableBasic' },
			{ 'url': '/table/manage', 'title': 'Managed Tables',
			'children': [
					{ 'url': '/table/manage/default', 'title': 'Default', 'name': 'tableManageDefault' },
					{ 'url': '/table/manage/buttons', 'title': 'Buttons', 'name': 'tableManageButtons' },
					{ 'url': '/table/manage/col-reorder', 'title': 'ColReorder', 'name': 'tableManageColReorder' },
					{ 'url': '/table/manage/fixed-column', 'title': 'Fixed Column', 'name': 'tableManageFixedColumn' },
					{ 'url': '/table/manage/fixed-header', 'title': 'Fixed Header', 'name': 'tableManageFixedHeader' },
					{ 'url': '/table/manage/keytable', 'title': 'KeyTable', 'name': 'tableManageKeytable' },
					{ 'url': '/table/manage/responsive', 'title': 'Responsive', 'name': 'tableManageResponsive' },
					{ 'url': '/table/manage/row-reorder', 'title': 'RowReorder', 'name': 'tableManageRowReorder' },
					{ 'url': '/table/manage/scroller', 'title': 'Scroller', 'name': 'tableManageScroller' },
					{ 'url': '/table/manage/select', 'title': 'Select', 'name': 'tableManageSelect' },
					{ 'url': '/table/manage/extension-combination', 'title': 'Extension Combination', 'name': 'tableManageExtensionCombination' },
				]
			}
		]
	},
	{ 'url': '/pos', 'icon': 'fa fa-cash-register', 'title': 'POS System', 'label': 'NOVO',
		'children': [
			{ 'url': '/pos/customer-order', 'title': 'Customer Order', 'name': 'posCustomerOrder' },
			{ 'url': '/pos/counter-checkout', 'title': 'Counter Checkout', 'name': 'posCounterCheckout' },
			{ 'url': '/pos/kitchen-order', 'title': 'Kitchen Order', 'name': 'posKitchenOrder' },
			{ 'url': '/pos/table-booking', 'title': 'Table Booking', 'name': 'posTableBooking' },
			{ 'url': '/pos/menu-stock', 'title': 'Menu Stock', 'name': 'posMenuStock' }
		]
	},
	{ 'url': '/chart', 'icon': 'fa fa-chart-pie', 'title': 'Chart', 'label': 'NOVO',
		'children': [
			{ 'url': '/chart/flot', 'title': 'Flot Chart', 'name': 'chartFlot' },
			{ 'url': '/chart/js', 'title': 'Chart JS', 'name': 'chartJs' },
			{ 'url': '/chart/d3', 'title': 'd3 Chart', 'name': 'chartD3' },
			{ 'url': '/chart/apex', 'title': 'Apex Chart', 'name': 'chartApex' }
		]
	},
	{ 'url': '/landing', 'icon': 'fa fa-crown', 'title': 'Landing Page', 'name': 'landing', 'label': 'NOVO' },
	{ 'url': '/calendar', 'icon': 'fa fa-calendar', 'title': 'Calendar', 'name': 'calendar' },
	{ 'url': '/map', 'icon': 'fa fa-map', 'title': 'Map',
		'children': [
			{ 'url': '/map/vector', 'title': 'Vector Map', 'name': 'mapVector' },
			{ 'url': '/map/google', 'title': 'Google Map', 'name': 'mapGoogle' }
		]
	},
	{ 'url': '/gallery', 'icon': 'fa fa-image', 'title': 'Gallery',
		'children': [
			{ 'url': '/gallery/v1', 'title': 'Gallery v1', 'name': 'galleryV1' },
			{ 'url': '/gallery/v2', 'title': 'Gallery v2', 'name': 'galleryV2' }
		]
	},
	{ 'url': '/page-option', 'icon': 'fa fa-cogs', 'title': 'Page Options', 'label': 'NOVO',
		'children': [
			{ 'url': '/page-option/blank', 'title': 'Blank Page', 'name': 'pageOptionBlank' },
			{ 'url': '/page-option/with-footer', 'title': 'Page with Footer', 'name': 'pageOptionWithFooter' },
			{ 'url': '/page-option/with-fixed-footer', 'title': 'Page with Fixed Footer', 'highlight': 'true', 'name': 'pageOptionWithFixedFooter' },
			{ 'url': '/page-option/without-sidebar', 'title': 'Page without Sidebar', 'name': 'pageOptionWithoutSidebar' },
			{ 'url': '/page-option/with-right-sidebar', 'title': 'Page with Right Sidebar', 'name': 'pageOptionWithRightSidebar' },
			{ 'url': '/page-option/with-minified-sidebar', 'title': 'Page with Minified Sidebar', 'name': 'pageOptionWithMinifiedSidebar' },
			{ 'url': '/page-option/with-two-sidebar', 'title': 'Page with Two Sidebar', 'name': 'pageOptionWithTwoSidebar' },
			{ 'url': '/page-option/full-height', 'title': 'Full Height Content', 'name': 'pageOptionFullHeight' },
			{ 'url': '/page-option/with-wide-sidebar', 'title': 'Page with Wide Sidebar', 'name': 'pageOptionWithWideSidebar' },
			{ 'url': '/page-option/with-light-sidebar', 'title': 'Page with Light Sidebar', 'name': 'pageOptionWithLightSidebar' },
			{ 'url': '/page-option/with-mega-menu', 'title': 'Page with Mega Menu', 'name': 'pageOptionWithMegaMenu' },
			{ 'url': '/page-option/with-top-menu', 'title': 'Page with Top Menu', 'name': 'pageOptionWithTopMenu' },
			{ 'url': '/page-option/with-boxed-layout', 'title': 'Page with Boxed Layout', 'name': 'pageOptionWithBoxedLayout' },
			{ 'url': '/page-option/with-mixed-menu', 'title': 'Page with Mixed Menu', 'name': 'pageOptionWithMixedMenu' },
			{ 'url': '/page-option/boxed-layout-with-mixed-menu', 'title': 'Boxed Layout with Mixed Menu', 'name': 'pageOptionBoxedLayoutWithMixedMenu' },
			{ 'url': '/page-option/with-transparent-sidebar', 'title': 'Page with Transparent Sidebar', 'name': 'pageOptionWithTransparentSidebar' },
			{ 'url': '/page-option/with-search-sidebar', 'title': 'Page with Search Sidebar', 'highlight': 'true', 'name': 'pageOptionWithSearchSidebar' },
			{ 'url': '/page-option/with-hover-sidebar', 'title': 'Page with Hover Sidebar', 'highlight': 'true', 'name': 'pageOptionWithHoverSidebar' },
		]
	},
	{ 'url': '/extra', 'icon': 'fa fa-gift', 'title': 'Extra', 'label': 'NOVO',
		'children': [
			{ 'url': '/extra/timeline', 'title': 'Timeline', 'name': 'extraTimeline' },
			{ 'url': '/extra/coming-soon', 'title': 'Coming Soon Page', 'name': 'extraComingSoon' },
			{ 'url': '/extra/search', 'title': 'Search Results', 'name': 'extraSearch' },
			{ 'url': '/extra/invoice', 'title': 'Invoice', 'name': 'extraInvoice' },
			{ 'url': '/extra/error', 'title': '404 Error Page', 'name': 'extraError' },
			{ 'url': '/extra/profile', 'title': 'Profile Page', 'name': 'extraProfile' },
			{ 'url': '/extra/scrum-board', 'title': 'Scrum Board', 'highlight': 'true', 'name': 'extraScrumBoard' },
			{ 'url': '/extra/cookie-acceptance-banner', 'title': 'Cookie Acceptance Banner', 'highlight': 'true', 'name': 'extraCookieAcceptanceBanner' },
			{ 'url': '/extra/orders', 'title': 'Orders', 'highlight': 'true', 'name': 'extraOrders' },
			{ 'url': '/extra/order-details', 'title': 'Order Details', 'highlight': 'true', 'name': 'extraOrderDetails' },
			{ 'url': '/extra/products', 'title': 'Products', 'highlight': 'true', 'name': 'extraProducts' },
			{ 'url': '/extra/product-details', 'title': 'Product Details', 'highlight': 'true', 'name': 'extraProductDetails' },
			{ 'url': '/extra/file-manager', 'title': 'File Manager', 'highlight': 'true', 'name': 'extraFileManager' },
			{ 'url': '/extra/pricing', 'title': 'Pricing Page', 'highlight': 'true', 'name': 'extraPricing' },
			{ 'url': '/extra/messenger', 'title': 'Messenger Page', 'highlight': 'true', 'name': 'extraMessenger' },
			{ 'url': '/extra/data-management', 'title': 'Data Management', 'highlight': 'true', 'name': 'extraDataManagement' },
			{ 'url': '/extra/settings', 'title': 'Settings Page', 'highlight': 'true', 'name': 'extraSettings' }
		]
	},
	{ 'url': '/user', 'icon': 'fa fa-key', 'title': 'Login & Register',
		'children': [
			{ 'url': '/user/login-v1', 'title': 'Login', 'name': 'userLoginV1' },
			{ 'url': '/user/login-v2', 'title': 'Login v2', 'name': 'userLoginV2' },
			{ 'url': '/user/login-v3', 'title': 'Login v3', 'name': 'userLoginV3' },
			{ 'url': '/user/register-v3', 'title': 'Register v3', 'name': 'userRegisterV3' }
		]
	},
	{ 'url': '/helper', 'icon': 'fa fa-medkit', 'title': 'Helper',
		'children': [
			{ 'url': '/helper/css', 'title': 'Predefined CSS Classes', 'name': 'helperCss' }
		]
	},
	{ 'url': '/menu', 'icon': 'fa fa-align-left', 'title': 'Menu Level',
		'children': [
			{ 'url': '#', 'title': 'Menu 1.1',
				'children': [
					{ 'url': '#', 'title': 'Menu 2.1',
						'children': [
							{ 'url': '#', 'title': 'Menu 3.1' },
							{ 'url': '#', 'title': 'Menu 3.2' }
						]
					},
					{ 'url': '#', 'title': 'Menu 2.2' },
					{ 'url': '#', 'title': 'Menu 2.3' },
				]
			},
			{ 'url': '#', 'title': 'Menu 1.2' },
			{ 'url': '#', 'title': 'Menu 1.3' },
		]
	}]
	
	resolved_path = resolve(request.path_info)

	current_path_name = resolved_path.url_name
	
	sidebar_menu = mark_active_link(sidebar_menu, current_path_name)

	return {'sidebar_menu': sidebar_menu}