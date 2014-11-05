(function($) {

    // Alerts
    $('i.close').on('click', function() {
        $(this.parentNode).fadeOut(400);
    });

    // Toggle Menu
    var toggleMenu = {
        config: {
            navSelector: '.navtoggle',
            toggleSelector: '.navtoggle-burger',
            initialNavHeight: '',
            activeClass: 'active',
            hideClass: 'hidden',
            addClass: 'show-for-phone-only'
        },
        totalHeight: '',
        init: function() {
            toggleMenu.totalHeight = $(toggleMenu.config.navSelector).height() + 'px';

            $(toggleMenu.config.navSelector + ' ul').css('display', 'none');
            toggleMenu.config.initialNavHeight = $(toggleMenu.config.navSelector).height() + 'px';
            $(toggleMenu.config.navSelector + ' ul').removeAttr('style');

            $(toggleMenu.config.navSelector).height(toggleMenu.config.initialNavHeight)
                .removeClass(toggleMenu.config.hideClass)
                .addClass(toggleMenu.config.addClass);
            $(toggleMenu.config.toggleSelector).on('click', toggleMenu.toggle);
        },
        toggle: function(e) {
            var $nav = $(toggleMenu.config.navSelector);
            e.preventDefault();
            $nav.toggleClass(toggleMenu.config.activeClass);
            // Open
            if ($nav.hasClass(toggleMenu.config.activeClass))
                $nav.height(toggleMenu.totalHeight);
            // Close
            if (!$nav.hasClass(toggleMenu.config.activeClass))
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
        // Consistent element order
        collection: [],
        // Prevent click + drag off modal closure.
        mouseDownHere: false,
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
                var a = [];
                $(modalSelector).each(function() {
                    a.push(this);
                });
                return a;
            }());
            activeDialogue.collection = elements;
            $(fireElement).on('click', activeDialogue.fire);
            $(close).on('mousedown', activeDialogue.close);
            $(close).on('mouseup', activeDialogue.close);
            $(nextBtn).on('click', activeDialogue.next);
            $(prevBtn).on('click', activeDialogue.previous);
        },
        fire: function(activeTarget) {
            // Allow only one active modal
            $(activeDialogue.config.modalSelector).css('display', 'none');
            $('.modal').each(function() {
                if (activeTarget.currentTarget.dataset['fire'] == this.id) {
                    $(this).css('display', 'initial');
                    $('body').addClass('active-modal');
                    return false;
                }
            });
        },
        open: function(id) {
            // Allow only one active modal
            $(activeDialogue.config.modalSelector).css('display', 'none');
            $('#' + id).css('display', 'initial');
            $('body').addClass('active-modal');
        },
        close: function(e) {
            // Return if child of selector is clicked
            if (e.target !== this) {
                // Prevent click + drag off modal closure.
                activeDialogue.config.mouseDownHere = false;
                return;
            }
            // Prevent click + drag off modal closure.
            if (!activeDialogue.config.mouseDownHere) {
                activeDialogue.config.mouseDownHere = true;
                return;
            }
            activeDialogue.config.mouseDownHere = false;
            $(activeDialogue.config.modalSelector).css('display', 'none');
            $('body').removeClass('active-modal');
        },
        next: function(e) {
            var index = activeDialogue.collection.indexOf(e.currentTarget.offsetParent) + 1;
            if (index >= activeDialogue.collection.length) index = 0;
            activeDialogue.open(activeDialogue.collection[index].id);
        },
        previous: function(e) {
            var index = activeDialogue.collection.indexOf(e.currentTarget.offsetParent) - 1;
            if (index < 0) index = activeDialogue.collection.length - 1;
            activeDialogue.open(activeDialogue.collection[index].id);
        }
    };

    // Good Slideshow
    var goodSlideshow = {
        config: {
            selector: '[data-slideshow]',
            // disableDuration should match the animation duration 
            // applied to ul[data-slideshow] li
            disableDuration: 300 
        },
        animationActive: false,
        init: function(config) {
            var prevBtn = '<li data-prev><i class="fa"></i></li>',
                nextBtn = '<li data-next><i class="fa"></i></li>',
                navigation = '<ul class="ss-navigation">' + prevBtn + nextBtn + '</ul>';

            // Allow overriding the default settings
            $.extend(goodSlideshow.config, config);
            $(goodSlideshow.config.selector).append(navigation);
            $('[data-next], [data-prev]').on('click', goodSlideshow.cycle);
        },
        cycle: function(e) {
            var target = e.currentTarget.parentNode.parentNode;
            if (goodSlideshow.animationActive) return;
            if (e.currentTarget.dataset.next == "") {
                goodSlideshow.next(target);
                return;
            }
            goodSlideshow.previous(target);
        },
        previous: function(activeTarget) {
            var index = $(activeTarget).children('li').length;
            var target = $(activeTarget).children('li:nth-child(' + index + ')').detach();

            $(activeTarget).prepend(target);
            goodSlideshow.animationActive = true;
            window.setTimeout(function() {
                goodSlideshow.animationActive = false;
            }, goodSlideshow.config.disableDuration);
        },
        next: function(activeSlideshow) {
            var targetImg = $(activeSlideshow).children('li:nth-child(2)').detach();
            $(activeSlideshow).prepend(targetImg);
            goodSlideshow.animationActive = true;
            window.setTimeout(function() {
                var imgToAppend = $(activeSlideshow).children('li:nth-child(2)').detach();
                $(imgToAppend).insertBefore($(activeSlideshow).find('.ss-navigation'));
                goodSlideshow.animationActive = false;
            }, goodSlideshow.config.disableDuration);
        }
    };

    // Content Collapse
    var contentCollapse = {
        config: {
            fireSelector: '[data-toggle]',
            contentSelector: '.content',
            openClass: 'open',
            animate: true,
            duration: 300,
            easing: 'ease'
        },
        init: function(config) {
            $.extend(contentCollapse.config, config);
            $(contentCollapse.config.fireSelector).on('click', function(e) {
                var $activeTarget = $(this).parent();
                if ($activeTarget.hasClass(contentCollapse.config.openClass)) {
                    contentCollapse.close($activeTarget);
                    return;
                }
                contentCollapse.open($activeTarget);
            });
        },
        open: function($openSelector) {
            if(contentCollapse.config.animate){
                var $content = $openSelector.children(contentCollapse.config.contentSelector);
                $content.slideDown(contentCollapse.config.duration);
                $openSelector.addClass(contentCollapse.config.openClass);  
                return;
            }
            $openSelector.toggleClass('open');    
        },
        close: function($closeSelector) {
            if(contentCollapse.config.animate){
                var $content = $closeSelector.children(contentCollapse.config.contentSelector);
                $content.slideUp(contentCollapse.config.duration);
                $closeSelector.removeClass(contentCollapse.config.openClass);
                return;
            }
           $closeSelector.toggleClass('open');    
        }
    };

    // Equal Height
    var equalHeight = {
        config:{
            setHeightTo: 0,
            // Point that equalHeight elements stack
            maxWidth: 768,
            selector: '.equalHeight'
        },
        init: function(){
            $(window).on('resize', equalHeight.reset);
            equalHeight.setHeight();
        },
        setHeight: function(){
            if (window.innerWidth < equalHeight.config.maxWidth) return;
            $(equalHeight.config.selector).each(function(){
                if($(this).height() > equalHeight.config.setHeightTo) 
                    equalHeight.config.setHeightTo = $(this).height();
            });
            $(equalHeight.config.selector).css('height', equalHeight.config.setHeightTo + 'px');
        },
        reset: function(){
            if (window.innerWidth < equalHeight.config.maxWidth){
                $(equalHeight.config.selector).removeAttr('style');
                return;
            } 
            equalHeight.setHeight();
        }
    };

    // Scroll Animations
    var sparkplugScrollAnimations = new WOW({
        boxClass: 'wow', // default
        animateClass: 'animated', // default
        offset: 0 // default
    });

    // Initializations
    toggleMenu.init();
    activeDialogue.init();
    goodSlideshow.init();
    contentCollapse.init();
    equalHeight.init();
    sparkplugScrollAnimations.init();

})(jQuery);