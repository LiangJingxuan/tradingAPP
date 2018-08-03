/*

    Template Name: Plantmore - Responsive Bootstrap 4 eCommerce Template;
    Template URI: http://hastech.company/
    Description: This is Bootstrap4 html5 template
    Author: HasTech
    Author URI: http://hastech.company/
    Version: 1.0

*/

(function ($) {
	"use Strict";
/*---------------------------------
     Mean Menu Active
-----------------------------------*/
jQuery('.header-menu nav').meanmenu({
    meanMenuContainer: '.mobile-menu',
    meanScreenWidth: "991"
})
/*---------------------------
    Mini Cart Hover Active
----------------------------*/
$('.cart-dropdown').hide();
    $('.mini-cart').hover(
      function() {
        if( $(this).children('div').size() > 0 && $(this).children().hasClass('cart-dropdown') ) {
            $(this).children().stop().slideDown(400);
        }
      }, function() {
        $(this).children('.cart-dropdown').stop().slideUp(300);
      }
    );
/*---------------------------------
	 Header Search Toggle Active 
-----------------------------------*/
$( '.search-box > a' ).on('click', function(e) {
    e.preventDefault();
    if($(this).hasClass('active')) {
        $(this).removeClass('active').siblings('.search-dropdown').slideUp();
    } else {
        $(this).addClass('active').siblings('.search-dropdown').slideDown();
    }
});
/*----------------------------
    ** Owl Active **
------------------------------ */
/*----------
     Hero Slider Active
------------------------------*/
$('.hero-slider').owlCarousel({
    smartSpeed: 1000,
    nav: true,
    loop: true,
    animateOut: 'fadeOut',
    animateIn: 'fadeIn',
    autoplay: false,
    navText: ['prev', 'next'],
    responsive: {
        0: {
            items: 1,
            autoplay: true
        },
        600: {
            items: 1
        },
        1000: {
            items: 1
        }
    }
})
/*----------
     Testimonial Active
------------------------------*/
$('.testimonial-active').owlCarousel({
    nav: true,
    loop: true,
    navText: ['prev', 'next'],
    responsive: {
        0: {
            items: 1,
            autoplay: true
        },
        600: {
            items: 1
        },
        1000: {
            items: 1
        }
    }
}) 
/*------- 
     Single Slide Menu Active 
----------------------------------*/
 $('.single-slide-menu').owlCarousel({
        smartSpeed: 1000,
        nav: false,
        responsive: {
            0: {
                items: 3
            },
            450: {
                items: 3
            },
            768: {
                items: 4
            },
            1000: {
                items: 4
            },
            1200: {
                items: 4
            }
        }
    });
$('.modal').on('shown.bs.modal', function (e) {
    $('.single-slide-menu').resize();
})
    
$('.single-slide-menu a').on('click',function(e){
  e.preventDefault();

  var $href = $(this).attr('href');

  $('.single-slide-menu a').removeClass('active');
  $(this).addClass('active');

  $('.product-details-large .tab-pane').removeClass('active show');
  $('.product-details-large '+ $href ).addClass('active show');

})
/*------- 
    Blog Gallery Post Active 
----------------------------------*/
 $('.post-gallery').owlCarousel({
        nav: true,
        autoplay: true,
        autoplayTimeout: 5000,
        navText: ['<i class="fa fa-caret-left"></i>', '<i class="fa fa-caret-right"></i>'],
        responsive: {
            0: {
                items: 1
            },
            450: {
                items: 1
            },
            768: {
                items: 1
            },
            1000: {
                items: 1
            },
            1200: {
                items: 1
            }
        }
    })
/*----------------------------
    ** Slick Slider Active **
------------------------------ */
/*----------
    Product Slider Active
------------------------------*/
$('.product-slider-active').slick({
		slidesToShow: 4,
		arrows: false,
        dots: true,
        infinite: false,
        responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
          }
        }
      ]
});
/*----------
    Store Slider Active
------------------------------*/
$('.store-slider-active').slick({
		slidesToShow: 3,
		arrows: false,
        dots: true,
        infinite: false,
        responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
          }
        }
      ]
});
/*----------
    Product Offer Active
------------------------------*/
$('.product-offer-active').slick({
		slidesToShow: 1,
		arrows: false,
        dots: true,
        infinite: false,
        responsive: [
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 1,
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
          }
        }
      ]
});
/*----------
    Sidebar Product Active
------------------------------*/
$('.sidebar-product-active').slick({
		slidesToShow: 1,
		arrows: false,
        dots: true,
        infinite: false,
        responsive: [
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 1,
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
          }
        }
      ]
});
/*----------
    Indoor Product Active
------------------------------*/
$('.indoor-product-active').slick({
		slidesToShow: 5,
		arrows: false,
        dots: true,
        infinite: false,
        responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
          }
        }
      ]
});
/*----------
    Product List Slider Active
------------------------------*/
$('.product-list-slider-active').slick({
		slidesToShow: 3,
		arrows: false,
        dots: true,
        infinite: false,
        responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2,
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
          }
        }
      ]
});
/*----------
    Product List Slider Active 2
------------------------------*/
$('.product-list-slider-active2').slick({
		slidesToShow: 2,
		arrows: false,
        dots: true,
        infinite: false,
        responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2,
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
          }
        }
      ]
});
/*----------
     Hot Deal Slider Active
------------------------------*/
$('.count-down-area').slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  fade: true,
  asNavFor: '.offer-slider'
});
$('.offer-slider').slick({
  slidesToShow: 3,
  slidesToScroll: 1,
  asNavFor: '.count-down-area',
  dots: true,
  centerMode: true,
  arrows: false,
  infinite: true,
  centerPadding: '0px',
  focusOnSelect: true,
  responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
          }
        }
      ]
});   
/*----------
    Brand Slider Active
------------------------------*/
$('.brand-active').slick({
		slidesToShow: 5,
		arrows: false,
        dots: true,
        infinite: false,
        responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 4,
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 3,
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2,
          }
        }
      ]
});   
/*----------
    Blog Slider Active
------------------------------*/
$('.blog-slider-active').slick({
		slidesToShow: 3,
		arrows: false,
        dots: true,
        infinite: false,
        responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2,
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
          }
        }
      ]
});  
/*----------
    banner Slider Active
------------------------------*/
$('.banner-slider-active').slick({
		slidesToShow: 3,
		arrows: false,
        dots: true,
        infinite: false,
        responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
          }
        }
      ]
});
/*----------
    Blog List Slider Active
------------------------------*/
$('.blog-list-slider-active').slick({
		slidesToShow: 3,
		arrows: false,
        dots: true,
        infinite: false,
        vertical: true,
        responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
          }
        }
      ]
});
/*----------------------------------- 
    Single Product Slide Menu Active 
--------------------------------------*/  
$('.product-tab-menu').slick({
		prevArrow: '<i class="fa fa-angle-left"></i>',
		nextArrow: '<i class="fa fa-angle-right slick-next-btn"></i>',
        slidesToShow: 4,
        responsive: [
            {
              breakpoint: 1200,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3
              }
            },
            {
              breakpoint: 992,
              settings: {
                slidesToShow: 4,
                slidesToScroll: 4
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3
              }
            }
          ]
	});   
