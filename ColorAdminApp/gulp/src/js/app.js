/*
Template Name: Color Admin - Responsive Admin Dashboard Template build with Twitter Bootstrap 5
Version: 5.5.2
Author: Sean Ngu
Website: http://www.seantheme.com/color-admin/
	----------------------------
	APPS CONTENT TABLE
	----------------------------

	<!-- ======== GLOBAL SCRIPT SETTING ======== -->
	01. Handle Scrollbar
	02. Handle Sidebar Menu
	03. Handle Sidebar Toggle
	04. Handle Sidebar End
	05. Handle Sidebar Minified
	06. Handle Page Loader 
	07. Handle Panel Action
	08. Handle Panel Draggable
	09. Handle Tooltip Popover Activation
	10. Handle Scroll to Top Button
	11. Handle Theme Panel
	12. Handle Save Panel Position Function
	13. Handle Draggable Panel Local Storage Function
	14. Handle Reset Local Storage
	15. Handle Unlimited Nav Tabs
	16. Handle Top Menu - Unlimited Top Menu Render
	17. Handle Top Menu - Sub Menu Toggle
	18. Handle Top Menu - Mobile Sub Menu Toggle
	19. Handle Top Menu - Mobile Top Menu Toggle
	20. Handle Page Scroll Class
	21. Handle Toggle Navbar Profile
	22. Handle Sidebar Scroll Memory
	23. Handle Sidebar Minify Sub Menu
	24. Handle Ajax Mode
	25. Handle Float Navbar Search
	26. Handle Animation
	27. Handle Sidebar Search
	28. Handle Toggle Class
	29. Handle Dismiss Class
	30. Handle Hex To Rgba
	31. Handle Get Css Variable
	32. Handle Scroll To

	<!-- ======== APPLICATION SETTING ======== -->
	Application Controller
*/
var app = {
	id: '#app',
	class: 'app',
	isMobile: ((/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) || window.innerWidth < 767),
	bootstrap: {
		tooltip: {
			attr: 'data-bs-toggle="tooltip"'
		},
		popover: {
			attr: 'data-bs-toggle="popover"'
		},
		modal: {
			attr: 'data-bs-toggle="modal"',
			dismissAttr: 'data-bs-dismiss="modal"',
			event: {
				hidden: 'hidden.bs.modal'
			}
		},
		nav: {
			class: 'nav',
			tabs: {
				class: 'nav-tabs',
				activeClass: 'active',
				itemClass: 'nav-item',
				itemLinkClass: 'nav-link'
			}
		}
	},
	ajax: {
		attr: 'data-toggle="ajax"',
		clearOption: '',
		clearElement: '#app-sidebar-float-submenu, .jvectormap-label, .jvector-label, .AutoFill_border ,#gritter-notice-wrapper, .ui-autocomplete, .colorpicker, .FixedHeader_Header, .FixedHeader_Cloned .lightboxOverlay, .lightbox, .introjs-hints, .nvtooltip, .sp-container, .dz-hidden-input, .lightboxOverlay, .ui-helper-hidden-accessible',
		emptyElement: '[data-id="app-extra-elm"]',
		loader: {
			id: '#app-content-loader',
			html: '<span class="spinner d-block mx-auto my-5"></span>',
			class: 'app-content-loading'
		},
		error: {
			html: '<div class="px-3 text-center fs-20px"><i class="fa fa-warning fa-lg text-muted me-1"></i> <span class="fw-600 text-inverse">Error 404! Page not found.</span></div>'
		}
	},
	header: {
		id: '#header',
		class: 'app-header',
		hasScrollClass: 'has-scroll',
		brand: {
			class: 'navbar-brand'
		},
		floatingForm: {
			toggleAttr: 'data-toggle="app-header-floating-form"',
			dismissAttr: 'data-dismiss="app-header-floating-form"',
			toggledClass: 'app-header-floating-form-toggled'
		},
		inverse: {
			class: 'app-header-inverse'
		}
	},
	sidebar: {
		id: '#sidebar',
		class: 'app-sidebar',
		scrollBar: {
			localStorage: 'appSidebarScrollPosition',
			dom: ''
		},
		bg: {
			class: 'app-sidebar-bg'
		},
		menu: {
			class: 'menu',
			disableAnimationAttr: 'data-disable-slide-animation',
			disableAutoCollapseAttr: 'data-disable-auto-collapse',
			animationTime: 250,
			headerClass: 'menu-header',
			itemClass: 'menu-item',
			itemLinkClass: 'menu-link',
			hasSubClass: 'has-sub',
			activeClass: 'active',
			expandingClass: 'expanding',
			expandClass: 'expand',
			closingClass: 'closing',
			closedClass: 'closed',
			submenu: {
				class: 'menu-submenu',
			}
		},
		profile: {
			class: 'menu-profile',
			toggleAttr: 'data-toggle="app-sidebar-profile"',
			targetAttr: 'data-target'
		},
		mobile: {
			toggleAttr: 'data-toggle="app-sidebar-mobile"',
			dismissAttr: 'data-dismiss="app-sidebar-mobile"',
			toggledClass: 'app-sidebar-mobile-toggled',
			closedClass: 'app-sidebar-mobile-closed',
			backdrop: {
				class: 'app-sidebar-mobile-backdrop'
			}
		},
		minify: {
			toggleAttr: 'data-toggle="app-sidebar-minify"',
			toggledClass: 'app-sidebar-minified',
			cookieName: 'app-sidebar-minified'
		},
		floatSubmenu: {
			id: '#app-sidebar-float-submenu',
			dom: '',
			timeout: '',
			class: 'app-sidebar-float-submenu',
			container: {
				class: 'app-sidebar-float-submenu-container'
			},
			arrow: {
				id: '#app-sidebar-float-submenu-arrow',
				class: 'app-sidebar-float-submenu-arrow'
			},
			line: {
				id: '#app-sidebar-float-submenu-line',
				class: 'app-sidebar-float-submenu-line'
			},
			overflow: {
				class: 'overflow-scroll mh-100vh'
			}
		},
		search: {
			class: 'menu-search',
			toggleAttr: 'data-sidebar-search="true"',
			hideClass: 'd-none',
			foundClass: 'has-text'
		},
		hover: {
			class: 'app-with-hover-sidebar'
		},
		transparent: {
			class: 'app-sidebar-transparent'
		}
	},
	sidebarEnd: {
		class: 'app-sidebar-end',
		toggleAttr: 'data-toggle="app-sidebar-end"',
		toggledClass: 'app-sidebar-end-toggled',
		collapsedClass: 'app-sidebar-end-collapsed',
		mobile: {
			toggleAttr: 'data-toggle="app-sidebar-end-mobile"',
			dismissAttr: 'data-dismiss="app-sidebar-end-mobile"',
			toggledClass: 'app-sidebar-end-mobile-toggled',
			collapsedClass: 'app-sidebar-end-mobile-collapsed',
			closedClass: 'app-sidebar-end-mobile-closed'
		}
	},
	topMenu: {
		id: '#top-menu',
		class: 'app-top-menu',
		mobile: {
			toggleAttr: 'data-toggle="app-top-menu-mobile"'
		},
		menu: {
			class: 'menu',
			itemClass: 'menu-item',
			itemLinkClass: 'menu-link',
			activeClass: 'active',
			hasSubClass: 'has-sub',
			expandClass: 'expand',
			submenu: {
				class: 'menu-submenu'
			}
		},
		control: {
			class: 'menu-control',
			startClass: 'menu-control-start',
			endClass: 'menu-control-end',
			showClass: 'show',
			buttonPrev: {
				class: 'menu-control-start',
				toggleAttr: 'data-toggle="app-top-menu-prev"'
			},
			buttonNext: {
				class: 'menu-control-end',
				toggleAttr: 'data-toggle="app-top-menu-next"'
			}
		}
	},
	scrollBar: {
		attr: 'data-scrollbar="true"',
		skipMobileAttr: 'data-skip-mobile',
		initAttr: 'data-init',
		heightAttr: 'data-height',
		wheelPropagationAttr: 'data-wheel-propagation'
	},
	scrollTo: {
		toggleAttr: 'data-toggle="scroll-to"',
		targetAttr: 'data-target'
	},
	content: {
		id: '#content',
		class: 'app-content',
		fullHeight: {
			class: 'app-content-full-height'
		},
		fullWidth: {
			class: 'app-content-full-width'
		}
	},
	layout: {
		sidebarEnd: {
			class: 'app-with-end-sidebar'
		},
		sidebarWide: {
			class: 'app-with-wide-sidebar'
		},
		sidebarMinified: {
			class: 'app-sidebar-minified'
		},
		sidebarTwo: {
			class: 'app-with-two-sidebar'
		},
		withoutHeader: {
			class: 'app-without-header'
		},
		withoutSidebar: {
			class: 'app-without-sidebar'
		},
		topMenu: {
			class: 'app-with-top-menu'
		},
		boxedLayout: {
			class: 'boxed-layout'
		}
	},
	loader: {
		class: 'app-loader',
		fadingClass: 'fading',
		fadingTime: 200,
		loadedClass: 'loaded'
	},
	panel: {
		class: 'panel',
		headClass: 'panel-heading',
		titleClass: 'panel-title',
		bodyClass: 'panel-body',
		expandClass: 'panel-expand',
		loadingClass: 'panel-loading',
		loader: {
			class: 'panel-loader',
			html: '<span class="spinner spinner-sm"></span>'
		},
		toggle: {
			remove: {
				attr: 'data-toggle="panel-remove"',
				tooltipText: 'Remove'
			},
			collapse: {
				attr: 'data-toggle="panel-collapse"',
				tooltipText: 'Collapse / Expand'
			},
			reload: {
				attr: 'data-toggle="panel-reload"',
				tooltipText: 'Reload',
			},
			expand: {
				attr: 'data-toggle="panel-expand"',
				tooltipText: 'Expand / Compress'
			}
		},
		draggable: {
			disableAttr: 'data-sortable="false"',
			connectedTarget: '.row > [class*=col]',
			spinnerHtml: '<i class="fa fa-spinner fa-spin ms-2" data-id="title-spinner"></i>',
		},
		sortable: {
			class: 'ui-sortable',
			attr: 'data-sortable-id',
			spinnerAttr: 'data-id="title-spinner"',
			disableAttr: 'data-sortable="false"',
			parentAttr: 'class*="col-"'
		},
		localStorage: {
			notSupportMessage: 'Your browser is not supported with the local storage',
			loadedEvent: 'localstorage-position-loaded',
			reset: {
				attr: 'data-toggle="reset-local-storage"',
				modal: {
					id: '#modalResetLocalStorage',
					title: 'Reset Local Storage Confirmation',
					message: 'Would you like to RESET all your saved widgets and clear Local Storage?',
					alert: 'info',
					confirmResetAttr: 'data-toggle="confirm-reset-local-storage"'
				}
			}
		}
	},
	scrollToTopBtn: {
		showClass: 'show',
		heightShow: 200,
		toggleAttr: 'data-toggle="scroll-to-top"',
		scrollSpeed: 500
	},
	unlimitedTabs: {
		class: 'tab-overflow',
		overflowLeft: {
			class: 'overflow-left'
		},
		overflowRight: {
			class: 'overflow-right'
		},
		buttonNext: {
			class: 'next-button',
			toggleAttr: 'data-click="next-tab"'
		},
		buttonPrev: {
			class: 'prev-button',
			toggleAttr: 'data-click="prev-tab"'
		}
	},
	themePanel: {
		class: 'theme-panel',
		toggleAttr: 'data-toggle="theme-panel-expand"',
		cookieName: 'theme-panel-expand',
		activeClass: 'active',
		themeListCLass: 'theme-list',
		themeListItemCLass: 'theme-list-item',
		theme: {
			toggleAttr: 'data-toggle="theme-selector"',
			cookieName: 'app-theme',
			activeClass: 'active',
			classAttr: 'data-theme-class'
		},
		themeHeader: {
			toggleAttr: 'name="app-header-inverse"',
			cookieName: 'app-theme-header'
		},
		themeHeaderFixed: {
			class: 'app-header-fixed',
			toggleAttr: 'name="app-header-fixed"',
			cookieName: 'app-header-fixed',
			disabledClass: 'app-header-fixed-disabled',
			errorMessage: 'Default Header with Fixed Sidebar option is not supported. Proceed with Default Header with Default Sidebar.'
		},
		themeSidebarGrid: {
			class: 'app-sidebar-grid',
			toggleAttr: 'name="app-sidebar-grid"',
			cookieName: 'app-sidebar-grid',
		},
		themeGradientEnabled: {
			class: 'app-gradient-enabled',
			toggleAttr: 'name="app-gradient-enabled"',
			cookieName: 'app-gradient-enabled',
		},
		themeSidebarFixed: {
			class: 'app-sidebar-fixed',
			toggleAttr: 'name="app-sidebar-fixed"',
			cookieName: 'app-sidebar-fixed',
			disabledClass: 'app-sidebar-fixed-disabled',
			errorMessage: 'Default Header with Fixed Sidebar option is not supported. Proceed with Fixed Header with Fixed Sidebar.',
			mobileErrorMessage: 'Mobile view sidebar will always fixed'
		},
		themeDarkMode: {
			class: 'dark-mode',
			toggleAttr: 'name="app-theme-dark-mode"',
			cookieName: 'app-theme-dark-mode'
		},
		themeRtlMode: {
			toggleAttr: 'name="app-rtl-mode"',
			cookieName: 'app-rtl-mode',
		}
	},
	animation: {
		attr: 'data-animation',
		valueAttr: 'data-value',
		speed: 300,
		effect: 'swing'
	},
	dismissClass: {
		toggleAttr: 'data-dismiss-class',
		targetAttr: 'data-target'
	},
	toggleClass: {
		toggleAttr: 'data-toggle-class',
		targetAttr: 'data-target'
	},
	helper: {
		display: {
			none: 'd-none'
		},
		margin: {
			left: {
				0: 'ms-0'
			},
			right: {
				0: 'me-0'
			}
		}
	},
	darkMode: {
		attr: 'data-bs-theme',
		value: 'dark',
		eventName: 'theme-reload'
	},
	rtlMode: {
		attr: 'dir',
		value: 'rtl',
	},
	font: {},
	color: {},
	variablePrefix: 'bs-',
	variableFontList: ['body-font-family', 'body-font-size', 'body-font-weight', 'body-line-height'],
	variableColorList: [
		'theme', 'theme-rgb', 'theme-color', 'theme-color-rgb',
		'component-color', 'component-color-rgb', 'component-bg', 'component-bg-rgb',
		'component-secondary-bg', 'component-bg-rgb', 'component-tertiary-bg', 'component-tertiary-bg-rgb',
		'default', 'default-rgb',
		'primary', 'primary-rgb', 'primary-bg-subtle', 'primary-text', 'primary-border-subtle',
		'secondary', 'secondary-rgb', 'secondary-bg-subtle', 'secondary-text', 'secondary-border-subtle',
		'success', 'success-rgb', 'success-bg-subtle', 'success-text', 'success-border-subtle',
		'warning', 'warning-rgb', 'warning-bg-subtle', 'warning-text', 'warning-border-subtle',
		'info', 'info-rgb', 'info-bg-subtle', 'info-text', 'info-border-subtle',
		'danger', 'danger-rgb', 'danger-bg-subtle', 'danger-text', 'danger-border-subtle',
		'light', 'light-rgb', 'light-bg-subtle', 'light-text', 'light-border-subtle',
		'dark', 'dark-rgb', 'dark-bg-subtle', 'dark-text', 'dark-border-subtle',
		'black', 'black-rgb',
		'blue', 'blue-rgb', 
		'inverse', 'inverse-rgb',
		'white', 'white-rgb',
		'red', 'red-rgb', 
		'teal', 'teal-rgb',
		'indigo', 'indigo-rgb', 
		'orange', 'orange-rgb', 
		'purple', 'purple-rgb',
		'yellow', 'yellow-rgb',
		'green', 'green-rgb',
		'pink', 'pink-rgb',
		'cyan', 'cyan-rgb',
		'gray', 'gray-rgb',
		'lime', 'lime-rgb',
		'gray-100', 'gray-200', 'gray-300', 'gray-400', 'gray-500',  'gray-600', 'gray-700', 'gray-800', 'gray-900', 
		'gray-100-rgb', 'gray-200-rgb', 'gray-300-rgb', 'gray-400-rgb', 'gray-500-rgb',  'gray-600-rgb', 'gray-700-rgb', 'gray-800-rgb', 'gray-900-rgb', 
		'muted', 'muted-rgb', 'emphasis-color', 'emphasis-color-rgb',
		'heading-color', 
		'body-bg', 'body-bg-rgb', 'body-color', 'body-color-rgb',
		'secondary-color', 'secondary-color-rgb', 'secondary-bg', 'secondary-bg-rgb',
		'tertiary-color', 'tertiary-color-rgb', 'tertiary-bg', 'tertiary-bg-rgb',
		'link-color', 'link-color-rgb', 'link-hover-color', 'link-hover-color-rgb', 
		'border-color', 'border-color-translucent'
	],
	breakpoints: {
		xs: 0,
		sm: 576,
		md: 768,
		lg: 992,
		xl: 1200,
		xxl: 1400,
		xxxl: 1800
	}
};

