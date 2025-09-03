/*
	TASK LIST
	------------------
	01. gulp fonts
	02. gulp jsDemo
	03. gulp jsVendor
	04. gulp jsApp
	05. gulp data
  06. gulp plugins
	07. gulp cssVendor
	08. gulp 
	09. gulp apple
	10. gulp material
	11. gulp transparent
	12. gulp google
	13. gulp facebook
	14. gulp allCss
*/


import gulp from 'gulp';
import * as dartSass from 'sass';
import gulpSass from 'gulp-sass';
import minifyCSS from'gulp-clean-css';
import concat from'gulp-concat';
import sourcemaps from'gulp-sourcemaps';
import livereload from'gulp-livereload';
import connect from'gulp-connect';
import uglify from'gulp-uglify';
import rename from'gulp-rename';
import fileinclude from'gulp-file-include';
import autoprefixer from'gulp-autoprefixer';
import copy from 'gulp-copy';
import insert from 'gulp-insert';

const sass     = gulpSass(dartSass);
const distPath = './../static';

export function fonts() {
	gulp.src(['node_modules/bootstrap-icons/font/fonts/**'])
		.pipe(copy(distPath + '/webfonts/', { prefix: 4 }));
	return gulp.src(['node_modules/@fortawesome/fontawesome-free/webfonts/**'])
		.pipe(copy(distPath + '/webfonts/', { prefix: 4 }));
};

export function jsDemo() {
	return gulp.src('./src/js/demo/*')
		.pipe(copy(distPath + '/js/demo/', { prefix: 3 }))
		.pipe(livereload());
};

export function jsVendor() {
  return gulp.src([
			'node_modules/pace-js/pace.min.js',
			'node_modules/jquery/dist/jquery.min.js',
			'node_modules/jquery-ui-dist/jquery-ui.min.js',
			'node_modules/bootstrap/dist/js/bootstrap.bundle.min.js',
			'node_modules/perfect-scrollbar/dist/perfect-scrollbar.min.js',
			'node_modules/js-cookie/dist/js.cookie.js'
		])
		.pipe(sourcemaps.init())
		.pipe(concat('vendor.min.js'))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(distPath + '/js/'))
		.pipe(livereload())
};

export function jsApp() {
	return gulp.src([
			'./src/js/app.js',
		])
		.pipe(uglify())
    .pipe(rename('app.min.js'))  
		.pipe(gulp.dest(distPath + '/js/'))
		.pipe(livereload())
};

export function data() {
	return gulp.src(['./src/data/**'])
		.pipe(copy(distPath + '/data/', { prefix: 2 }))
		.pipe(livereload());
};

export function plugins() {
	return gulp.src([
  	'node_modules/@fortawesome/**',
  	'node_modules/@fullcalendar/**',
		'node_modules/@highlightjs/**',
		'node_modules/abpetkov-powerange/**',
		'node_modules/angular/**',
		'node_modules/angular-ui-bootstrap/**',
		'node_modules/angular-ui-router/**',
  	'node_modules/animate.css/**',
		'node_modules/apexcharts/**',
		'node_modules/blueimp-file-upload/**',
		'node_modules/blueimp-gallery/**',
		'node_modules/blueimp-canvas-to-blob/**',
		'node_modules/blueimp-load-image/**',
		'node_modules/blueimp-tmpl/**',
  	'node_modules/bootstrap/**',
		'node_modules/bootstrap-datepicker/**',
		'node_modules/bootstrap-daterangepicker/**',
		'node_modules/bootstrap-datetime-picker/**',
  	'node_modules/bootstrap-icons/**',
		'node_modules/bootstrap-social/**',
		'node_modules/bootstrap-timepicker/**',
		'node_modules/bootstrap3-wysihtml5-bower/**',
		'node_modules/chart.js/**',
		'node_modules/clipboard/**',
		'node_modules/d3/**',
		'node_modules/datatables.net/**',
		'node_modules/datatables.net-autofill/**',
		'node_modules/datatables.net-autofill-bs5/**',
		'node_modules/datatables.net-bs5/**',
		'node_modules/datatables.net-buttons/**',
		'node_modules/datatables.net-buttons-bs5/**',
		'node_modules/datatables.net-colreorder/**',
		'node_modules/datatables.net-colreorder-bs5/**',
		'node_modules/datatables.net-fixedcolumns/**',
		'node_modules/datatables.net-fixedcolumns-bs5/**',
		'node_modules/datatables.net-fixedheader/**',
		'node_modules/datatables.net-fixedheader-bs5/**',
		'node_modules/datatables.net-keytable/**',
		'node_modules/datatables.net-keytable-bs5/**',
		'node_modules/datatables.net-responsive/**',
		'node_modules/datatables.net-responsive-bs5/**',
		'node_modules/datatables.net-rowreorder/**',
		'node_modules/datatables.net-rowreorder-bs5/**',
		'node_modules/datatables.net-scroller/**',
		'node_modules/datatables.net-scroller-bs5/**',
		'node_modules/datatables.net-select/**',
		'node_modules/datatables.net-select-bs5/**',
		'node_modules/datepickk/**',
		'node_modules/dropzone/**',
		'node_modules/flag-icons/**',
		'node_modules/flot/**',
		'node_modules/gritter/**',
		'node_modules/intro.js/**',
		'node_modules/ion-rangeslider/**',
		'node_modules/ionicons/**',
		'node_modules/isotope-layout/**',
  	'node_modules/jquery/**',
		'node_modules/jquery-knob/**',
		'node_modules/jquery-migrate/**',
		'node_modules/jquery-mockjax/**',
		'node_modules/jquery-sparkline/**',
  	'node_modules/jquery-ui-dist/**',
		'node_modules/jquery.maskedinput/**',
  	'node_modules/js-cookie/**',
		'node_modules/jstree/**',
		'node_modules/jszip/**',
		'node_modules/jvectormap-content/**',
		'node_modules/jvectormap-next/**',
		'node_modules/kbw-countdown/**',
		'node_modules/lightbox2/**',
		'node_modules/lity/**',
		'node_modules/masonry-layout/**',
		'node_modules/moment/**',
		'node_modules/nvd3/**',
		'node_modules/oclazyload/**',
  	'node_modules/pace-js/**',
		'node_modules/parsleyjs/**',
		'node_modules/pdfmake/**',
  	'node_modules/perfect-scrollbar/**',
  	'node_modules/photoswipe/**',
  	'node_modules/quill/**',
		'node_modules/raphael/**',
		'node_modules/select-picker/**',
		'node_modules/select2/**',
		'node_modules/simple-line-icons/**',
		'node_modules/spectrum-colorpicker2/**',
		'node_modules/summernote/**',
		'node_modules/sweetalert/**',
		'node_modules/swiper/**',
		'node_modules/switchery/**',
		'node_modules/tag-it/**',
		'node_modules/x-editable-bs4/**'
	], { base: './node_modules/' }).pipe(copy(distPath + '/plugins', { prefix: 1 }));
};