$('.product-tab-menu a').on('click',function(e){
      e.preventDefault();
     
      var $href = $(this).attr('href');
     
      $('.product-tab-menu a').removeClass('active');
      $(this).addClass('active');
     
      $('.single-product-img .tab-pane').removeClass('active show');
      $('.single-product-img '+ $href ).addClass('active show');
     
  })
/*----------------------------------- 
    Count Down Active 
----------------------------------*/ 
$('[data-countdown]:not(.pro-countdown1)').each(function() {
	var $this = $(this), finalDate = $(this).data('countdown');
	$this.countdown(finalDate, function(event) {
		$this.html(event.strftime('<div class="single-count"><span>%D</span>Days</div><div class="single-count"><span>%H</span>Hours</div><div class="single-count"><span>%M</span>Mins</div><div class="single-count"><span>%S</span>Secs</div>'));
	});
}); 
/*----------------------------------- 
    Pro Countdown 1 Active 
----------------------------------*/ 
$('[data-countdown].pro-countdown1').each(function() {
	var $this = $(this), finalDate = $(this).data('countdown');
	$this.countdown(finalDate, function(event) {
		$this.html(event.strftime('<div class="single-count-1"><span>%D</span></div><div class="single-count-1"><span>%H</span></div><div class="single-count-1"><span>%M</span></div><div class="single-count-1"><span>%S</span></div>'));
	});
});  
/*--------------------------
    Counter Up
---------------------------- */
    $('.counter').counterUp({
        delay: 70,
        time: 5000
    });