var slideUp = function(elm, duration = app.animation.speed) {
	if (elm.classList.contains('transitioning')) return;

	elm.classList.add('transitioning');

	const height = elm.offsetHeight;

	elm.style.height = height + 'px';
	elm.style.transition = `height ${duration}ms ease, padding ${duration}ms ease, margin ${duration}ms ease`;
	elm.style.boxSizing = 'border-box';
	elm.style.overflow = 'hidden';

	requestAnimationFrame(() => {
		elm.style.height = '0';
		elm.style.paddingTop = '0';
		elm.style.paddingBottom = '0';
		elm.style.marginTop = '0';
		elm.style.marginBottom = '0';

		setTimeout(() => {
			elm.style.display = 'none';
			elm.style.removeProperty('height');
			elm.style.removeProperty('padding-top');
			elm.style.removeProperty('padding-bottom');
			elm.style.removeProperty('margin-top');
			elm.style.removeProperty('margin-bottom');
			elm.style.removeProperty('overflow');
			elm.style.removeProperty('transition');
			elm.classList.remove('transitioning');
		}, duration);
	});
};

var slideDown = function(elm, duration = app.animation.speed) {
	if (elm.classList.contains('transitioning')) return;

	elm.classList.add('transitioning');
	elm.style.removeProperty('display');

	let display = window.getComputedStyle(elm).display;
	if (display === 'none') display = 'block';
	elm.style.display = display;

	const height = elm.scrollHeight;

	elm.style.height = '0';
	elm.style.paddingTop = '0';
	elm.style.paddingBottom = '0';
	elm.style.marginTop = '0';
	elm.style.marginBottom = '0';
	elm.style.boxSizing = 'border-box';
	elm.style.overflow = 'hidden';

	requestAnimationFrame(() => {
		elm.style.transition = `height ${duration}ms ease, padding ${duration}ms ease, margin ${duration}ms ease`;
		elm.style.height = height + 'px';
		elm.style.removeProperty('padding-top');
		elm.style.removeProperty('padding-bottom');
		elm.style.removeProperty('margin-top');
		elm.style.removeProperty('margin-bottom');

		setTimeout(() => {
			elm.style.removeProperty('height');
			elm.style.removeProperty('overflow');
			elm.style.removeProperty('transition');
			elm.classList.remove('transitioning');
		}, duration);
	});
};

var slideToggle = function(elm, duration = app.animation.speed) {
	if (window.getComputedStyle(elm).display === 'none') {
		return slideDown(elm, duration);
	} else {
		return slideUp(elm, duration);
	}
};

var setCookie = function(cookieName, cookieValue) {
	var now = new Date();
  var time = now.getTime();
  var expireTime = time + 1000*36000;
  now.setTime(expireTime);
  document.cookie = cookieName + '='+ cookieValue +';expires='+now.toUTCString()+';path=/';
};

var getCookie = function(cookieName) {
  let name = cookieName + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
};

var getParents = function(el, parentSelector) {
	if (parentSelector === undefined) {
		parentSelector = document;
	}
	var parents = [];
	var p = el.parentNode;

	while (p !== parentSelector) {
		var o = p;
		parents.push(o);
		p = o.parentNode;
	}
	parents.push(parentSelector);
	return parents;
};

var setInnerHTML = function(elm, html) {
	elm.innerHTML = html;
	Array.from(elm.querySelectorAll('script')).forEach( oldScript => {
		const newScript = document.createElement('script');
		Array.from(oldScript.attributes).forEach(attr => newScript.setAttribute(attr.name, attr.value));
		newScript.appendChild(document.createTextNode(oldScript.innerHTML));
		oldScript.parentNode.replaceChild(newScript, oldScript);
	});
};


/* 1. Handle Scrollbar
------------------------------------------------ */
var handleScrollbar = function() {
	"use strict";
	
	var elms = document.querySelectorAll('['+ app.scrollBar.attr +']');
		
	for (var i = 0; i < elms.length; i++) {
		generateScrollbar(elms[i])
	}
};
var generateScrollbar = function(elm) {
  "use strict";
	
	if (elm.scrollbarInit || (app.isMobile && elm.getAttribute(app.scrollBar.skipMobileAttr))) {
		return;
	}
	var dataHeight = (!elm.getAttribute(app.scrollBar.heightAttr)) ? elm.offsetHeight : elm.getAttribute(app.scrollBar.heightAttr);
	
	elm.style.height = dataHeight;
	elm.scrollbarInit = true;
	
	if(app.isMobile) {
		elm.style.overflowX = 'scroll';
	} else {
		var dataWheelPropagation = (elm.getAttribute(app.scrollBar.wheelPropagationAttr)) ? elm.getAttribute(app.scrollBar.wheelPropagationAttr) : false;
		
		if (elm.closest('.'+ app.sidebar.class +':not(.'+ app.sidebarEnd.class +')') && elm.closest('.'+ app.sidebar.class +':not(.'+ app.sidebarEnd.class +')').length !== 0) {
			app.sidebar.scrollBar.dom = new PerfectScrollbar(elm, {
				wheelPropagation: dataWheelPropagation
			});
		} else {
			new PerfectScrollbar(elm, {
				wheelPropagation: dataWheelPropagation
			});
		}
	}
};


/* 2. Handle Sidebar Menu
------------------------------------------------ */
var handleSidebarMenuToggle = function(menus, expandTime) {
	menus.map(function(menu) {
		menu.onclick = function(e) {
			e.preventDefault();
			var target = this.nextElementSibling;
	
			menus.map(function(m) {
				var otherTarget = m.nextElementSibling;
				if (otherTarget !== target) {
					slideUp(otherTarget, expandTime);
					otherTarget.closest('.'+ app.sidebar.menu.itemClass).classList.remove(app.sidebar.menu.expandClass);
					otherTarget.closest('.'+ app.sidebar.menu.itemClass).classList.add(app.sidebar.menu.closedClass);
				}
			});
	
			var targetItemElm = target.closest('.'+ app.sidebar.menu.itemClass);
			
			if (targetItemElm.classList.contains(app.sidebar.menu.expandClass) || (targetItemElm.classList.contains(app.sidebar.menu.activeClass) && !target.style.display)) {
				targetItemElm.classList.remove(app.sidebar.menu.expandClass);
				targetItemElm.classList.add(app.sidebar.menu.closedClass);
				slideToggle(target, expandTime);
			} else {
				targetItemElm.classList.add(app.sidebar.menu.expandClass);
				targetItemElm.classList.remove(app.sidebar.menu.closedClass);
				slideToggle(target, expandTime);
			}
		}
	});
};
var handleSidebarMenu = function() {
  "use strict";
  
  var targetSidebar       = document.querySelector('.'+ app.sidebar.class + ':not(.'+ app.sidebarEnd.class+')');
	var expandTime          = (targetSidebar && targetSidebar.getAttribute(app.sidebar.menu.disableAnimationAttr)) ? 0 : app.sidebar.menu.animationTime;
	var disableAutoCollapse = (targetSidebar && targetSidebar.getAttribute(app.sidebar.menu.disableAutoCollapseAttr)) ? 1 : 0;
	
	var menuBaseSelector = '.'+ app.sidebar.class +' .'+ app.sidebar.menu.class +' > .'+ app.sidebar.menu.itemClass +'.'+ app.sidebar.menu.hasSubClass;
	var submenuBaseSelector = ' > .'+ app.sidebar.menu.submenu.class +' > .'+ app.sidebar.menu.itemClass + '.' + app.sidebar.menu.hasSubClass;
	
	// 2.1 Menu - Toggle / Collapse
	var menuLinkSelector =  menuBaseSelector + ' > .'+ app.sidebar.menu.itemLinkClass;
	var menus = [].slice.call(document.querySelectorAll(menuLinkSelector));
	if (menus) {
		handleSidebarMenuToggle(menus, expandTime);
	}
	
	// 2.2 Menu - Submenu lvl 1
	var submenuLvl1Selector = menuBaseSelector + submenuBaseSelector;
	var submenusLvl1 = [].slice.call(document.querySelectorAll(submenuLvl1Selector + ' > .' + app.sidebar.menu.itemLinkClass));
	if (submenusLvl1) {
		handleSidebarMenuToggle(submenusLvl1, expandTime);
	}
	
	// 2.3 submenu lvl 2
	var submenuLvl2Selector = menuBaseSelector + submenuBaseSelector + submenuBaseSelector;
	var submenusLvl2 = [].slice.call(document.querySelectorAll(submenuLvl2Selector + ' > .' + app.sidebar.menu.itemLinkClass));
	if (submenusLvl2) {
		handleSidebarMenuToggle(submenusLvl2, expandTime);
	}
};


/* 3. Handle Sidebar Toggle
------------------------------------------------ */
var handleSidebarToggle = function() {
  "use strict";

	// 3.1 Mobile - Toggle
	var elms = [].slice.call(document.querySelectorAll('['+ app.sidebar.mobile.toggleAttr +']'));
	elms.map(function(elm) {
		elm.onclick = function(e) {
			e.preventDefault();
			document.querySelector('.'+ app.class).classList.add(app.sidebar.mobile.toggledClass);
			document.querySelector('.'+ app.class).classList.remove(app.sidebar.mobile.closedClass);
		}
	});
	
	// 3.2 Mobile - Dismiss
	var elms = [].slice.call(document.querySelectorAll('['+ app.sidebar.mobile.dismissAttr +']'));
	elms.map(function(elm) {
		elm.onclick = function(e) {
			e.preventDefault();
			document.querySelector('.'+ app.class).classList.remove(app.sidebar.mobile.toggledClass);
			document.querySelector('.'+ app.class).classList.add(app.sidebar.mobile.closedClass);
		}
	});
	
	// 3.3 Mobile - Remove Closed Class
	var elms = [].slice.call(document.querySelectorAll('.'+ app.sidebar.class + ':not(.'+ app.sidebarEnd.class +')'));
	elms.map(function(elm) {
		elm.addEventListener('animationend', function() {
			document.querySelector('.'+ app.class).classList.remove(app.sidebar.mobile.closedClass);
		});
	});
};


/* 4. Handle Sidebar End
------------------------------------------------ */
var handleSidebarEndToggle = function() {
  "use strict";

	// 4.1 Desktop - Toggle / Collapse
	var elms = [].slice.call(document.querySelectorAll('['+ app.sidebarEnd.toggleAttr +']'));
	elms.map(function(elm) {
		elm.onclick = function(e) {
			e.preventDefault();
			var target = document.querySelector('.'+ app.class).classList;
			if (!target.contains(app.sidebarEnd.toggledClass) && !target.contains(app.sidebarEnd.collapsedClass)) {
				target.add(app.sidebarEnd.collapsedClass);
			} else if (target.contains(app.sidebarEnd.toggledClass)) {
				target.remove(app.sidebarEnd.toggledClass);
				target.add(app.sidebarEnd.collapsedClass);
			} else {
				target.remove(app.sidebarEnd.collapsedClass);
				target.add(app.sidebarEnd.toggledClass);
			}
		}
	});
	
	// 4.2 Mobile - Toggle
	var elms = [].slice.call(document.querySelectorAll('['+ app.sidebarEnd.mobile.toggleAttr +']'));
	elms.map(function(elm) {
		elm.onclick = function(e) {
			e.preventDefault();
			document.querySelector('.'+ app.class).classList.add(app.sidebarEnd.mobile.toggledClass);
			document.querySelector('.'+ app.class).classList.remove(app.sidebarEnd.mobile.closedClass);
		}
	});
	
	// 4.3 Mobile - Dismiss
	var elms = [].slice.call(document.querySelectorAll('['+ app.sidebarEnd.mobile.dismissAttr +']'));
	elms.map(function(elm) {
		elm.onclick = function(e) {
			e.preventDefault();
			document.querySelector('.'+ app.class).classList.remove(app.sidebarEnd.mobile.toggledClass);
			document.querySelector('.'+ app.class).classList.add(app.sidebarEnd.mobile.closedClass);
		}
	});
	
	// 4.4 Mobile - Remove Closed Class
	var elms = [].slice.call(document.querySelectorAll('.'+ app.sidebar.class + '.'+ app.sidebarEnd.class +''));
	elms.map(function(elm) {
		elm.addEventListener('animationend', function() {
			document.querySelector('.'+ app.class).classList.remove(app.sidebarEnd.mobile.closedClass);
		});
	});
};


