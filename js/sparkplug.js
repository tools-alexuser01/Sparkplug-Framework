(function($){

	// Alerts
	$('i.close').on('click', function(){
		$(this.parentNode).fadeOut(400);
	});

	// Toggle Menu
	var toggleMenu = {
		config: {
			navSelector: '.navtoggle',
			toggleSelector: '.navtoggle-burger',
			initialNavHeight: '50px',
			activeClass: 'active',
			hideClass: 'hidden',
			addClass: 'show-for-phone-only'
		},
		totalHeight: '',
		init: function(){
			toggleMenu.totalHeight = $(toggleMenu.config.navSelector).height() + 'px';
			$(toggleMenu.config.navSelector).height(toggleMenu.config.initialNavHeight)
												.removeClass(toggleMenu.config.hideClass)
												.addClass(toggleMenu.config.addClass);						
			$(toggleMenu.config.toggleSelector).on('click', toggleMenu.toggle);
		},
		toggle: function(){
			var $nav = $(toggleMenu.config.navSelector);
			$nav.toggleClass(toggleMenu.config.activeClass);
			// Open
			if($nav.hasClass(toggleMenu.config.activeClass)) 
				$nav.height(toggleMenu.totalHeight);
			// Close
			if(! $nav.hasClass(toggleMenu.config.activeClass)) 
				$nav.height(toggleMenu.config.initialNavHeight);
		}
	}

	


	// Scroll Animations
	var sparkplugScrollAnimations = new WOW({
		boxClass: 'wow', // default
		animateClass: 'animated', // default
		offset: 0 // default
	});

	// Initializations
	toggleMenu.init();
	sparkplugScrollAnimations.init();

})(jQuery);