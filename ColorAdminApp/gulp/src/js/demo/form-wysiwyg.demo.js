/*
Template Name: Color Admin - Responsive Admin Dashboard Template build with Twitter Bootstrap 5
Version: 5.5.2
Author: Sean Ngu
Website: http://www.seantheme.com/color-admin/
*/

var handleBootstrapWysihtml5 = function () {
	"use strict";
	$('#wysihtml5').wysihtml5();
};

var handleQuill = function() {
	const quill = new Quill('#editor1', {
    theme: 'snow',
    placeholder: 'Type something...'
  });
};

$(document).ready(function() {
	handleQuill();
	handleBootstrapWysihtml5();
	
	$(document).on('theme-reload', function() {
		$('.wysihtml5-sandbox, input[name="_wysihtml5_mode"], .wysihtml5-toolbar').remove();
		$('#wysihtml5').show();
		handleBootstrapWysihtml5();
	});
});