/* 5. Handle Sidebar Minified
------------------------------------------------ */
var handleSidebarMinify = function() {
  "use strict";
	
	// 5.1 Minify - Toggle / Dismiss
	var elms = [].slice.call(document.querySelectorAll('['+ app.sidebar.minify.toggleAttr +']'));
	elms.map(function(elm) {
		elm.onclick = function(e) {
			e.preventDefault();
			var target = document.querySelector('.'+ app.class).classList;
			var state = false;
			if (target.contains(app.sidebar.minify.toggledClass)) {
				target.remove(app.sidebar.minify.toggledClass);
			} else {
				target.add(app.sidebar.minify.toggledClass);
				state = true;
			}
			if (document.querySelector(app.sidebar.floatSubmenu.id)) {
				document.querySelector(app.sidebar.floatSubmenu.id).remove();
			}
			setCookie(app.sidebar.minify.cookieName, state);
		}
	});
	
	// 5.2 Minify - Page Load Cookies 
	if (getCookie(app.sidebar.minify.cookieName) && getCookie(app.sidebar.minify.cookieName) == 'true') {
		document.querySelector('.' + app.class).classList.add(app.sidebar.minify.toggledClass);
	}
};


/* 6. Handle Page Loader 
------------------------------------------------ */
var handlePageLoader = function() {
  "use strict";
	
	var target = document.querySelector('.'+ app.loader.class);
	if (target) {
		target.addEventListener('animationend', function() {
			target.classList.remove(app.loader.fadingClass);
			target.classList.add(app.loader.loadedClass);
		});
		target.classList.add(app.loader.fadingClass);
	}
};


/* 7. Handle Panel Action
------------------------------------------------ */
var handlePanelAction = function() {
	"use strict";
	
	var panelTooltip;
	
	// 7.1 Panel Remove
	var elms = [].slice.call(document.querySelectorAll('['+ app.panel.toggle.remove.attr + ']'));
	elms.map(function(elm) {
		elm.onmouseover = function(e) {
			if (!this.hasAttribute('data-tooltip-init') && bootstrap) {
				panelTooltip = new bootstrap.Tooltip(this, { title: app.panel.toggle.remove.tooltipText, placement: 'bottom' });
				panelTooltip.show();
				this.setAttribute('data-tooltip-init', true);
			}
		}
		elm.onclick = function(e) {
			e.preventDefault();
			document.querySelector('.tooltip').remove();
			this.closest('.'+ app.panel.class).remove();
		}
	});
	
	// 7.2 Panel Collapse
	var elms = [].slice.call(document.querySelectorAll('['+ app.panel.toggle.collapse.attr + ']'));
	elms.map(function(elm) {
		elm.onmouseover = function(e) {
			if (!this.hasAttribute('data-tooltip-init') && bootstrap) {
				panelTooltip = new bootstrap.Tooltip(this, { title: app.panel.toggle.collapse.tooltipText, placement: 'bottom' });
				panelTooltip.show();
				this.setAttribute('data-tooltip-init', true);
			}
		}
		elm.onclick = function(e) {
			e.preventDefault();
			panelTooltip.hide();
			slideToggle(this.closest('.'+ app.panel.class).querySelector('.' + app.panel.bodyClass));
		}
	});
	
	// 7.3 Panel Reload
	var elms = [].slice.call(document.querySelectorAll('['+ app.panel.toggle.reload.attr + ']'));
	elms.map(function(elm) {
		elm.onmouseover = function(e) {
			if (!this.hasAttribute('data-tooltip-init') && bootstrap) {
				panelTooltip = new bootstrap.Tooltip(this, { title: app.panel.toggle.reload.tooltipText, placement: 'bottom' });
				panelTooltip.show();
				this.setAttribute('data-tooltip-init', true);
			}
		}
		elm.onclick = function(e) {
			e.preventDefault();
			if (panelTooltip) {
				panelTooltip.hide();
			}
			var target = this.closest('.'+ app.panel.class);
			if (!target.classList.contains(app.panel.loadingClass)) {
				var targetBody = target.querySelector('.'+ app.panel.bodyClass);
				var spinnerHtml = document.createElement('div');
				spinnerHtml.classList.add(app.panel.loader.class);
				spinnerHtml.innerHTML = app.panel.loader.html;
				target.classList.add(app.panel.loadingClass);
				targetBody.appendChild(spinnerHtml);
				
				setTimeout(() => {
					target.classList.remove(app.panel.loadingClass);
					target.querySelector('.'+ app.panel.loader.class).remove();
				}, 2000);
			}
		}
	});
	
	// 7.4 Panel Expand
	var elms = [].slice.call(document.querySelectorAll('['+ app.panel.toggle.expand.attr + ']'));
	elms.map(function(elm) {
		elm.onmouseover = function() {
			if (!this.hasAttribute('data-tooltip-init') && bootstrap) {
				panelTooltip = new bootstrap.Tooltip(this, { title: app.panel.toggle.expand.tooltipText, placement: 'bottom' });
				panelTooltip.show();
				this.setAttribute('data-tooltip-init', true);
			}
		}
		elm.onclick = function(e) {
			e.preventDefault();
			if (panelTooltip) {
				panelTooltip.hide();
			}
			var target = this.closest('.'+ app.panel.class);
			var targetBody = target.querySelector('.'+ app.panel.bodyClass);
			var targetTop = 40;
			if (targetBody) {
				var targetOffsetTop = target.offsetTop;
				var targetBodyOffsetTop = targetBody.offsetTop;
				targetTop = targetBodyOffsetTop - targetOffsetTop;
			}

			if (document.body.classList.contains(app.panel.expandClass) && target.classList.contains(app.panel.expandClass)) {
				document.body.classList.remove(app.panel.expandClass);
				target.classList.remove(app.panel.expandClass);
				target.removeAttribute('style');
				targetBody.removeAttribute('style');
			} else {
				document.body.classList.add(app.panel.expandClass);
				this.closest('.'+ app.panel.class).classList.add(app.panel.expandClass);
			}
		}
	});
};


/* 8. Handle Panel Draggable - jQuery
------------------------------------------------ */
var handlePanelDraggable = function() {
	"use strict";
	if (jQuery) {
		var target = $('.'+ app.panel.class +':not(['+ app.panel.draggable.disableAttr +'])').parent('[class*=col]');
		var targetHandle = '.'+ app.panel.headClass;
		var connectedTarget = app.panel.draggable.connectedTarget;

		$(target).sortable({
			handle: targetHandle,
			connectWith: connectedTarget,
			stop: function(event, ui) {
				ui.item.find('.'+ app.panel.titleClass).append(app.panel.draggable.spinnerHtml);
				handleSavePanelPosition(ui.item);
			}
		});
	}
};


/* 9. Handle Tooltip Popover Activation
------------------------------------------------ */
var handelTooltipPopoverActivation = function() {
	"use strict";
	
	if (document.querySelectorAll('['+ app.bootstrap.tooltip.attr +']').length !== 0) {
		var tooltipTriggerList = [].slice.call(document.querySelectorAll('['+ app.bootstrap.tooltip.attr +']'))
		var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
			return new bootstrap.Tooltip(tooltipTriggerEl)
		})
	}
	if (document.querySelectorAll('['+ app.bootstrap.popover.attr +']').length !== 0) {
		var popoverTriggerList = [].slice.call(document.querySelectorAll('['+ app.bootstrap.popover.attr +']'))
		var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
			return new bootstrap.Popover(popoverTriggerEl)
		})
	}
};


/* 10. Handle Scroll to Top Button
------------------------------------------------ */
var handleScrollToTopButton = function() {
	"use strict";
	
	document.body.onscroll = function() {
		var totalScroll = this.scrollY;
		var target = document.querySelector('['+ app.scrollToTopBtn.toggleAttr +']');
		if (target) {
			if (totalScroll >= app.scrollToTopBtn.heightShow) {
				if (!target.classList.contains(app.scrollToTopBtn.showClass)) {
					target.classList.add(app.scrollToTopBtn.showClass);
				}
			} else {
				target.classList.remove(app.scrollToTopBtn.showClass);
			}
		}
	}
	
	var elms = [].slice.call(document.querySelectorAll('['+ app.scrollToTopBtn.toggleAttr +']'));
	elms.map(function(elm) {
		elm.onclick = function(e) {
			e.preventDefault();
			window.scrollTo(0, 0);
		}
	});
};


/* 11. Handle Theme Panel
------------------------------------------------ */
var handleThemePanel = function() {
	"use strict";
	
	// 11.1 Theme Panel - Toggle / Dismiss
	var elm = document.querySelector('['+ app.themePanel.toggleAttr +']');
	if (elm) {
		elm.onclick = function(e) {
			e.preventDefault();
			var target = document.querySelector('.'+ app.themePanel.class);
			var targetExpand = (target.classList.contains(app.themePanel.activeClass)) ? false : true;
			
			target.classList.toggle(app.themePanel.activeClass);
			setCookie(app.themePanel.cookieName, targetExpand);
		}
	}
	
	// 11.2 Theme Panel - Theme Selector
	var elms = [].slice.call(document.querySelectorAll('.'+ app.themePanel.class +' ['+ app.themePanel.theme.toggleAttr +']'));
	if (elms) {
		elms.map(function(elm) {
			elm.onclick = function() {
				var targetThemeClass = this.getAttribute(app.themePanel.theme.classAttr);
				for (var x = 0; x < document.body.classList.length; x++) {
					var targetClass = document.body.classList[x];
					if (targetClass.search('theme-') > -1) {
						document.body.classList.remove(targetClass);
					}
				}
				if (targetThemeClass) {
					document.body.classList.add(targetThemeClass);
				}
			
				var togglers = [].slice.call(document.querySelectorAll('.'+ app.themePanel.class +' ['+ app.themePanel.theme.toggleAttr +']'));
				togglers.map(function(toggler) {
					if (toggler != elm) {
						toggler.closest('.'+ app.themePanel.themeListItemCLass).classList.remove(app.themePanel.theme.activeClass);
					} else {
						toggler.closest('.'+ app.themePanel.themeListItemCLass).classList.add(app.themePanel.theme.activeClass);
					}
				});
				setCookie(app.themePanel.theme.cookieName, targetThemeClass);
			}
		});
	}
	
	// 11.3 Theme Panel - Header Theme
	var elm = document.querySelector('.'+ app.themePanel.class +' ['+ app.themePanel.themeHeader.toggleAttr +']');
	if (elm) {
		elm.onchange = function() {
			if (this.checked) {
				document.querySelector('.'+ app.header.class).setAttribute(app.darkMode.attr, app.darkMode.value);
			} else {
				document.querySelector('.'+ app.header.class).removeAttribute(app.darkMode.attr);
			}
			setCookie(app.themePanel.themeHeader.cookieName, (this.checked) ? true : false);
		}
	}
	
	// 11.4 Theme Panel - Header Fixed
	var elm = document.querySelector('.'+ app.themePanel.class +' ['+ app.themePanel.themeHeaderFixed.toggleAttr +']');
	if (elm) {
		elm.onchange = function() {
			if (this.checked) {
				document.querySelector('.'+ app.class).classList.add(app.themePanel.themeHeaderFixed.class);
			} else {
				if (document.querySelector('['+ app.themePanel.themeSidebarFixed.toggleAttr +']').checked && !app.isMobile) {
					alert(app.themePanel.themeHeaderFixed.errorMessage);
					
					document.querySelector('['+ app.themePanel.themeSidebarFixed.toggleAttr +']').checked = false;
					document.querySelector('['+ app.themePanel.themeSidebarFixed.toggleAttr +']').onchange();
				}
				document.querySelector('.'+ app.class).classList.remove(app.themePanel.themeHeaderFixed.class);
			}
			setCookie(app.themePanel.themeHeaderFixed.cookieName, (this.checked) ? true : false);
		}
	};
	
	// 11.5 Theme Panel - Sidebar Grid
	var elm = document.querySelector('.'+ app.themePanel.class +' ['+ app.themePanel.themeSidebarGrid.toggleAttr +']');
	if (elm) {
		elm.onchange = function() {
			if (this.checked) {
				document.querySelector('.'+ app.sidebar.class).classList.add(app.themePanel.themeSidebarGrid.class);
			} else {
				document.querySelector('.'+ app.sidebar.class).classList.remove(app.themePanel.themeSidebarGrid.class);
			}
			setCookie(app.themePanel.themeSidebarGrid.cookieName, (this.checked) ? app.themePanel.themeSidebarGrid.class : '');
		}
	}
	
	// 11.6 Theme Panel - Sidebar Fixed
	var elm = document.querySelector('.'+ app.themePanel.class +' ['+ app.themePanel.themeSidebarFixed.toggleAttr +']');
	if (elm) {
		elm.onchange = function() {
			var targetSidebar = '.'+ app.sidebar.class +':not(.'+ app.sidebarEnd.class +') ['+ app.scrollBar.attr +']';
		
			if (!app.isMobile) {
				if (this.checked) {
					if (!document.querySelector('.'+ app.themePanel.class +' ['+ app.themePanel.themeHeaderFixed.toggleAttr +']').checked) {
						alert(app.themePanel.themeSidebarFixed.errorMessage);
						document.querySelector('['+ app.themePanel.themeHeaderFixed.toggleAttr +']').checked = true;
						document.querySelector('['+ app.themePanel.themeHeaderFixed.toggleAttr +']').onchange();
						document.querySelector('.'+ app.class).classList.add(app.themePanel.themeHeaderFixed.class);
					}
					document.querySelector('.'+ app.class).classList.add(app.themePanel.themeSidebarFixed.class);
					document.querySelector(targetSidebar).scrollbarInit = '';
					generateScrollbar(document.querySelector(targetSidebar));
				} else {
					document.querySelector('.'+ app.class).classList.remove(app.themePanel.themeSidebarFixed.class);
					app.sidebar.scrollBar.dom.destroy();
					app.sidebar.scrollBar.dom = '';
					document.querySelector(targetSidebar).removeAttribute(app.scrollBar.initAttr);
				}
				setCookie(app.themePanel.themeSidebarFixed.cookieName, (this.checked) ? true : false);
			} else {
				this.checked = true;
				alert(app.themePanel.themeSidebarFixed.mobileErrorMessage);
			}
		}
	}
	
	// 11.7 Theme Panel - Gradient Enabled
	var elm = document.querySelector('.'+ app.themePanel.class +' ['+ app.themePanel.themeGradientEnabled.toggleAttr +']');
	if (elm) {
		elm.onchange = function() {
			if (this.checked) {
				document.querySelector('.'+ app.class).classList.add(app.themePanel.themeGradientEnabled.class);
			} else {
				document.querySelector('.'+ app.class).classList.remove(app.themePanel.themeGradientEnabled.class);
			}
			setCookie(app.themePanel.themeGradientEnabled.cookieName, (this.checked) ? app.themePanel.themeGradientEnabled.class : '');
		}
	}
	
	// 11.8 Theme Panel - RTL Mode Enabled
	var elm = document.querySelector('.'+ app.themePanel.class +' ['+ app.themePanel.themeRtlMode.toggleAttr +']');
	if (elm) {
		elm.onchange = function() {
			if (this.checked) {
				document.querySelector('html').setAttribute(app.rtlMode.attr, app.rtlMode.value);
			} else {
				document.querySelector('html').removeAttribute(app.rtlMode.attr);
			}
			setCookie(app.themePanel.themeRtlMode.cookieName, (this.checked) ? true : false);
		}
	}
	
	// 11.9 Theme Panel - Dark Mode
	var elms = [].slice.call(document.querySelectorAll('.'+ app.themePanel.class +' ['+ app.themePanel.themeDarkMode.toggleAttr +']'));
	elms.map(function(elm) {
		elm.onchange = function() {
			if (this.checked) {
				document.querySelector('html').setAttribute(app.darkMode.attr, app.darkMode.value);
			} else {
				document.querySelector('html').removeAttribute(app.darkMode.attr);
			}
			App.initVariable();
			setCookie(app.themePanel.themeDarkMode.cookieName, (this.checked) ? app.themePanel.themeDarkMode.class : '');
			document.dispatchEvent(new CustomEvent(app.darkMode.eventName));
		}
	});
	
	// 11.10 Theme Panel - Page Load Settings Cookies 
	if (getCookie(app.themePanel.cookieName) && getCookie(app.themePanel.cookieName) == 'true') {
		var elm = document.querySelector('.'+ app.themePanel.class +' ['+ app.themePanel.toggleAttr +']');
		if (elm) {
			elm.click();
		}
	}
	if (getCookie(app.themePanel.theme.cookieName)) {
		var elm = document.querySelector('.'+ app.themePanel.class +' ['+ app.themePanel.theme.toggleAttr +']['+ app.themePanel.theme.classAttr +'="'+ getCookie(app.themePanel.theme.cookieName) +'"]');
		if (elm) {
			elm.click();
		}
	}
	if (getCookie(app.themePanel.themeDarkMode.cookieName)) {
		var elm = document.querySelector('.'+ app.themePanel.class +' ['+ app.themePanel.themeDarkMode.toggleAttr +']');
		if (elm) {
			elm.checked = true;
			elm.onchange();
		}
	}
	if (getCookie(app.themePanel.themeGradientEnabled.cookieName)) {
		var elm = document.querySelector('.'+ app.themePanel.class +' ['+ app.themePanel.themeGradientEnabled.toggleAttr +']');
		if (elm) {
			elm.checked = true;
			elm.onchange();
		}
	}
	if (getCookie(app.themePanel.themeSidebarGrid.cookieName)) {
		var elm = document.querySelector('.'+ app.themePanel.class +' ['+ app.themePanel.themeSidebarGrid.toggleAttr +']');
		if (elm) {
			elm.checked = true;
			elm.onchange();
		}
	}
	if (getCookie(app.themePanel.themeSidebarFixed.cookieName) == 'false') {
		var elm = document.querySelector('.'+ app.themePanel.class +' ['+ app.themePanel.themeSidebarFixed.toggleAttr +']');
		if (elm) {
			elm.checked = false;
			elm.onchange();
		}
	}
	if (getCookie(app.themePanel.themeHeaderFixed.cookieName) == 'false') {
		var elm = document.querySelector('.'+ app.themePanel.class +' ['+ app.themePanel.themeHeaderFixed.toggleAttr +']');
		if (elm) {
			elm.checked = false;
			elm.onchange();
		}
	}
	if (getCookie(app.themePanel.themeHeader.cookieName) == 'true') {
		var elm = document.querySelector('.'+ app.themePanel.class +' ['+ app.themePanel.themeHeader.toggleAttr +']');
		if (elm) {
			elm.checked = true;
			elm.onchange();
		}
	}
	if (getCookie(app.themePanel.themeRtlMode.cookieName) == 'true') {
		var elm = document.querySelector('.'+ app.themePanel.class +' ['+ app.themePanel.themeRtlMode.toggleAttr +']');
		if (elm) {
			elm.checked = true;
			elm.onchange();
		}
	}
};


