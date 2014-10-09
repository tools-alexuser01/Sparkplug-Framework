$(function() {



// Alerts

	$('i.close').on('click', function(){
		$(this.parentNode).fadeOut(400);
	});
	
// Basic Tiggle Menu
	$(".navtoggle-burger").on('click', function(){
		
		$("nav.navtoggle ul").toggleClass("visible")

		});



	// Menu Toggle
	$('.toggle-me').on('click', function(e){
	  
	  e.preventDefault();
	  
	  $('body').toggleClass('nav-collapsed');
	  
	});

});