/*----------------------------------
    ScrollUp Active
-----------------------------------*/
$.scrollUp({
    scrollText: '<i class="fa fa-angle-up"></i>',
    easingType: 'linear',
    scrollSpeed: 900,
    animation: 'fade'
});    
/*---------------------------------
     Sticky Menu Active
-----------------------------------*/
$(window).on('scroll', function() {
if ($(this).scrollTop() >50){  
    $('.header-sticky').addClass("is-sticky");
  }
  else{
    $('.header-sticky').removeClass("is-sticky");
  }
});     
/*--------------------------
	 Category Menu Active
---------------------------- */
 $('.rx-parent').on('click', function(){
    $('.rx-child').slideToggle();
    $(this).toggleClass('rx-change');
});
//    category heading
$('.category-heading').on('click', function(){
    $('.category-menu-list').slideToggle(300);
});	

/*-- Category Menu Toggles --*/
function categorySubMenuToggle() {
    var screenSize = $(window).width();
    if ( screenSize <= 991) {
        $('#cate-toggle .right-menu > a').prepend('<i class="expand menu-expand"></i>');
        $('.category-menu .right-menu ul').slideUp();
//        $('.category-menu .menu-item-has-children i').on('click', function(e){
//            e.preventDefault();
//            $(this).toggleClass('expand');
//            $(this).siblings('ul').css('transition', 'none').slideToggle();
//        })
    } else {
        $('.category-menu .right-menu > a i').remove();
        $('.category-menu .right-menu ul').slideDown();
    }
}
categorySubMenuToggle();
$(window).resize(categorySubMenuToggle);

/*-- Category Sub Menu --*/
$('.category-menu-list').on('click', 'li a, li a .menu-expand', function(e) {
    var $a = $(this).hasClass('menu-expand') ? $(this).parent() : $(this);
    if ($a.parent().hasClass('right-menu')) {
        if ($a.attr('href') === '#' || $(this).hasClass('menu-expand')) {
            if ($a.siblings('ul:visible').length > 0) $a.siblings('ul').slideUp();
            else {
                $(this).parents('li').siblings('li').find('ul:visible').slideUp();
                $a.siblings('ul').slideDown();
            }
        }
    }
    if ($(this).hasClass('menu-expand') || $a.attr('href') === '#') {
        e.preventDefault();
        return false;
    }
});
/*--------------------------------
    Price Slider Active
-------------------------------- */
var sliderrange = $('#slider-range');
var amountprice = $('#amount');
$(function() {
    sliderrange.slider({
        range: true,
        min: 20,
        max: 100,
        values: [0, 100],
        slide: function(event, ui) {
            amountprice.val("$" + ui.values[0] + " - $" + ui.values[1]);
        }
    });
    amountprice.val("$" + sliderrange.slider("values", 0) +
        " - $" + sliderrange.slider("values", 1));
});
/*------------------------------ 
    Nice Select Active
---------------------------------*/
$('select').niceSelect();
/*------------------------------ 
    Toggle Function Active
---------------------------------*/   
/*--- showlogin toggle function ----*/
    $('#showlogin').on('click', function() {
        $('#checkout-login').slideToggle(900);
    });

 /*--- showlogin toggle function ----*/
    $('#showcoupon').on('click', function() {
        $('#checkout_coupon').slideToggle(900);
    });
/*--- showlogin toggle function ----*/
    $('#cbox').on('click', function() {
        $('#cbox-info').slideToggle(900);
    });

 /*--- showlogin toggle function ----*/
    $('#ship-box').on('click', function() {
        $('#ship-box-info').slideToggle(1000);
    });
/* --------------------------------------------------------
    FAQ Accordion Active
* -------------------------------------------------------*/ 
  $('.card-header a').on('click', function() {
    $('.card').removeClass('actives');
    $(this).parents('.card').addClass('actives');
  });
/*--------------------------
    Isotope Active
---------------------------- */
$('.protfolio-active').imagesLoaded( function() {
// images have loaded
    // init Isotope
    var $grid = $('.protfolio-active').isotope({
      // options
    });
    // filter items on button click
    $('.protfolio-menu-active').on( 'click', 'li', function(event) {
          event.preventDefault();
      var filterValue = $(this).attr('data-filter');
      $grid.isotope({ filter: filterValue });

          $(this).siblings('.active').removeClass('active');
          $(this).addClass('active');
    });
});  
/* --------------------------------------------------------
    Venobox Active
* -------------------------------------------------------*/  
  $('.venobox').venobox({
        border: '10px',
        titleattr: 'data-title',
        numeratio: true,
        infinigall: true
});
/*----------------------------------
    EasyZoom Active       
------------------------------------*/   
var $easyzoom = $('.easyzoom').easyZoom();     


})(jQuery);