/* 12. Handle Save Panel Position Function - jQuery
------------------------------------------------ */
var handleSavePanelPosition = function(element) {
	"use strict";
	if (jQuery && $('.' + app.panel.sortable.class).length !== 0) {
		var newValue = [];
		var index = 0;
		$.when($('.' + app.panel.sortable.class).each(function() {
			var panelSortableElement = $(this).find('['+ app.panel.sortable.attr +']');
			if (panelSortableElement.length !== 0) {
				var columnValue = [];
				$(panelSortableElement).each(function() {
					var targetSortId = $(this).attr(app.panel.sortable.attr);
					columnValue.push({id: targetSortId});
				});
				newValue.push(columnValue);
			} else {
				newValue.push([]);
			}
			index++;
		})).done(function() {
			var targetPage = window.location.href;
			    targetPage = targetPage.split('?');
			    targetPage = targetPage[0];
			localStorage.setItem(targetPage, JSON.stringify(newValue));
			$(element).find('['+ app.panel.sortable.spinnerAttr +']').delay(500).fadeOut(500, function() {
				$(this).remove();
			});
		});
	}
};


/* 13. Handle Draggable Panel Local Storage Function - jQuery
------------------------------------------------ */
var handleLocalStorage = function() {
	"use strict";
	try {
		if (typeof(Storage) !== 'undefined' && typeof(localStorage) !== 'undefined' && jQuery) {
			var targetPage = window.location.href;
					targetPage = targetPage.split('?');
					targetPage = targetPage[0];
			var panelPositionData = localStorage.getItem(targetPage);

			if (panelPositionData) {
				panelPositionData = JSON.parse(panelPositionData);
				var i = 0;
				$.when($('.'+ app.panel.class +':not(['+ app.panel.sortable.disableAttr +'])').parent('['+ app.panel.sortable.parentAttr +']').each(function() {
					var storageData = panelPositionData[i]; 
					var targetColumn = $(this);
					if (storageData) {
						$.each(storageData, function(index, data) {
							var targetId = $('['+ app.panel.sortable.attr +'="'+ data.id +'"]').not('[data-init="true"]');
							if ($(targetId).length !== 0) {
								var targetHtml = $(targetId).clone();
								$(targetId).remove();
								$(targetColumn).append(targetHtml);
								$('['+ app.panel.sortable.attr +'="'+ data.id +'"]').attr('data-init','true');
							}
						});
					}
					i++;
				})).done(function() {
					window.dispatchEvent(new CustomEvent(app.panel.localStorage.loadedEvent));
				});
			}
		} else {
			alert(app.panel.localStorage.notSupportMessage); 
		}
	} catch (error) {
		console.log(error);
	}
};


/* 14. Handle Reset Local Storage
------------------------------------------------ */
var handleResetLocalStorage = function() {
	"use strict";
	
	var elm = document.querySelector('['+ app.panel.localStorage.reset.attr +']');
	if (elm) {
		elm.onclick = function(e) {
			e.preventDefault();
			
			var targetModalHtml = document.createElement('div');
			targetModalHtml.classList.add('modal');
			targetModalHtml.classList.add('fade');
			targetModalHtml.setAttribute('data-modal-id', app.panel.localStorage.reset.modal.id);
			targetModalHtml.innerHTML = ''+
			'    <div class="modal-dialog">'+
			'        <div class="modal-content">'+
			'            <div class="modal-header">'+
			'                <h4 class="modal-title"><i class="fa fa-redo me-1"></i> '+ app.panel.localStorage.reset.modal.title +'</h4>'+
			'                <button type="button" class="btn-close" '+ app.bootstrap.modal.dismissAttr +'></button>'+
			'            </div>'+
			'            <div class="modal-body">'+
			'                <div class="alert alert-'+ app.panel.localStorage.reset.modal.alert +' mb-0">'+ app.panel.localStorage.reset.modal.message +'</div>'+
			'            </div>'+
			'            <div class="modal-footer">'+
			'                <a href="javascript:;" class="btn btn-sm btn-default" '+ app.bootstrap.modal.dismissAttr +'><i class="fa fa-times me-1"></i> No</a>'+
			'                <a href="javascript:;" class="btn btn-sm btn-inverse" '+ app.panel.localStorage.reset.modal.confirmResetAttr +'><i class="fa fa-check me-1"></i> Yes</a>'+
			'            </div>'+
			'        </div>'+
			'    </div>';
			document.body.appendChild(targetModalHtml);
			
			var modalElm = document.querySelector('[data-modal-id="'+ app.panel.localStorage.reset.modal.id +'"]');
			var modal = new bootstrap.Modal(modalElm);
			modal.show();
			modalElm.addEventListener(app.bootstrap.modal.event.hidden, function() {
				modalElm.remove();
			});
			
			var elm = document.querySelector('['+ app.panel.localStorage.reset.modal.confirmResetAttr +']');
			if (elm) {
				elm.onclick = function(e) {
					e.preventDefault();
					var localStorageName = window.location.href;
					localStorageName = localStorageName.split('?');
					localStorageName = localStorageName[0];
					localStorage.removeItem(localStorageName);
					location.reload();
				}
			}
		}
	}
};


/* 15. Handle Unlimited Nav Tabs
------------------------------------------------ */
var handleUnlimitedTabsRender = function() {
    
	// function handle tab overflow scroll width 
	function handleTabOverflowScrollWidth(obj, animationSpeed) {
		var targetElm = '.'+ app.bootstrap.nav.tabs.itemClass + ' .'+ app.bootstrap.nav.tabs.activeClass;

		if (obj.querySelector('.'+ app.bootstrap.nav.tabs.itemClass)) {
			targetElm = obj.querySelector('.'+ app.bootstrap.nav.tabs.itemClass + ' .'+ app.bootstrap.nav.tabs.activeClass).closest('.'+ app.bootstrap.nav.tabs.itemClass);
		}
		var bodyStyle = window.getComputedStyle(document.querySelector('body'));
		var targetCss = 'margin-inline-start';
		var objStyle = window.getComputedStyle(obj);
		var marginLeft = parseInt(objStyle.getPropertyValue(targetCss));  
		var viewWidth = obj.clientWidth;
		var prevWidth = (typeof targetElm == 'object') ? targetElm.clientWidth : obj.querySelector(targetElm).clientWidth;
		var speed = (animationSpeed > -1) ? animationSpeed : app.animation.speed;
		var fullWidth = 0;
		
		var elms = [].slice.call(obj.querySelectorAll('.'+ app.bootstrap.nav.tabs.itemClass));
		var found = false;
		if (elms) {
			elms.map(function(elm) {
				fullWidth += elm.clientWidth;
				if (!found) {
					prevWidth += elm.clientWidth;
				}
				var elmLink = elm.querySelector('.nav-link');
				if (elmLink.classList.contains('active')) {
					found = true;
				}
			});
		}

		if (prevWidth >= viewWidth) {
			var finalScrollWidth = prevWidth - viewWidth;
			if (fullWidth != prevWidth) {
				finalScrollWidth += 40;
			}
			var targetAnimate = obj.querySelector('.'+ app.bootstrap.nav.tabs.class);
			targetAnimate.style.transitionProperty = 'height, margin, padding';
			targetAnimate.style.transitionDuration = speed + 'ms';
			targetAnimate.style.marginInlineStart = '-' + finalScrollWidth + 'px';
			
			setTimeout(function() {
				targetAnimate.style.transitionProperty = '';
				targetAnimate.style.transitionDuration = '';
			}, speed);
		}

		if (prevWidth != fullWidth && fullWidth >= viewWidth) {
			obj.classList.add(app.unlimitedTabs.overflowRight.class);
		} else {
			obj.classList.remove(app.unlimitedTabs.overflowRight.class);
		}

		if (prevWidth >= viewWidth && fullWidth >= viewWidth) {
			obj.classList.add(app.unlimitedTabs.overflowLeft.class);
		} else {
			obj.classList.remove(app.unlimitedTabs.overflowLeft.class);
		}
	}
  
	// function handle tab button action - next / prev
	function handleTabButtonAction(element, direction) {
		var obj = element.closest('.' + app.unlimitedTabs.class);
		var bodyStyle = window.getComputedStyle(document.body);
		var targetTabStyle = window.getComputedStyle(obj.querySelector('.'+ app.bootstrap.nav.tabs.class));
		var targetCss = 'margin-inline-start';
		var marginLeft = parseInt(targetTabStyle.getPropertyValue(targetCss));
		var containerWidth = obj.clientWidth;
		var totalWidth = 0;
		var finalScrollWidth = 0;
		var btnWidth = 42.5;
		
		var lists = [].slice.call(obj.querySelectorAll('li'));
		if (lists) {
			lists.map(function(list) {
				if (!list.classList.contains(app.unlimitedTabs.buttonNext.class) && !list.classList.contains(app.unlimitedTabs.buttonPrev.class)) {
					totalWidth += list.clientWidth;
				}
			});
		}

		switch (direction) {
			case 'next':
				var totalWidth = totalWidth - (btnWidth * 2);
				var containerWidth = containerWidth - (btnWidth * 2);
				var prevTotalWidth = (marginLeft * -1) + containerWidth;
				var nextTotalWidth = prevTotalWidth + containerWidth;
				var finalScrollLeft = 0;
				var hideButtonRight = false;
				
				if (nextTotalWidth >= totalWidth) {
					finalScrollLeft = totalWidth - containerWidth;
					hideButtonRight = true;
				} else if (nextTotalWidth < totalWidth) {
					finalScrollLeft = nextTotalWidth - containerWidth;
				}
				
				var targetAnimate = obj.querySelector('.'+ app.bootstrap.nav.tabs.class);
				targetAnimate.style.transitionProperty = 'height, margin, padding';
				targetAnimate.style.transitionDuration = app.animation.speed + 'ms';
				targetAnimate.style.marginInlineStart = '-'+ finalScrollLeft + 'px';
				if (hideButtonRight) {
					obj.classList.remove(app.unlimitedTabs.overflowRight.class);
				}
				obj.classList.add(app.unlimitedTabs.overflowLeft.class);
				
				setTimeout(function() {
					targetAnimate.style.transitionProperty = '';
					targetAnimate.style.transitionDuration = '';
				}, app.animation.speed);
			break;
		case 'prev':
				var totalWidth = totalWidth - (btnWidth * 2);
				var containerWidth = containerWidth - (btnWidth * 2);
				var prevTotalWidth = (marginLeft * -1);
				var finalScrollLeft = prevTotalWidth - containerWidth;
				var hideButtonLeft = false;
				
				if (finalScrollLeft <= 0) {
					finalScrollLeft = 0;
				}
				if (finalScrollLeft <= 0) {
					hideButtonLeft = true;
				}
				var targetAnimate = obj.querySelector('.'+ app.bootstrap.nav.tabs.class);
				targetAnimate.style.transitionProperty = 'height, margin, padding';
				targetAnimate.style.transitionDuration = app.animation.speed + 'ms';
				targetAnimate.style.marginInlineStart = '-'+ finalScrollLeft + 'px';
				obj.classList.add(app.unlimitedTabs.overflowRight.class);
				if (hideButtonLeft) {
					obj.classList.remove(app.unlimitedTabs.overflowLeft.class);
				}
				
				setTimeout(function() {
					targetAnimate.style.transitionProperty = '';
					targetAnimate.style.transitionDuration = '';
				}, app.animation.speed);
			break;
		}
	}

	// handle page load active tab focus
	function handlePageLoadTabFocus() {
		var elms = [].slice.call(document.querySelectorAll('.' + app.unlimitedTabs.class));
		if (elms) {
			elms.map(function(elm) {
				handleTabOverflowScrollWidth(elm, 0);
			});
		}
	}

	// handle tab next button click action
	var elms = [].slice.call(document.querySelectorAll('['+ app.unlimitedTabs.buttonNext.toggleAttr + ']'));
	if (elms) {
		elms.map(function(elm) {
			elm.onclick = function(e) {
				e.preventDefault();
				handleTabButtonAction(this,'next');
			}
		});
	}

	// handle tab prev button click action
	var elms = [].slice.call(document.querySelectorAll('['+ app.unlimitedTabs.buttonPrev.toggleAttr + ']'));
	if (elms) {
		elms.map(function(elm) {
			elm.onclick = function(e) {
				e.preventDefault();
				handleTabButtonAction(this,'prev');
			}
		});
	}

	// handle unlimited tabs responsive setting
	window.addEventListener('resize', function() {
		var elm = document.querySelector('.'+ app.unlimitedTabs.class +' .'+ app.bootstrap.nav.tabs.class);
		if (elm) {
			elm.removeAttribute('style');
			handlePageLoadTabFocus();
		}
	});

	handlePageLoadTabFocus();
};


