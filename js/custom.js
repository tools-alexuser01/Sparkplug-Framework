$(function() {



// Alerts

	$('i.close').on('click', function(){
		$(this.parentNode).fadeOut(400);
	});
	
// Basic Tiggle Menu
	$(".burger").on('click', function(){
		$(".toggle ul").toggleClass("visible");
	});


});


