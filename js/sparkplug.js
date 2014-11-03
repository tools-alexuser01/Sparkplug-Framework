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
		toggle: function(e){
			var $nav = $(toggleMenu.config.navSelector);
			e.preventDefault();
			$nav.toggleClass(toggleMenu.config.activeClass);
			// Open
			if($nav.hasClass(toggleMenu.config.activeClass)) 
				$nav.height(toggleMenu.totalHeight);
			// Close
			if(! $nav.hasClass(toggleMenu.config.activeClass)) 
				$nav.height(toggleMenu.config.initialNavHeight);
		}
	};

	// Active Dialogue
	var activeDialogue = {
	    config: {
	        modalSelector: '.modal',
	        fireElement: 'a[data-fire]',
	        closeElement: '.modal',
	        nextButtonSelector: '.modal-next',
	        prevButtonSelector: '.modal-prev',
	    },
	    collection: [],
	    init: function(config) {
	        // Allow overriding the default settings
	        $.extend(activeDialogue.config, config);
	        var modalSelector = activeDialogue.config.modalSelector;
	        var fireElement = activeDialogue.config.fireElement;
	        var close = activeDialogue.config.closeElement;
	        var nextBtn = activeDialogue.config.nextButtonSelector;
	        var prevBtn = activeDialogue.config.prevButtonSelector;
	        // Collection of dialogue  elements
	        var elements = (function() {
	            var a = new Array();
	            $(modalSelector).each(function() {
	                a.push(this);
	            });
	            return a;
	        })();
	        activeDialogue.collection = elements;
	        $(fireElement).on('click', activeDialogue.fire);
	        $(close).on('click', activeDialogue.close);
	        $(nextBtn).on('click', activeDialogue.nextD);
	        $(prevBtn).on('click', activeDialogue.prevD);
	    },
	    fire: function(activeTarget) {
	        console.log('Fire' + activeTarget[0]);
	        $('.modal').each(function() {
	            if (activeTarget.currentTarget.dataset['fire'] == this.id) {
	                $(this).css({
	                    'display': 'initial'
	                });
	            }
	        });
	        $('body').addClass('active-modal');
	    },
	    open: function(id) {
	        openThis = '#' + id;
	        // Allow only one active modal
	        $(activeDialogue.config.modalSelector).css({
	            'display': 'none'
	        });
	        $(openThis).css({
	            'display': 'initial'
	        });
	    },
	    close: function(e) {
	        // Return if child of selector is clicked
	        if (e.target !== this) return;
	        $(this).css({
	            'display': 'none'
	        });
	        $('body').removeClass('active-modal');
	    },
	    nextD: function(e) {
	        var index = activeDialogue.collection.indexOf(e['currentTarget']['offsetParent']) + 1;
	        if (index >= activeDialogue.collection.length) index = 0;
	        activeDialogue.open(activeDialogue.collection[index].id);
	    },

	    prevD: function(e) {
	        var index = activeDialogue.collection.indexOf(e['currentTarget']['offsetParent']) - 1;
	        if (index < 0) index = activeDialogue.collection.length - 1;
	        activeDialogue.open(activeDialogue.collection[index].id);
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
	activeDialogue.init();
	sparkplugScrollAnimations.init();

})(jQuery);