/* 16. Handle Top Menu - Unlimited Top Menu Render
------------------------------------------------ */
var handleUnlimitedTopMenuRender = function() {
	"use strict";
	
	// function handle menu button action - next / prev
	function handleMenuButtonAction(element, direction) {
		var obj = element.closest('.' + app.topMenu.menu.class);
		var objStyle = window.getComputedStyle(obj);
		var bodyStyle = window.getComputedStyle(document.querySelector('body'));
		var targetCss = 'margin-inline-start';
		var marginLeft = parseInt(objStyle.getPropertyValue(targetCss));  
		var containerWidth = document.querySelector('.'+ app.topMenu.class).clientWidth - document.querySelector('.'+ app.topMenu.class).clientHeight * 2;
		var totalWidth = 0;
		var finalScrollWidth = 0;
		var controlPrevObj = obj.querySelector('.menu-control-start');
		var controlPrevWidth = (controlPrevObj) ? controlPrevObj.clientWidth : 0;
		var controlNextObj = obj.querySelector('.menu-control-end');
		var controlNextWidth = (controlPrevObj) ? controlNextObj.clientWidth : 0;
		var controlWidth = controlPrevWidth + controlNextWidth;
		
		var elms = [].slice.call(obj.querySelectorAll('.' + app.topMenu.menu.itemClass));
		if (elms) {
			elms.map(function(elm) {
				if (!elm.classList.contains(app.topMenu.control.class)) {
					totalWidth += elm.clientWidth;
				}
			});
		}

		switch (direction) {
			case 'next':
				var widthLeft = totalWidth + marginLeft - containerWidth;
				if (widthLeft <= containerWidth) {
					finalScrollWidth = widthLeft - marginLeft - controlWidth;
					setTimeout(function() {
						obj.querySelector('.'+ app.topMenu.control.class +'.'+ app.topMenu.control.buttonNext.class).classList.remove('show');
					}, app.animation.speed);
				} else {
					finalScrollWidth = containerWidth - marginLeft - controlWidth;
				}

				if (finalScrollWidth !== 0) {
					obj.style.transitionProperty = 'height, margin, padding';
					obj.style.transitionDuration = app.animation.speed + 'ms';
					if (bodyStyle.getPropertyValue('direction') != 'rtl') {
						obj.style.marginLeft = '-' + finalScrollWidth + 'px';
					} else {
						obj.style.marginRight = '-' + finalScrollWidth + 'px';
					}
					setTimeout(function() {
						obj.style.transitionProperty = '';
						obj.style.transitionDuration = '';
						obj.querySelector('.'+ app.topMenu.control.class +'.'+ app.topMenu.control.buttonPrev.class).classList.add('show');
					}, app.animation.speed);
				}
				break;
			case 'prev':
				var widthLeft = -marginLeft;

				if (widthLeft <= containerWidth) {
					obj.querySelector('.'+ app.topMenu.control.class +'.'+ app.topMenu.control.buttonPrev.class).classList.remove('show');
					finalScrollWidth = 0;
				} else {
					finalScrollWidth = widthLeft - containerWidth + controlWidth;
				}
				
				obj.style.transitionProperty = 'height, margin, padding';
				obj.style.transitionDuration = app.animation.speed + 'ms';
				obj.style.marginInlineStart = '-' + finalScrollWidth + 'px';
				
				setTimeout(function() {
					obj.style.transitionProperty = '';
					obj.style.transitionDuration = '';
					obj.querySelector('.'+ app.topMenu.control.class +'.'+ app.topMenu.control.buttonNext.class).classList.add('show');
				}, app.animation.speed);
				break;
		}
	}

	// handle page load active menu focus
	function handlePageLoadMenuFocus() {
		var targetMenu = document.querySelector('.'+ app.topMenu.class +' .'+ app.topMenu.menu.class);
		if (!targetMenu) {
			return;
		}
		var targetMenuStyle = window.getComputedStyle(targetMenu);
		var bodyStyle = window.getComputedStyle(document.body);
		var targetCss = 'margin-inline-start';
		var marginLeft = parseInt(targetMenuStyle.getPropertyValue(targetCss));
		var viewWidth = document.querySelector('.'+ app.topMenu.class +'').clientWidth;
		var prevWidth = 0;
		var speed = 0;
		var fullWidth = 0;
		var controlPrevObj = targetMenu.querySelector('.menu-control-start');
		var controlPrevWidth = (controlPrevObj) ? controlPrevObj.clientWidth : 0;
		var controlNextObj = targetMenu.querySelector('.menu-control-end');
		var controlNextWidth = (controlPrevObj) ? controlNextObj.clientWidth : 0;
		var controlWidth = 0;

		var elms = [].slice.call(document.querySelectorAll('.'+ app.topMenu.class +' .'+ app.topMenu.menu.class + ' > .'+ app.topMenu.menu.itemClass +''));
		if (elms) {
			var found = false;
			elms.map(function(elm) {
				if (!elm.classList.contains('menu-control')) {
					fullWidth += elm.clientWidth;
					if (!found) {
						prevWidth += elm.clientWidth;
					}
					if (elm.classList.contains('active')) {
						found = true;
					}
				}
			});
		}
		
		var elm = targetMenu.querySelector('.'+ app.topMenu.control.class +'.'+ app.topMenu.control.buttonNext.class);
		if (prevWidth != fullWidth && fullWidth >= viewWidth) {
			elm.classList.add(app.topMenu.control.showClass);
			controlWidth += controlNextWidth;
		} else {
			elm.classList.remove(app.topMenu.control.showClass);
		}

		var elm = targetMenu.querySelector('.'+ app.topMenu.control.class +'.'+ app.topMenu.control.buttonPrev.class);
		if (prevWidth >= viewWidth && fullWidth >= viewWidth) {
			elm.classList.add(app.topMenu.control.showClass);
		} else {
			elm.classList.remove(app.topMenu.control.showClass);
		}
		
		if (prevWidth >= viewWidth) {
			var finalScrollWidth = prevWidth - viewWidth + controlWidth;
			targetMenu.style.marginInlineStart = '-' + finalScrollWidth + 'px';
		}
	}

	// handle menu next button click action
	var elm = document.querySelector('['+ app.topMenu.control.buttonNext.toggleAttr +']');
	if (elm) {
		elm.onclick = function(e) {
			e.preventDefault();
			handleMenuButtonAction(this,'next');
		};
	}
	
	// handle menu prev button click action
	var elm = document.querySelector('['+ app.topMenu.control.buttonPrev.toggleAttr +']');
	if (elm) {
		elm.onclick = function(e) {
			e.preventDefault();
			handleMenuButtonAction(this,'prev');
		};
	}

	function enableFluidContainerDrag(containerClassName) {
		const container = document.querySelector(containerClassName);
		if (!container) {
			return;
		}
		
		const menu = container.querySelector('.menu');
		const menuItem = menu.querySelectorAll('.menu-item:not(.menu-control)');

		let startX, scrollLeft, mouseDown;
		let menuWidth = 0;
		let maxScroll = 0;

		menuItem.forEach((element) => {
			menuWidth += element.offsetWidth;
		});

		container.addEventListener('mousedown', (e) => {
			mouseDown = true;
			startX = e.pageX;
			scrollLeft = (menu.style.marginLeft) ? parseInt(menu.style.marginLeft) : 0;
			maxScroll = container.offsetWidth - menuWidth;
		});

		container.addEventListener('touchstart', (e) => {
			mouseDown = true;
			const touch = e.targetTouches[0];
			startX = touch.pageX;
			scrollLeft = (menu.style.marginLeft) ? parseInt(menu.style.marginLeft) : 0;
			maxScroll = container.offsetWidth - menuWidth;
		});
		
		container.addEventListener('mouseup', () => {
			mouseDown = false;
		});

		container.addEventListener('touchend', () => {
			mouseDown = false;
		});
		
		container.addEventListener('mousemove', (e) => {
			if (!startX || !mouseDown) return;
			if (window.innerWidth < app.breakpoints.md) return;
			e.preventDefault();
			const x = e.pageX;
			const walkX = (x - startX) * 1;
			var totalMarginLeft = scrollLeft + walkX;
			if (totalMarginLeft <= maxScroll) {
				totalMarginLeft = maxScroll;
				menu.querySelector('.'+ app.topMenu.control.class +'.'+ app.topMenu.control.buttonNext.class).classList.remove('show');
			} else {
				menu.querySelector('.'+ app.topMenu.control.class +'.'+ app.topMenu.control.buttonNext.class).classList.add('show');
			}
			if (menuWidth < container.offsetWidth) {
				menu.querySelector('.'+ app.topMenu.control.class +'.'+ app.topMenu.control.buttonPrev.class).classList.remove('show');
			}
			if (maxScroll > 0) {
				menu.querySelector('.'+ app.topMenu.control.class +'.'+ app.topMenu.control.buttonNext.class).classList.remove('show');
			}
			if (totalMarginLeft > 0) {
				totalMarginLeft = 0;
				menu.querySelector('.'+ app.topMenu.control.class +'.'+ app.topMenu.control.buttonPrev.class).classList.remove('show');
			} else {
				menu.querySelector('.'+ app.topMenu.control.class +'.'+ app.topMenu.control.buttonPrev.class).classList.add('show');
			}
			menu.style.marginLeft = totalMarginLeft + 'px';
		});
		
		container.addEventListener('touchmove', (e) => {
			if (!startX || !mouseDown) return;
			if (window.innerWidth < app.breakpoints.md) return;
			e.preventDefault();
			
			const touch = e.targetTouches[0];
			const x = touch.pageX;
			const walkX = (x - startX) * 1;
			var totalMarginLeft = scrollLeft + walkX;
			if (totalMarginLeft <= maxScroll) {
				totalMarginLeft = maxScroll;
				menu.querySelector('.'+ app.topMenu.control.class +'.'+ app.topMenu.control.buttonNext.class).classList.remove('show');
			} else {
				menu.querySelector('.'+ app.topMenu.control.class +'.'+ app.topMenu.control.buttonNext.class).classList.add('show');
			}
			if (menuWidth < container.offsetWidth) {
				menu.querySelector('.'+ app.topMenu.control.class +'.'+ app.topMenu.control.buttonPrev.class).classList.remove('show');
			}
			if (maxScroll > 0) {
				menu.querySelector('.'+ app.topMenu.control.class +'.'+ app.topMenu.control.buttonNext.class).classList.remove('show');
			}
			if (totalMarginLeft > 0) {
				totalMarginLeft = 0;
				menu.querySelector('.'+ app.topMenu.control.class +'.'+ app.topMenu.control.buttonPrev.class).classList.remove('show');
			} else {
				menu.querySelector('.'+ app.topMenu.control.class +'.'+ app.topMenu.control.buttonPrev.class).classList.add('show');
			}
			menu.style.marginLeft = totalMarginLeft + 'px';
		});
	}
	
	window.addEventListener('resize', function() {
		if (window.innerWidth >= app.breakpoints.md) {
			var targetElm = document.querySelector('.'+ app.topMenu.class);
			if (targetElm) {
				targetElm.removeAttribute('style');
			}
			var targetElm2 = document.querySelector('.'+ app.topMenu.class +' .'+ app.topMenu.menu.class);
			if (targetElm2) {
				targetElm2.removeAttribute('style');
			}
			var targetElm3 = document.querySelectorAll('.'+ app.topMenu.class +' .'+ app.topMenu.menu.submenu.class);
			if (targetElm3) {
				targetElm3.forEach((elm3) => {
					elm3.removeAttribute('style');
				});
			}
			handlePageLoadMenuFocus();
			enableFluidContainerDrag('.'+ app.topMenu.class);
		}
	});
	
	if (window.innerWidth >= app.breakpoints.md) {
		handlePageLoadMenuFocus();
		enableFluidContainerDrag('.'+ app.topMenu.class);
	}
};


/* 17. Handle Top Menu - Sub Menu Toggle
------------------------------------------------ */
var handleTopMenuToggle = function(menus, forMobile = false) {
	menus.map(function(menu) {
		menu.onclick = function(e) {
			e.preventDefault();
			
			if (!forMobile || (forMobile && document.body.clientWidth < 768)) {
				var target = this.nextElementSibling;
				menus.map(function(m) {
					var otherTarget = m.nextElementSibling;
					if (otherTarget !== target) {
						slideUp(otherTarget);
						otherTarget.closest('.'+ app.topMenu.menu.itemClass).classList.remove(app.topMenu.menu.expandClass);
						otherTarget.closest('.'+ app.topMenu.menu.itemClass).classList.add(app.topMenu.menu.closedClass);
					}
				});
			
				slideToggle(target);
			}
		}
	});
};
var handleTopMenuSubMenu = function() {
	"use strict";
	
	var menuBaseSelector = '.'+ app.topMenu.class +' .'+ app.topMenu.menu.class +' > .'+ app.topMenu.menu.itemClass +'.'+ app.topMenu.menu.hasSubClass;
	var submenuBaseSelector = ' > .'+ app.topMenu.menu.submenu.class +' > .'+ app.topMenu.menu.itemClass + '.' + app.topMenu.menu.hasSubClass;
	
	// 17.1 Menu - Toggle / Collapse
	var menuLinkSelector =  menuBaseSelector + ' > .'+ app.topMenu.menu.itemLinkClass;
	var menus = [].slice.call(document.querySelectorAll(menuLinkSelector));
	handleTopMenuToggle(menus, true);
	
	// 17.2 Menu - Submenu lvl 1
	var submenuLvl1Selector = menuBaseSelector + submenuBaseSelector;
	var submenusLvl1 = [].slice.call(document.querySelectorAll(submenuLvl1Selector + ' > .' + app.topMenu.menu.itemLinkClass));
	handleTopMenuToggle(submenusLvl1);
	
	// 17.3 submenu lvl 2
	var submenuLvl2Selector = menuBaseSelector + submenuBaseSelector + submenuBaseSelector;
	var submenusLvl2 = [].slice.call(document.querySelectorAll(submenuLvl2Selector + ' > .' + app.topMenu.menu.itemLinkClass));
	handleTopMenuToggle(submenusLvl2);
	
	window.addEventListener('resize', function() {
		var elms = [].slice.call(document.querySelectorAll('.'+ app.topMenu.class + ' .'+ app.topMenu.menu.submenu.class));
		elms.map(function(elm) {
			elm.removeAttribute('style');
		});
	});
};


