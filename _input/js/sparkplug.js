(function($) {

    // Alerts
    $('i.close').on('click', function() {
        $(this.parentNode).fadeOut(400);
    });

    //thumbNav menu
    $('.thumbNav i').on('click', function(){
        var $nav = $(this).closest('.thumbNav'),
            width = $(window).width(0),
            height = $nav.find('ul').height();

        $nav.toggleClass('active')
            .css({
                'width': width,
                'height': height
            });

        if(!$nav.hasClass('active')) 
            $($nav).removeAttr('style');

        $('.iconSprite').append($('.iconSprite i:first-child'));
    });

    // Toggle Menu
    var toggleMenu = {
        config: {
            navSelector: '.navToggle',
            toggleSelector: '.navToggle-burger',
            activeClass: 'active',
            // Point at which toggle menu 
            // switches between default and dropdown behavior.
            maxWidth: 1200
        },
        init: function() {
            $(toggleMenu.config.toggleSelector).on('click', toggleMenu.toggle);
            $(window).on('resize', toggleMenu.reset);

            toggleMenu.reset();
        },
        setup: function(){
            // TODO: This block can only be fired on load. Can't fire on window resize.
            $(toggleMenu.config.navSelector).each(function(){
                var totalHeight = $(this).height() + $(this).find('ul').height();
                var initialHeight;

                $(this).find('ul').css('display', 'none');
                initialHeight = $(this).height() + 'px';
                $(this).find('ul').removeAttr('style');

                $(this).data({
                    'totalHeight': totalHeight,
                    'initialHeight': initialHeight
                });

                $(this).height(initialHeight);

                $(this).find('ul').css({
                    'visibility':'visible',
                    'position':'static'
                });
            });
        },
        reset: function(){
            if(window.innerWidth > toggleMenu.config.maxWidth){
                $(toggleMenu.config.navSelector).removeAttr('style');
                $(toggleMenu.config.navSelector).each(function(){
                    $(this).find('ul').css({
                        'visibility':'visible',
                        'position':'static'
                    });
                });
                return;
            }
            toggleMenu.setup();
        },
        toggle: function(e) {
            e.preventDefault();
            var $nav = $(this).closest(toggleMenu.config.navSelector),
                totalHeight = $nav.data('totalHeight'),
                initialHeight = $nav.data('initialHeight');

            $nav.toggleClass(toggleMenu.config.activeClass);
            // Open
            if ($nav.hasClass(toggleMenu.config.activeClass))
                $nav.height(totalHeight);

            // Close
            if (!$nav.hasClass(toggleMenu.config.activeClass))
                $nav.height(initialHeight);
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
            $(activeDialogue.config.modalSelector).removeClass('active');
            $('.modal').each(function() {
                if ($(activeTarget.currentTarget).data('fire') == this.id) {
                    $(this).addClass('active');
                    $('body').addClass('active-modal');
                    return false;
                }
            });
        },
        open: function(id) {
            // Allow only one active modal
            $(activeDialogue.config.modalSelector).removeClass('active');
            $('#' + id).addClass('active');
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
            $(activeDialogue.config.modalSelector).removeClass('active');
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
            var prevBtn = '<li data-prev></li>',
                nextBtn = '<li data-next></li>',
                navigation = '<ul class="ss-navigation">' + prevBtn + nextBtn + '</ul>';

            // Allow overriding the default settings
            $.extend(goodSlideshow.config, config);
            $(goodSlideshow.config.selector).append(navigation);
            $('[data-next], [data-prev]').on('click', goodSlideshow.cycle);
        },
        cycle: function(e) {
            var target = e.currentTarget.parentNode.parentNode;
            if (goodSlideshow.animationActive) return;
            if ($(e.currentTarget).data('next') == "") {
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
            contentSelector: '.contentCollapse-content',
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
            $(equalHeight.config.selector).removeAttr('style');
            if (window.innerWidth < equalHeight.config.maxWidth) return;

            $(equalHeight.config.selector).each(function(){
                if($(this).height() > equalHeight.config.setHeightTo) 
                    equalHeight.config.setHeightTo = $(this).height();
            });
            $(equalHeight.config.selector).css('height', equalHeight.config.setHeightTo + 'px');
        },
        reset: function(){
            $(equalHeight.config.selector).removeAttr('style');
            window.setTimeout(equalHeight.setHeight, 300)
        }
    };

    // Scroll Spy
    var scrollSpy = {
        config:{
            menuSelector: '[data-scrollSpy]',
            activeClass: 'active',
            scrollSpeed: 300,
            offset: 0
        },
        scrollSectionSelectors: [],
        init: function(){
            var $scrollMenuItems = $(scrollSpy.config.menuSelector).find('a');
            scrollSpy.scrollSectionSelectors = $scrollMenuItems.map(function(){
                var selector = $(this).attr('href')
                if(selector) return selector;
            });
            $scrollMenuItems.on('click', scrollSpy.scrollTo);
            $(window).on('scroll', scrollSpy.scrollCheck);

        },
        scrollTo: function(e){
            var anchor = $(this).attr('href'),
                scrollHere = 0,
                offset = 0; 
            if($(this).closest(scrollSpy.config.menuSelector).data('offset'))
                 offset = $(this).closest(scrollSpy.config.menuSelector).data('offset');
            if(anchor == '#') return;
            scrollHere = $(anchor).offset().top;
            $('html, body').stop().animate({
                scrollTop: scrollHere - offset
            }, scrollSpy.config.scrollSpeed)

            e.preventDefault();
        },
        scrollCheck: function(){
            var position = $(this).scrollTop(),
                selectors = scrollSpy.scrollSectionSelectors, 
                aboveSections = $.map(selectors, function(item, i){
                    if($(item).offset().top < position)
                        return item;
                }),
                activeSection = aboveSections[aboveSections.length -1];
            $(scrollSpy.config.menuSelector)
                .find('li').removeClass(scrollSpy.config.activeClass);
            $('a[href="' + activeSection + '"]')
                .parent().addClass(scrollSpy.config.activeClass);
        }
    };

    // Scroll Animations
    var sparkplugScrollAnimations = new WOW({
        boxClass: 'wow', // animated element css class (default is wow)
        animateClass: 'animated', // animation css class (default is animated)
        offset: 0, // distance to the element when triggering the animation (default is 0)
        mobile: true,  // trigger animations on mobile devices (default is true)
        live: true // act on asynchronously loaded content (default is true)
    });


    // Initializations
    toggleMenu.init();
    activeDialogue.init();
    goodSlideshow.init();
    contentCollapse.init();
    equalHeight.init();
    scrollSpy.init();
    sparkplugScrollAnimations.init();

})(jQuery);