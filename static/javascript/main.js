var Site = {
	init: function() {
		Site.navigation();
    Site.carousel();
		Site.smoothscroll();
	},
	carousel: function(){
		$('.carousel').slick({
			// autoplay: true,
			// arrows: false,
			dots: true
		});
	},
	navigation: function() {
		// var nav = $('nav');
		// // set the position to fixed
		// nav.css({ position: 'fixed', top: 0, left: 0, right: 0 });
		// // add padding to body element to compensate for fixed nav
		// var navheight = $('#nav').outerHeight()
		// $('body').css({ paddingTop: navheight });

    var $navHeight = $('#header nav').height();
    var $navHeightExpanded = $('#footer nav').height();

    //

    $('#header nav').hover(function(){
      $(this).addClass('hover');
      $(this).removeClass('notoggle');
      $(this).height($navHeightExpanded);

    },function(){
      $(this).removeClass('hover');
      $(this).addClass('notoggle');
      $(this).height($navHeight);

    });

		// toggle mobible menu
		$('.menu-toggle').on('click touchstart', function(event){
      event.preventDefault();

      if ( $('#header nav').hasClass('hover') ) {
        return false;
      }

			$('#header nav').toggleClass('hover notoggle');

      if ( $('#header nav').hasClass('hover') ) {
        $(this).height($navHeightExpanded);
      } else {
        $(this).height($navHeight);
      }
		});


		// add transparent class
    var offset = $(window).scrollTop();
		if ( offset == 0 && $('#hero').length ) {
			// $('#header nav').addClass('transparent');
		}

		$(window).scroll(function(){

      // remove transparency on scroll
      $('#header nav').removeClass('transparent');

      $('#header nav').removeClass('hover');
      $('#header nav').addClass('notoggle');
      $('#header nav').height($navHeight);


			var offset = $(window).scrollTop();

			if ( offset == 0 && $('#hero').length ) {
				// $('nav').addClass('transparent');
			} else {
				// $('nav').removeClass('transparent');
			}

      if ( offset == 0 && $('body').hasClass('index') ) {
        $('nav').addClass('transparent');
      } else {
        $('nav').removeClass('transparent');
      }

      // hide top nav if footer is present
      if ( $('#footer nav').visible() ) {
        $('#header nav').css({ top: '-100px' });
      } else {
        $('#header nav').css({ top: 0 });
      }

		})
	},
  smoothscroll: function() {
    $('a[href*=#]:not([href=#])').click(function() {
      if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
        if (target.length) {
          $('html,body').animate({
            scrollTop: target.offset().top
          }, 1000);
          return false;
        }
      }
    });
  },
  parallax: function() {

    var windowHeight = $(window).height();
    var controller = new ScrollMagic.Controller();

    //

    var top = $('.parallax-top');
    var left = $('.parallax-left');
    var right = $('.parallax-right');
    var bottom = $('.parallax-bottom');

    var tweenTop = function(element){
      return new TweenMax.fromTo( element, 1, { y: -100, ease: Power2.easeOut }, { y: 0 })
    }
    var tweenLeft = function(element){
      return new TweenMax.fromTo( element, 1, { x: -100, ease: Power2.easeOut }, { x: 0 })
    }
    var tweenRight = function(element){
      return new TweenMax.fromTo( element, 1, { x: 100, ease: Power2.easeOut }, { x: 0 })
    }
    var tweenBottom = function(element){
      return new TweenMax.fromTo( element, 1, { y: 100, ease: Power2.easeOut }, { y: 0 })
    }

    var elements = [top,left,right,bottom];
    var tweens = [tweenTop, tweenLeft, tweenRight, tweenBottom];

    $.each(elements, function(index, group){
      $(group).each(function(i, item){
        var scene = new ScrollMagic.Scene({
          duration: windowHeight,
          triggerElement: item,
          triggerHook: 1
        })
        .setTween( tweens[index](item) )
        .addTo(controller)

      });
    })

    // grid sections
    var grid = $('.parallax-grid');

    $.each(grid, function(index, group){

      var tween = new TweenMax.fromTo(group, 1, { y: 100 }, { y: 0 })

      var scene = new ScrollMagic.Scene({
          duration: windowHeight,
          triggerElement: group,
          triggerHook: 1
        })
        .setTween( tween )
        .addTo(controller)
    });

    // grid sections
    var imageGrid = $('#images');

    $.each(imageGrid, function(index, group){
      var items = $(group).find('li');

      $.each(items, function(i, item){

        var tween = new TweenMax.fromTo(item, 1, { opacity: 0 }, { opacity: 1 })

        var scene = new ScrollMagic.Scene({
            duration: windowHeight,
            triggerElement: item,
            triggerHook: 1,
            offset: 50*(i)
          })
          .setTween( tween )
          .addTo(controller)
      })
    });


    // Hero section

    var hero = $('.hero');
    // var row = hero.find('.row')
    // var columns = hero.find('.columns')
    var cell = hero.find('.cell')
    var columns = hero.find('.columns')
    var topbar = $('top-bar.secondary')
    var navbar = $('.sticky')

    var heroTween = new TimelineMax()
      .to( columns, 1, { opacity: 0 })
      .to( cell, 1, { y: 100, delay: 0 }, 0)

    var heroScene = new ScrollMagic.Scene({
      triggerElement: $('.hero'),
      triggerHook: 0,
      duration: windowHeight,
      offset: 0
    })
    .setTween(heroTween)
    .addTo(controller)


  }
}

$(document).ready(function(){
	Site.init();
	$(document).foundation();
});

$(window).on('resize', function(){
  Site.navigation();
});


// $.extend($.lazyLoadXT, {
//   oncomplete: function() {
//     $(document).foundation();
//   }
// });

$(function() {
  $.selz({
      //
      theme: {
        button: {
          bg:             "#5fa9df",
          text:           "#fff"
        },
        checkout: {
          headerBg:       "#333333",
          headerText:     "#fff"
        }
      },
      getTracking: function($link) {
        // return $link.data("tracking");
      },
      onDataReady: function ($link, data) {
        // Customise the link with item data
        // $link.html('<img src="' + data.ImageUrlSmall + '" alt="' + data.Title + '">' + data.Title);
      },
      onModalOpen: function ($link) {
        // Track open in Google Analytics
        // ga('send', 'pageview', $link.attr("href"));
      },
      onPurchase: function (data) {
        // Track purchase
      },
      onProcessing: function (data) {
        // Track processing
      },
      onClose: function ($link, data) {
        // Continue checkout flow
        if(typeof data.modal_url === "string"){
          $link.data("modal-url", data.modal_url);
        }
      }
    });
});