/* 19. Handle Top Menu - Mobile Top Menu Toggle
------------------------------------------------ */
var handleTopMenuMobileToggle = function() {
	"use strict";
	
	var elm = document.querySelector('['+ app.topMenu.mobile.toggleAttr +']');
	if (elm) {
		elm.onclick = function(e) {
			e.preventDefault();
			slideToggle(document.querySelector('.'+ app.topMenu.class));
		}
	}
	
	window.addEventListener('resize', function() {
		var elm = document.querySelector('.'+ app.topMenu.class);
		if (elm) {
			elm.removeAttribute('style');
		}
	});
};


/* 20. Handle Page Scroll Class
------------------------------------------------ */
var handlePageScrollClass = function() {
	var checkScroll = function() {
		var target = document.querySelector('.' + app.class);
		if (window.scrollY > 0) {
			target.classList.add(app.header.hasScrollClass);
		} else {
			target.classList.remove(app.header.hasScrollClass);
		}
	}
	
	window.addEventListener('scroll', function() {
		checkScroll();
	});
	checkScroll();
};


/* 21. Handle Toggle Navbar Profile
------------------------------------------------ */
var handleToggleNavProfile = function() {
	var elm = document.querySelector('['+ app.sidebar.profile.toggleAttr +']');
	if (elm) {
		elm.onclick = function(e) {
			e.preventDefault();
			
			var targetSidebar = document.querySelector('.'+ app.sidebar.class + ':not(.'+ app.sidebarEnd.class+')');
			var targetMenu = this.closest('.'+ app.sidebar.profile.class);
			var targetProfile = document.querySelector(this.getAttribute(app.sidebar.profile.targetAttr));
			var expandTime = (targetSidebar && targetSidebar.getAttribute(app.sidebar.menu.disableAnimationAttr)) ? 0 : app.sidebar.menu.animationTime;
			
			if (targetProfile) {
				if (targetProfile.style.display == 'block') {
					targetMenu.classList.remove(app.sidebar.menu.activeClass);
				} else {
					targetMenu.classList.add(app.sidebar.menu.activeClass);
				}
				slideToggle(targetProfile, expandTime);
				targetProfile.classList.toggle(app.sidebar.menu.expandClass);
			}
		}
	}
};


/* 22. Handle Sidebar Scroll Memory
------------------------------------------------ */
var handleSidebarScrollMemory = function() {
	if (!app.isMobile) {
		try {
			if (typeof(Storage) !== 'undefined' && typeof(localStorage) !== 'undefined') {
				var elm = document.querySelector('.'+ app.sidebar.class +':not(.'+ app.sidebarEnd.class +') ['+ app.scrollBar.attr +']');
				if (elm) {
					elm.addEventListener('scroll', function(e) {
						localStorage.setItem(app.sidebar.scrollBar.localStorage, e.target.scrollTop);
					});
					var defaultScroll = localStorage.getItem(app.sidebar.scrollBar.localStorage);
					if (defaultScroll) {
						elm.scrollTop = defaultScroll;
					}
				}
			}
		} catch (error) {
			console.log(error);
		}
	}
};


/* 23. Handle Sidebar Minify Sub Menu
------------------------------------------------ */
var handleGetHiddenMenuHeight = function(elm) {
	elm.setAttribute('style', 'position: absolute; visibility: hidden; display: block !important');
	var targetHeight  = elm.clientHeight;
	elm.removeAttribute('style');
	return targetHeight;
}
var handleSidebarMinifyFloatMenuClick = function() {
	var elms = [].slice.call(document.querySelectorAll(app.sidebar.floatSubmenu.id +' .'+ app.sidebar.menu.itemClass +'.'+ app.sidebar.menu.hasSubClass +' > .'+ app.sidebar.menu.itemLinkClass));
	if (elms) {
		elms.map(function(elm) {
			elm.onclick = function(e) {
				e.preventDefault();
				var targetItem = this.closest('.' + app.sidebar.menu.itemClass);
				var target = targetItem.querySelector('.' + app.sidebar.menu.submenu.class);
				var targetStyle = getComputedStyle(target);
				var close = (targetStyle.getPropertyValue('display') != 'none') ? true : false;
				var expand = (targetStyle.getPropertyValue('display') != 'none') ? false : true;
				
				slideToggle(target);
				
				var loopHeight = setInterval(function() {
					var targetMenu = document.querySelector(app.sidebar.floatSubmenu.id);
					var targetMenuArrow = document.querySelector(app.sidebar.floatSubmenu.arrow.id);
					var targetMenuLine = document.querySelector(app.sidebar.floatSubmenu.line.id);
					var targetHeight = targetMenu.clientHeight;
					var targetOffset = targetMenu.getBoundingClientRect();
					var targetOriTop = targetMenu.getAttribute('data-offset-top');
					var targetMenuTop = targetMenu.getAttribute('data-menu-offset-top');
					var targetTop 	 = targetOffset.top;
					var windowHeight = document.body.clientHeight;
					if (close) {
						if (targetTop > targetOriTop) {
							targetTop = (targetTop > targetOriTop) ? targetOriTop : targetTop;
							targetMenu.style.top = targetTop + 'px';
							targetMenu.style.bottom = 'auto';
							targetMenuArrow.style.top = '20px';
							targetMenuArrow.style.bottom = 'auto';
							targetMenuLine.style.top = '20px';
							targetMenuLine.style.bottom = 'auto';
						}
					}
					if (expand) {
						if ((windowHeight - targetTop) < targetHeight) {
							var arrowBottom = (windowHeight - targetMenuTop) - 22;
							targetMenu.style.top = 'auto';
							targetMenu.style.bottom = 0;
							targetMenuArrow.style.top = 'auto';
							targetMenuArrow.style.bottom = arrowBottom + 'px';
							targetMenuLine.style.top = '20px';
							targetMenuLine.style.bottom = arrowBottom + 'px';
						}
						var floatSubmenuElm = document.querySelector(app.sidebar.floatSubmenu.id + ' .'+ app.sidebar.floatSubmenu.class);
						if (targetHeight > windowHeight) {
							if (floatSubmenuElm) {
								var splitClass = (app.sidebar.floatSubmenu.overflow.class).split(' ');
								for (var i = 0; i < splitClass.length; i++) {
									floatSubmenuElm.classList.add(splitClass[i]);
								}
							}
						}
					}
				}, 1);
				setTimeout(function() {
					clearInterval(loopHeight);
				}, app.animation.speed);
			}
		});
	}
	handleAjaxMode.initToggler();
}
var handleSidebarMinifyFloatMenu = function() {
	var elms = [].slice.call(document.querySelectorAll('.' + app.sidebar.class + ' .'+ app.sidebar.menu.class +' > .'+ app.sidebar.menu.itemClass +'.'+ app.sidebar.menu.hasSubClass +' > .'+ app.sidebar.menu.itemLinkClass +''));
	if (elms) {
		elms.map(function(elm) {
			elm.onmouseenter = function() {
				var appElm = document.querySelector('.' + app.class);
				if (appElm && appElm.classList.contains(app.sidebar.minify.toggledClass)) {
					clearTimeout(app.sidebar.floatSubmenu.timeout);

					var targetMenu = this.closest('.'+ app.sidebar.menu.itemClass).querySelector('.' + app.sidebar.menu.submenu.class);
					if (app.sidebar.floatSubmenu.dom == this && document.querySelector(app.sidebar.floatSubmenu.id)) {
						return;
					} else {
						app.sidebar.floatSubmenu.dom = this;
					}
					var targetMenuHtml = targetMenu.innerHTML;
					if (targetMenuHtml) {
						var bodyStyle     = getComputedStyle(document.body);
						var sidebar       = document.querySelector(app.sidebar.id);
						var sidebarOffset = sidebar.getBoundingClientRect();
						var sidebarWidth  = parseInt(sidebar.clientWidth);
						var sidebarX      = (!appElm.classList.contains(app.sidebarEnd.class) && bodyStyle.getPropertyValue('direction') != 'rtl') ? (sidebarOffset.left + sidebarWidth) : (document.body.clientWidth - sidebarOffset.left);
						var targetHeight  = handleGetHiddenMenuHeight(targetMenu);
						var targetOffset  = this.getBoundingClientRect();
						var targetTop     = targetOffset.top;
						var targetLeft    = (!appElm.classList.contains(app.sidebarEnd.class) && bodyStyle.getPropertyValue('direction') != 'rtl') ? sidebarX : 'auto';
						var targetRight   = (!appElm.classList.contains(app.sidebarEnd.class) && bodyStyle.getPropertyValue('direction') != 'rtl') ? 'auto' : sidebarX;
						var darkMode      = (sidebar.getAttribute(app.darkMode.attr) == app.darkMode.value) ? true : false;
						var windowHeight  = document.body.clientHeight;
						
						if (!document.querySelector(app.sidebar.floatSubmenu.id)) {
							var overflowClass = '';
							if (targetHeight > windowHeight) {
								overflowClass = app.sidebar.floatSubmenu.overflow.class;
							}
							var html = document.createElement('div');
							if (darkMode) {
								html.setAttribute(app.darkMode.attr, app.darkMode.value);
							}
							html.setAttribute('id', app.sidebar.floatSubmenu.id.replace('#',''));
							html.setAttribute('class', app.sidebar.floatSubmenu.container.class);
							html.setAttribute('data-offset-top', targetTop);
							html.setAttribute('data-menu-offset-top', targetTop);
							html.innerHTML = ''+
							'	<div class="'+ app.sidebar.floatSubmenu.arrow.class +'" id="'+ app.sidebar.floatSubmenu.arrow.id.replace('#', '') +'"></div>'+
							'	<div class="'+ app.sidebar.floatSubmenu.line.class +'" id="'+ app.sidebar.floatSubmenu.line.id.replace('#', '') +'"></div>'+
							'	<div class="'+ app.sidebar.floatSubmenu.class +' '+ overflowClass +'">'+ targetMenuHtml + '</div>';
							appElm.appendChild(html);
							
							var elm = document.getElementById(app.sidebar.floatSubmenu.id.replace('#',''));
							elm.onmouseover = function() {
								clearTimeout(app.sidebar.floatSubmenu.timeout);
							};
							elm.onmouseout = function() {
								app.sidebar.floatSubmenu.timeout = setTimeout(() => {
									document.querySelector(app.sidebar.floatSubmenu.id).remove();
								}, app.animation.speed);
							};
						} else {
							var floatSubmenu = document.querySelector(app.sidebar.floatSubmenu.id);
							var floatSubmenuElm = document.querySelector(app.sidebar.floatSubmenu.id + ' .'+ app.sidebar.floatSubmenu.class);
							
							if (targetHeight > windowHeight) {
								if (floatSubmenuElm) {
									var splitClass = (app.sidebar.floatSubmenu.overflow.class).split(' ');
									for (var i = 0; i < splitClass.length; i++) {
										floatSubmenuElm.classList.add(splitClass[i]);
									}
								}
							}
							floatSubmenu.setAttribute('data-offset-top', targetTop);
							floatSubmenu.setAttribute('data-menu-offset-top', targetTop);
							floatSubmenuElm.innerHTML = targetMenuHtml;
						}
				
						var targetHeight = document.querySelector(app.sidebar.floatSubmenu.id).clientHeight;
						var floatSubmenuElm = document.querySelector(app.sidebar.floatSubmenu.id);
						var floatSubmenuArrowElm = document.querySelector(app.sidebar.floatSubmenu.arrow.id);
						var floatSubmenuLineElm = document.querySelector(app.sidebar.floatSubmenu.line.id);
						if ((windowHeight - targetTop) > targetHeight) {
							if (floatSubmenuElm) {
								floatSubmenuElm.style.top = targetTop + 'px';
								floatSubmenuElm.style.left = targetLeft + 'px';
								floatSubmenuElm.style.bottom = 'auto';
								floatSubmenuElm.style.right = targetRight + 'px';
							}
							if (floatSubmenuArrowElm) {
								floatSubmenuArrowElm.style.top = '20px';
								floatSubmenuArrowElm.style.bottom = 'auto';
							}
							if (floatSubmenuLineElm) {
								floatSubmenuLineElm.style.top = '20px';
								floatSubmenuLineElm.style.bottom = 'auto';
							}
						} else {
							var arrowBottom = (windowHeight - targetTop) - 21;
							if (floatSubmenuElm) {
								floatSubmenuElm.style.top = 'auto';
								floatSubmenuElm.style.left = targetLeft + 'px';
								floatSubmenuElm.style.bottom = 0;
								floatSubmenuElm.style.right = targetRight + 'px';
							}
							if (floatSubmenuArrowElm) {
								floatSubmenuArrowElm.style.top = 'auto';
								floatSubmenuArrowElm.style.bottom = arrowBottom + 'px';
							}
							if (floatSubmenuLineElm) {
								floatSubmenuLineElm.style.top = '20px';
								floatSubmenuLineElm.style.bottom = arrowBottom + 'px';
							}
						}
						handleSidebarMinifyFloatMenuClick();
					} else {
						document.querySelector(app.sidebar.floatSubmenu.line.id).remove();
						app.sidebar.floatSubmenu.dom = '';
					}
				}
			}
			elm.onmouseleave = function() {
				var elm = document.querySelector('.' + app.class);
				if (elm && elm.classList.contains(app.sidebar.minify.toggledClass)) {
					app.sidebar.floatSubmenu.timeout = setTimeout(() => {
						var elm = document.querySelector(app.sidebar.floatSubmenu.line.id);
						if (elm) {
							elm.remove();
						}
						app.sidebar.floatSubmenu.dom = '';
					}, 250);
				}
			}
		});
	}
};