export function cssVendor() {
  return gulp.src([
		'node_modules/animate.css/animate.min.css',
		'node_modules/@fortawesome/fontawesome-free/css/all.min.css',
		'node_modules/jquery-ui-dist/jquery-ui.min.css',
		'node_modules/pace-js/themes/black/pace-theme-flash.css',
		'node_modules/perfect-scrollbar/css/perfect-scrollbar.css'
	])
	.pipe(sass())
	.pipe(concat('vendor.min.css'))
	.pipe(minifyCSS({debug: true}, (details) => {
		console.log(`${details.name}: ${details.stats.originalSize}`);
		console.log(`${details.name}: ${details.stats.minifiedSize}`);
	}))
	.pipe(gulp.dest(distPath + '/css/'))
	.pipe(livereload());
};

export function cssImg(theme) {
	return function cssImgTask() {
		return gulp.src([ './src/scss/'+ theme +'/images/**' ])
			.pipe(copy(distPath + '/css/'+ theme +'/', { prefix: 3 }));
	}
};

export function cssApp(theme) {
	return function cssAppTask() {
		return gulp.src([
			'./src/scss/'+ theme +'/styles.scss'
		])
		.pipe(sourcemaps.init())
		.pipe(sass({ includePaths: ['node_modules'] }).on('error', sass.logError))
		.pipe(concat('app.min.css'))
		.pipe(autoprefixer())
		.pipe(minifyCSS())
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(distPath + '/css/'+ theme +'/'))
		.pipe(livereload());
	}
};

export function watch(theme) {
	return function watchTask() {
		livereload.listen();
		gulp.watch('./src/scss/'+ theme +'/**/*.scss', gulp.series(cssApp(theme)));
		gulp.watch('./src/js/**/*.js', gulp.series([jsApp, jsDemo]));
	}
};

const cssDefault        = cssApp('default');
const cssDefaultImg     = cssImg('default');
const cssApple          = cssApp('apple');
const cssAppleImg       = cssImg('apple');
const cssMaterial       = cssApp('material');
const cssMaterialImg    = cssImg('material');
const cssTransparent    = cssApp('transparent');
const cssTransparentImg = cssImg('transparent');
const cssGoogle         = cssApp('google');
const cssGoogleImg      = cssImg('google');
const cssFacebook       = cssApp('facebook');
const cssFacebookImg    = cssImg('facebook');

const watchDefault     = watch('default');
const watchApple       = watch('apple');
const watchMaterial    = watch('material');
const watchTransparent = watch('transparent');
const watchGoogle      = watch('google');
const watchFacebook    = watch('facebook');

export default gulp.series(
	cssVendor, cssDefault, cssDefaultImg, jsVendor, jsApp, jsDemo, fonts
);
export const apple = gulp.series(
	cssVendor, cssApple, cssAppleImg, jsVendor, jsApp, jsDemo, fonts
);
export const material = gulp.series(
	cssVendor, cssMaterial, cssMaterialImg, jsVendor, jsApp, jsDemo, fonts
);
export const transparent = gulp.series(
	cssVendor, cssTransparent, cssTransparentImg, jsVendor, jsApp, jsDemo, fonts
);
export const google = gulp.series(
	cssVendor, cssGoogle, cssGoogleImg, jsVendor, jsApp, jsDemo, fonts
);
export const facebook = gulp.series(
	cssVendor, cssFacebook, cssFacebookImg, jsVendor, jsApp, jsDemo, fonts
);

export const allCss = gulp.series(
	cssDefault, cssDefaultImg, cssApple, cssAppleImg, cssMaterial, cssMaterialImg,
	cssTransparent, cssTransparentImg, cssGoogle, cssGoogleImg, cssFacebook, cssFacebookImg
);