/* 24. Handle Ajax Mode
------------------------------------------------ */
var handleAjaxMode = function() {
	var setting;
	
	return {
		emptyHtml: '',
		init: function(option) {
			if (option) {
				setting = option;
			}
			this.initDefaultUrl();
			this.initHashChange();
			this.initToggler();
		},
		initDefaultUrl: function() {
			this.emptyHtml = (setting && setting.emptyHtml) ?  setting.emptyHtml : app.ajax.error.html;
			this.defaultUrl = (setting && setting.ajaxDefaultUrl) ? setting.ajaxDefaultUrl : '';
			this.defaultUrl = (window.location.hash) ? window.location.hash : this.defaultUrl;

			if (this.defaultUrl === '') {
				var elm = document.querySelector('.'+ app.content.class);
				if (elm) {
					elm.innerHTML = emptyHtml;
				}
			} else {
				this.renderAjax(this.defaultUrl, '', true);
			}
		},
		initHashChange: function() {
			window.addEventListener('hashchange', function() {
				if (window.location.hash) {
					handleAjaxMode.renderAjax(window.location.hash, '', true);
				} else {
					handleAjaxMode.renderAjax(defaultUrl, '', true);
				}
			});
		},
		initToggler: function() {
			var elms = [].slice.call(document.querySelectorAll('['+ app.ajax.attr +']'));
			if (elms) {
				elms.map(function(elm) {
					elm.onclick = function(e) {
						e.preventDefault();
						handleAjaxMode.renderAjax(this.getAttribute('href'), this);
					};
				});
			}
		},
		emptyElement: function() {
			var elm = document.querySelector(app.ajax.emptyElement);
			if (elm) {
				elm.innerHTML = '';
			}
		},
		clearElement: function() {
			var elmsArray = (app.ajax.clearElement).split(',');
			for (var x = 0; x < elmsArray.length; x++) {
				var elms = [].slice.call(document.querySelectorAll(elmsArray[x]));
				if (elms) {
					elms.map(function(elm) {
						elm.remove();
					});
				}
			}
			var elm = document.getElementById(app.sidebar.floatSubmenu.id);
			if (elm) {
				elm.remove();
			}
			if (jQuery && $.fn.DataTable) {
				try {
					$('.dataTable').DataTable().destroy();
				} catch(err) {
			
				}
			}
			var elm = document.querySelector('.'+ app.class);
			if (elm && elm.classList.contains(app.sidebar.mobile.toggledClass)) {
				elm.classList.remove(app.sidebar.mobile.toggledClass);
			}
		},
		checkSidebarActive: function(url) {
			var elm = document.querySelector(app.sidebar.id +' ['+ app.ajax.attr +'][href="'+ url +'"]');
			if (elm) {
				var targetElms = [].slice.call(document.querySelectorAll(app.sidebar.id + ' .' + app.sidebar.menu.itemClass));
				if (targetElms) {
					targetElms.map(function(targetElm) {
						targetElm.classList.remove(app.sidebar.menu.activeClass);
					});
				}
			
				var targetElm = elm.closest('.' + app.sidebar.menu.itemClass);
				if (targetElm) {
					targetElm.classList.add(app.sidebar.menu.activeClass);
				}
			
				var targetElms = getParents(elm);
				if (targetElms) {
					targetElms.map(function(targetElm) {
						if (targetElm.classList && targetElm.classList.contains(app.sidebar.menu.itemClass)) {
							targetElm.classList.add(app.sidebar.menu.activeClass);
						}
					});
				}
			}
		},
		checkPushState: function(url) {
			var targetUrl = url.replace('#','');
			var targetUserAgent = window.navigator.userAgent;
			var isIE = targetUserAgent.indexOf('MSIE ');
	
			if (isIE && (isIE > 0 && isIE < 9)) {
				window.location.href = targetUrl;
			} else {
				history.pushState('', '', '#' + targetUrl);
			}
		},
		checkClearOption: function() {
			if (app.ajax.clearOption) {
				App.clearPageOption(app.ajax.clearOption);
				app.ajax.clearOption = '';
			}
		},
		checkLoading: function(load) {
			if (!load) {
				if (!document.querySelector(app.ajax.loader.id)) {
					document.body.classList.add(app.ajax.loader.class);
				
					var elm = document.querySelector('.'+ app.content.class);
					if (elm) {
						var targetHtml = document.createElement('div');
						targetHtml.setAttribute('id', (app.ajax.loader.id).replace('#', ''));
						targetHtml.setAttribute('class', 'position-absolute top-0 bottom-0 start-0 end-0 bg-light bg-opacity-75');
						targetHtml.style.zIndex = 9999;
						targetHtml.innerHTML = app.ajax.loader.html;
						elm.classList.add('position-relative');
						elm.appendChild(targetHtml);
					}
				}
			} else {
				var targetElm = document.querySelector(app.ajax.loader.id);
				if (targetElm) {
					targetElm.remove();
				}
				var elm = document.querySelector('.'+ app.content.class);
				if (elm) {
					elm.classList.remove('position-relative');
				}
				document.body.classList.remove(app.ajax.loader.class);
			}
		},
		renderAjax: function(url, elm, disablePushState) {
			if (Pace) {
				Pace.restart();
			}
		
			handleAjaxMode.checkLoading(false);
			handleAjaxMode.clearElement();
			handleAjaxMode.emptyElement();
			handleAjaxMode.checkSidebarActive(url);
			handleAjaxMode.checkClearOption();
			if (!disablePushState) {
				handleAjaxMode.checkPushState(url);
			}
		
			var targetContainer= document.querySelector('.'+ app.content.class);
			if (!targetContainer) {
				return;
			}
			var targetUrl 	   = url.replace('#','');
			var targetType 	   = (setting && setting.ajaxType) ? setting.ajaxType : 'GET';
			var targetDataType = (setting && setting.ajaxDataType) ? setting.ajaxDataType : 'html';
			if (elm) {
				targetDataType = (elm.getAttribute('data-type')) ? elm.getAttribute('data-type') : targetDataType;
				targetDataDataType = (elm.getAttribute('data-data-type')) ? elm.getAttribute('data-data-type') : targetDataType;
			}
		
			var xmlhttp = new XMLHttpRequest();

			xmlhttp.onreadystatechange = function() {
				if (xmlhttp.readyState == XMLHttpRequest.DONE) {
					if (xmlhttp.status == 200) {
						setInnerHTML(targetContainer, xmlhttp.responseText);
					} else if (xmlhttp.status == 400) {
						console.log('There was an error 400');
						setInnerHTML(targetContainer, emptyHtml);
					} else {
						console.log('something else other than 200 was returned');
					}
					handleAjaxMode.checkLoading(true);
					document.body.scrollTop = 0;
					App.initComponent();
				}
			};

			xmlhttp.open(targetType, targetUrl, true);
			xmlhttp.send();
		}
	}
}();
var handleSetPageOption = function(option) {
	var targetElm = document.querySelector('.' + app.class);
	if (!targetElm) {
		return;
	}
	if (option.appContentFullHeight) {
		targetElm.classList.add(app.content.fullHeight.class);
	}
	if (option.appSidebarLight) {
		var targetSidebar = document.querySelector('.'+ app.class + ' .' + app.sidebar.class + ':not(.'+ app.sidebarEnd.class +')');
		if (!targetSidebar) {
			return;
		}
		targetSidebar.removeAttribute(app.darkMode.attr);
	}
	if (option.appSidebarEnd) {
		targetElm.classList.add(app.layout.sidebarEnd.class);
	}
	if (option.appSidebarWide) {
		targetElm.classList.add(app.layout.sidebarWide.class);
	}
	if (option.appSidebarMinified) {
		targetElm.classList.add(app.layout.sidebarMinified.class);
	}
	if (option.appSidebarTwo) {
		targetElm.classList.add(app.layout.sidebarTwo.class);
		targetElm.classList.add(app.sidebarEnd.toggledClass);
		
		var elm = document.querySelector('.' + app.header.class + ' ['+ app.sidebarEnd.mobile.toggleAttr +']');
		if (elm) {
			elm.classList.remove(app.helper.display.none);
		}
		
		var elm = document.querySelector('.' + app.header.class + ' .'+ app.header.brand.class);
		if (elm) {
			elm.classList.remove(app.helper.margin.left[0]);
		}
	}
	if (option.appSidebarTransparent) {
		var elm = document.querySelector('.' + app.sidebar.class);
		if (elm) {
			elm.classList.add(app.sidebar.transparent.class);
		}
	}
	if (option.appSidebarSearch) {
		var elm = document.querySelector('.' + app.sidebar.class + ' .'+ app.sidebar.search.class);
		if (elm) {
			elm.classList.remove(app.sidebar.search.hideClass);
		}
	}
	if (option.appSidebarHover) {
		targetElm.classList.add(app.sidebar.hover.class);
	}
	if (option.appTopMenu) {
		targetElm.classList.add(app.layout.topMenu.class);
		
		var elm = document.querySelector('.' + app.header.class + ' ['+ app.topMenu.mobile.toggleAttr +']');
		if (elm) {
			elm.classList.remove(app.helper.display.none);
		}
	}
	if (option.appWithoutHeader) {
		targetElm.classList.add(app.layout.withoutHeader.class);
		
		var elm = document.querySelector('.' + app.header.class);
		if (elm) {
			elm.style.display = 'none';
		}
	}
	if (option.appWithoutSidebar) {
		targetElm.classList.add(app.layout.withoutSidebar.class);
		
		var elm = document.querySelector('.' + app.header.class + ' ['+ app.sidebar.mobile.toggleAttr +']');
		if (elm) {
			elm.classList.add(app.helper.display.none);
		}
		
		var elm = document.querySelector('.' + app.sidebar.class);
		if (elm) {
			elm.style.display = 'none';
		}
		
		var elm = document.querySelector('.' + app.sidebar.bg.class);
		if (elm) {
			elm.style.display = 'none';
		}
		
		var elm = document.querySelector('.' + app.sidebar.mobile.backdrop.class);
		if (elm) {
			elm.style.display = 'none';
		}
	}
	if (option.appHeaderInverse) {
		var elm = document.querySelector('.' + app.header.class);
		if (elm) {
			elm.setAttribute(app.darkMode.attr, app.darkMode.value);
		}
	}
	if (option.pageContentFullWidth) {
		var elm = document.querySelector('.' + app.content.class);
		if (elm) {
			elm.classList.add(app.content.fullWidth.class);
		}
	}
	if (option.appClass) {
		var classList = (option.appClass).split(' ');
		for (var i = 0; i < classList.length; i++) {
			targetElm.classList.add(classList[i]);
		}
	}
	if (option.appContentClass) {
		var elm = document.querySelector('.' + app.content.class);
		if (elm) {
			var classList = (option.appContentClass).split(' ');
			for (var i = 0; i < classList.length; i++) {
				elm.classList.add(classList[i]);
			}
		}
	}
	if (option.bodyClass) {
		var classList = (option.bodyClass).split(' ');
		for (var i = 0; i < classList.length; i++) {
			document.body.classList.add(classList[i]);
		}
	}
	if (option.appBoxedLayout) {
		document.body.classList.add(app.layout.boxedLayout.class);
	}
	if (option.clearOptionOnLeave) {
		app.ajax.clearOption = option;
	}
};
var handleClearPageOption = function(option) {
	var targetElm = document.querySelector('.' + app.class);
	if (!targetElm) {
		return;
	}
	if (option.appContentFullHeight) {
		targetElm.classList.remove(app.content.fullHeight.class);
	}
	if (option.appSidebarLight) {
		var targetSidebar = document.querySelector('.'+ app.class + ' .' + app.sidebar.class + ':not(.'+ app.sidebarEnd.class +')');
		if (!targetSidebar) {
			return;
		}
		targetSidebar.setAttribute(app.darkMode.attr, app.darkMode.value);
	}
	if (option.appSidebarEnd) {
		targetElm.classList.remove(app.layout.sidebarEnd.class);
	}
	if (option.appSidebarWide) {
		targetElm.classList.remove(app.layout.sidebarWide.class);
	}
	if (option.appSidebarMinified) {
		targetElm.classList.remove(app.layout.sidebarMinified.class);
	}
	if (option.appSidebarTwo) {
		targetElm.classList.remove(app.layout.sidebarTwo.class);
		targetElm.classList.remove(app.sidebarEnd.toggledClass);
		
		var elm = document.querySelector('.' + app.header.class + ' ['+ app.sidebarEnd.mobile.toggleAttr +']');
		if (elm) {
			elm.classList.add(app.helper.display.none);
		}
		
		var elm = document.querySelector('.' + app.header.class + ' .'+ app.header.brand.class);
		if (elm) {
			elm.classList.add(app.helper.margin.left[0]);
		}
	}
	if (option.appSidebarTransparent) {
		var elm = document.querySelector('.' + app.sidebar.class);
		if (elm) {
			elm.classList.remove(app.sidebar.transparent.class);
		}
	}
	if (option.appSidebarSearch) {
		var elm = document.querySelector('.' + app.sidebar.class + ' .'+ app.sidebar.search.class);
		if (elm) {
			elm.classList.add(app.sidebar.search.hideClass);
		}
	}
	if (option.appSidebarHover) {
		targetElm.classList.remove(app.sidebar.hover.class);
	}
	if (option.appTopMenu) {
		targetElm.classList.remove(app.layout.topMenu.class);
		
		var elm = document.querySelector('.' + app.header.class + ' ['+ app.topMenu.mobile.toggleAttr +']');
		if (elm) {
			elm.classList.add(app.helper.display.none);
		}
	}
	if (option.appHeaderInverse) {
		var elm = document.querySelector('.' + app.header.class);
		if (elm) {
			elm.removeAttribute(app.darkMode.attr);
		}
	}
	if (option.appWithoutSidebar) {
		targetElm.classList.remove(app.layout.withoutSidebar.class);
		
		var elm = document.querySelector('.' + app.header.class + ' ['+ app.sidebar.mobile.toggleAttr +']');
		if (elm) {
			elm.classList.remove(app.helper.display.none);
		}
		
		var elm = document.querySelector('.' + app.sidebar.class);
		if (elm) {
			elm.removeAttribute('style');
		}
		
		var elm = document.querySelector('.' + app.sidebar.bg.class);
		if (elm) {
			elm.removeAttribute('style');
		}
		
		var elm = document.querySelector('.' + app.sidebar.mobile.backdrop.class);
		if (elm) {
			elm.removeAttribute('style');
		}
	}
	if (option.appWithoutHeader) {
		targetElm.classList.remove(app.layout.withoutHeader.class);
		
		var elm = document.querySelector('.' + app.header.class);
		if (elm) {
			elm.removeAttribute('style');
		}
	}
	if (option.appContentFullWidth) {
		var elm = document.querySelector('.' + app.content.class);
		if (elm) {
			elm.classList.remove(app.content.fullWidth.class);
		}
	}
	if (option.appContentClass) {
		var elm = document.querySelector('.' + app.content.class);
		if (elm) {
			var classList = (option.appContentClass).split(' ');
			for (var i = 0; i < classList.length; i++) {
				elm.classList.remove(classList[i]);
			}
		}
	}
	if (option.appClass) {
		var classList = (option.appClass).split(' ');
		for (var i = 0; i < classList.length; i++) {
			targetElm.classList.remove(classList[i]);
		}
	}
	if (option.bodyClass) {
		var classList = (option.bodyClass).split(' ');
		for (var i = 0; i < classList.length; i++) {
			document.body.classList.remove(classList[i]);
		}
	}
	if (option.appBoxedLayout) {
		document.body.classList.remove(app.layout.boxedLayout.class);
	}
};


/* 25. Handle Float Navbar Search
------------------------------------------------ */
var handleToggleNavbarSearch = function() {
	var elm = document.querySelector('['+ app.header.floatingForm.toggleAttr +']');
	if (elm) {
		elm.onclick = function(e) {
			e.preventDefault();
			document.querySelector('.'+ app.header.class).classList.add(app.header.floatingForm.toggledClass);
		}
	}
	
	var elm = document.querySelector('['+ app.header.floatingForm.dismissAttr +']');
	if (elm) {
		elm.onclick = function(e) {
			e.preventDefault();
			document.querySelector('.'+ app.header.class).classList.remove(app.header.floatingForm.toggledClass);
		}
	}
};


/* 26. Handle Animation
------------------------------------------------ */
var convertNumberWithCommas = function(x) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
var checkIsFloat = function(x){
	return Number(x) === x && x % 1 !== 0;
};
var checkIsInt = function(x){
	return Number(x) === x && x % 1 === 0;
};
var countDecimals = function(x) {
	var split = x.toString().split('.');
	 
  return (split[1]) ? split[1].length : 0; 
};
var handleAnimation = function() {
	var elms = [].slice.call(document.querySelectorAll('['+ app.animation.attr +']'));
	if (elms) {
		elms.map(function(elm) {
			var targetAnimate = elm.getAttribute(app.animation.attr);
			var targetValue = elm.getAttribute(app.animation.valueAttr);
			
			switch (targetAnimate) {
				case 'width':
					elm.style.width = targetValue;
					break;
				case 'height':
					elm.style.height = targetValue;
					break;
				case 'number':
					var targetElm = elm;
					var decimal = countDecimals(targetValue);
					var divide = 1;
					var x = decimal;
					while (x > 0) {
						divide *= 10;
						x--;
					}
					
					const animate = () => {
						const value = +(targetValue.replace(',', ''));
						const data = +((targetElm.count) ? targetElm.count : 0);
						const time = value / app.animation.speed;
						
						if (data < value) {
							var targetText = data + time;
							targetElm.innerText = convertNumberWithCommas((targetText).toFixed(decimal));
							targetElm.count = targetText;
							setTimeout(animate, 1);
						} else {
							targetElm.innerText = convertNumberWithCommas(value);
						}
				 	}
					animate();
					break;
				case 'class':
					elm.classList.add(targetValue);
					break;
				default:
					break;
			}
		});
	}
};


/* 27. Handle Sidebar Search
------------------------------------------------ */
var handleSidebarSearch = function() {
	var elms = [].slice.call(document.querySelectorAll('['+ app.sidebar.search.toggleAttr + ']'));
	if (elms) {
		elms.map(function(elm) {
			elm.onkeyup = function() {
				var targetValue = this.value;
						targetValue = targetValue.toLowerCase();
		
				if (targetValue) {
					var elms = [].slice.call(document.querySelectorAll('.'+ app.sidebar.class +':not(.'+ app.sidebarEnd.class +') .'+ app.sidebar.menu.class +' > .'+ app.sidebar.menu.itemClass +':not(.'+ app.sidebar.profile.class +'):not(.'+ app.sidebar.menu.headerClass +'):not(.'+ app.sidebar.search.class +'), .'+ app.sidebar.class +':not(.'+ app.sidebarEnd.class +') .'+ app.sidebar.menu.submenu.class +' > .'+ app.sidebar.menu.itemClass));
					if (elms) {
						elms.map(function(elm) {
							elm.classList.add(app.sidebar.search.hideClass);
						});
					}
					var elms = [].slice.call(document.querySelectorAll('.'+ app.sidebar.class +':not(.'+ app.sidebarEnd.class +') .'+ app.sidebar.search.foundClass));
					if (elms) {
						elms.map(function(elm) {
							elm.classList.remove(app.sidebar.search.foundClass);
						});
					}
					var elms = [].slice.call(document.querySelectorAll('.'+ app.sidebar.class +':not(.'+ app.sidebarEnd.class +') .'+ app.sidebar.menu.expandClass));
					if (elms) {
						elms.map(function(elm) {
							elm.classList.remove(app.sidebar.menu.expandClass);
						});
					}
					var elms = [].slice.call(document.querySelectorAll('.'+ app.sidebar.class +':not(.'+ app.sidebarEnd.class +') .'+ app.sidebar.menu.class +' > .'+ app.sidebar.menu.itemClass +':not(.'+ app.sidebar.profile.class +'):not(.'+ app.sidebar.menu.headerClass +'):not(.'+ app.sidebar.search.class +') > .'+ app.sidebar.menu.itemLinkClass +', .'+ app.sidebar.class +' .'+ app.sidebar.menu.submenu.class +' > .'+ app.sidebar.menu.itemClass +' > .'+ app.sidebar.menu.itemLinkClass +''));
					if (elms) {
						elms.map(function(elm) {
							var targetText = elm.textContent;
									targetText = targetText.toLowerCase();
							if (targetText.search(targetValue) > -1) {
								var targetElm = elm.closest('.' + app.sidebar.menu.itemClass);
								if (targetElm) {
									targetElm.classList.remove(app.sidebar.search.hideClass);
									targetElm.classList.add(app.sidebar.search.foundClass);
								}
								
								var targetElm = elm.closest('.' + app.sidebar.menu.itemClass + '.'+ app.sidebar.menu.hasSubClass);
								if (targetElm) {
									var targetElm = targetElm.querySelector('.'+ app.sidebar.menu.submenu.class +' .'+ app.sidebar.menu.itemClass + '.'+ app.sidebar.search.hideClass);
									if (targetElm) {
										targetElm.classList.remove(app.sidebar.search.hideClass);
									}
								}
								
								var targetElm = elm.closest('.'+ app.sidebar.menu.submenu.class);
								if (targetElm) {
									targetElm.style.display = 'block';
									
									var targetElm = targetElm.querySelector('.'+ app.sidebar.menu.itemClass +':not(.'+ app.sidebar.search.foundClass +')');
									if (targetElm) {
										targetElm.classList.add(app.sidebar.search.hideClass);
									}
									
									var targetElm = elm.closest('.'+ app.sidebar.menu.hasSubClass + ':not(.'+ app.sidebar.search.foundClass + ')');
									if (targetElm) {
										targetElm.classList.remove(app.sidebar.search.hideClass);
										targetElm.classList.add(app.sidebar.menu.expandClass);
										
										var targetElm = targetElm.closest('.'+ app.sidebar.menu.hasSubClass + ':not(.'+ app.sidebar.search.foundClass + ')');
										if (targetElm) {
											targetElm.classList.remove(app.sidebar.search.hideClass);
											targetElm.classList.add(app.sidebar.menu.expandClass);
										}
									}
								}
							}
						});
					}
				} else {
					var elms = [].slice.call(document.querySelectorAll('.'+ app.sidebar.class +':not(.'+ app.sidebarEnd.class +') .'+ app.sidebar.menu.class +' > .'+ app.sidebar.menu.itemClass +':not(.'+ app.sidebar.profile.class +'):not(.'+ app.sidebar.menu.headerClass +'):not(.'+ app.sidebar.search.class +').'+ app.sidebar.menu.hasSubClass +' .'+ app.sidebar.menu.submenu.class +''));
					if (elms) {
						elms.map(function(elm) {
							elm.removeAttribute('style');
						});
					}
					
					var elms = [].slice.call(document.querySelectorAll('.'+ app.sidebar.class +':not(.'+ app.sidebarEnd.class +') .'+ app.sidebar.menu.class +' > .'+ app.sidebar.menu.itemClass +':not(.'+ app.sidebar.profile.class +'):not(.'+ app.sidebar.menu.headerClass +'):not(.'+ app.sidebar.search.class +')'));
					if (elms) {
						elms.map(function(elm) {
							elm.classList.remove(app.sidebar.search.hideClass);
						});
					}
					
					var elms = [].slice.call(document.querySelectorAll('.'+ app.sidebar.class +':not(.'+ app.sidebarEnd.class +') .'+ app.sidebar.menu.submenu.class +' > .'+ app.sidebar.menu.itemClass));
					if (elms) {
						elms.map(function(elm) {
							elm.classList.remove(app.sidebar.search.hideClass);
						});
					}
					
					var elms = [].slice.call(document.querySelectorAll('.'+ app.sidebar.class +':not(.'+ app.sidebarEnd.class +') .'+ app.sidebar.menu.expandClass));
					if (elms) {
						elms.map(function(elm) {
							elm.classList.remove(app.sidebar.menu.expandClass);
						});
					}
				}
			}
		});
	}
};


/* 28. Handle Toggle Class
------------------------------------------------ */
var handleToggleClass = function() {
	var elms = [].slice.call(document.querySelectorAll('['+ app.toggleClass.toggleAttr + ']'));
	if (elms) {
		elms.map(function(elm) {
			elm.onclick = function(e) {
				e.preventDefault();
		
				var target = (this.getAttribute(app.toggleClass.targetAttr)) ? this.getAttribute(app.toggleClass.targetAttr) : '';
				var targetClass = this.getAttribute(app.toggleClass.toggleAttr);
				var targetElm = document.querySelector(target);
		
				if (targetElm) {
					targetElm.classList.toggle(targetClass);
				}
			}
		});
	}
};


/* 29. Handle Dismiss Class
------------------------------------------------ */
var handleDismissClass = function() {
	var elms = [].slice.call(document.querySelectorAll('['+ app.dismissClass.toggleAttr + ']'));
	if (elms) {
		elms.map(function(elm) {
			elm.onclick = function(e) {
				e.preventDefault();
				
				var target = (this.getAttribute(app.dismissClass.targetAttr)) ? this.getAttribute(app.dismissClass.targetAttr) : '';
				var targetClass = this.getAttribute(app.dismissClass.toggleAttr);
				var targetElm = document.querySelector(target);

				if (targetElm) {
					targetElm.classList.remove(targetClass);
				}
			}
		});
	}
};


/* 30. Handle Hex To Rgba
------------------------------------------------ */
var stringToColor = function(str) {
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  var color = '#';
  for (var i = 0; i < 3; i++) {
    var value = (hash >> (i * 8)) & 0xFF;
    color += ('00' + value.toString(16)).substr(-2);
  }
  return color;
};
var hexToRgba = function(hex, transparent = 1, repeat = false) {
	var c;
	if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
		c = hex.substring(1).split('');
		if(c.length== 3){
				c = [c[0], c[0], c[1], c[1], c[2], c[2]];
		}
		c = '0x'+c.join('');
		return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+','+ transparent +')';
	}
	if (!repeat) {
		hex = stringToColor(hex);
		return hexToRgba(hex, transparent, true);
	}
  throw new Error('Bad Hex');
};


/* 31. Handle Get Css Variable
------------------------------------------------ */
var handleCssVariable = function() {
	var rootStyle = getComputedStyle(document.body);
	
	// font
	if (app.variableFontList && app.variablePrefix) {
		for (var i = 0; i < (app.variableFontList).length; i++) {
			app.font[app.variableFontList[i].replace(/-([a-z|0-9])/g, (match, letter) => letter.toUpperCase())] = rootStyle.getPropertyValue('--'+ app.variablePrefix + app.variableFontList[i]).trim();
		}
	}
	
	// color
	if (app.variableColorList && app.variablePrefix) {
		for (var i = 0; i < (app.variableColorList).length; i++) {
			app.color[app.variableColorList[i].replace(/-([a-z|0-9])/g, (match, letter) => letter.toUpperCase())] = rootStyle.getPropertyValue('--'+ app.variablePrefix + app.variableColorList[i]).trim();
		}
	}
};


/* 32. Handle Scroll To
------------------------------------------------ */
var handleScrollTo = function() {
	var elmTriggerList = [].slice.call(document.querySelectorAll('['+ app.scrollTo.toggleAttr +']'));
	var elmList = elmTriggerList.map(function(elm) {
		elm.onclick = function(e) {
			e.preventDefault();
		
			var targetAttr = (elm.getAttribute(app.scrollTo.targetAttr)) ? this.getAttribute(app.scrollTo.targetAttr) : this.getAttribute('href');
			var targetElm = document.querySelectorAll(targetAttr)[0];
			var targetHeader = document.querySelectorAll('.'+ app.header.class)[0];
			var targetHeight = targetHeader.offsetHeight;
			var targetContent = document.querySelector('.'+ app.content.class);
			var targetContentStyle = window.getComputedStyle(targetContent);
			var targetContentPadding = (targetContentStyle) ? parseInt(targetContentStyle.getPropertyValue('padding-top')) : 0;
			
			if (targetElm) {
				var targetTop = targetElm.offsetTop - targetHeight - targetContentPadding;
				window.scrollTo({top: targetTop, behavior: 'smooth'});
			}
		}
	});
};


/* Application Controller
------------------------------------------------ */
var App = function () {
	"use strict";
	
	var setting;
	
	return {
		//main function
		init: function (option) {
			if (option) {
				setting = option;
			}
			this.initLocalStorage();
			this.initTopMenu();
			this.initComponent();
			this.initPageLoad();
			this.initSidebar();
			this.initThemePanel();
			this.initVariable();
			window.dispatchEvent(new CustomEvent('load'));

			if (setting && setting.ajaxMode) {
				this.initAjax();
			}
		},
		settings: function (option) {
			if (option) {
				setting = option;
			}
		},
		initSidebar: function() {
			handleSidebarMenu();
			handleSidebarToggle();
			handleSidebarEndToggle();
			handleSidebarMinify();
			handleSidebarMinifyFloatMenu();
			handleToggleNavProfile();
			handleToggleNavbarSearch();
			handleSidebarSearch();
			
			if (!setting || (setting && !setting.disableSidebarScrollMemory)) {
				handleSidebarScrollMemory();
			}
		},
		initTopMenu: function() {
			handleUnlimitedTopMenuRender();
			handleTopMenuSubMenu();
			handleTopMenuMobileToggle();
		},
		initPageLoad: function() {
			handlePageLoader();
		},
		initComponent: function() {
			if (!setting || (setting && !setting.disableDraggablePanel)) {
				handlePanelDraggable();
			}
			handleScrollbar();
			handleScrollTo();
			handleUnlimitedTabsRender();
			handlePanelAction();
			handleScrollToTopButton();
			handlePageScrollClass();
			handleAnimation();
			handleToggleClass();
			handleDismissClass();
			handleAjaxMode.initToggler();
			
			if (document.body.clientWidth > 767) {
				handelTooltipPopoverActivation();
			}
		},
		initLocalStorage: function() {
			if (!setting || (setting && !setting.disableLocalStorage)) {
				handleLocalStorage();
			}
		},
		initThemePanel: function() {
			handleThemePanel();
			handleResetLocalStorage();
		},
		initAjax: function() {
			handleAjaxMode.init(setting);
		},
		initVariable: function() {
			handleCssVariable();
		},
		setPageTitle: function(pageTitle) {
			document.title = pageTitle;
		},
		setPageOption: function(option) {
			handleSetPageOption(option);
		},
		clearPageOption: function(option) {
			handleClearPageOption(option);
		},
		restartGlobalFunction: function() {
			var elmsArray = ['.jvectormap-tip', '.daterangepicker'];
			for (var x = 0; x < elmsArray.length; x++) {
				var elms = [].slice.call(document.querySelectorAll(elmsArray[x]));
				if (elms) {
					elms.map(function(elm) {
						elm.remove();
					});
				}
			}
			this.initLocalStorage();
			this.initComponent();
		},
		scrollTop: function() {
			document.body.scrollTop = 0;
		}
  };
}();


if (document.readyState !== 'loading') {
	App.init();
	App.restartGlobalFunction();
} else {
	document.addEventListener('DOMContentLoaded', function () {
		App.init();
		App.restartGlobalFunction();
	});
}