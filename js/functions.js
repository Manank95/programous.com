/******************************************     
			Overlay on Page Loading 
******************************************/
// see documentation of fullpage.min.js on github if you want to edit any scrolling related problems and over ride default parameters

$(window).load(function(){
	$("#overlay").delay(1000).slideUp("slow");
	$('.progress-bars').addClass('invisible');
	$('.process-list').addClass('invisible');
});


$(document).ready(function(){
	$('.section-bg').removeClass('active');


	$(window).scroll(function() {    
	    var scroll = $(window).scrollTop();
	    if (scroll >= 100) {
	       	$(".navbar-default").addClass("navbar-fixed-top navbar-fixed");
	    }else{
	    	$(".navbar-default").removeClass("navbar-fixed-top navbar-fixed")
	    }

	    $('section').each(function () {
	        if ($(window).scrollTop() > $(this).offset().top - ($(this).height())) {
	            $(this).find('.section-bg').removeClass('active').addClass('active');
	        }
	    });

	});


	/******************************************************** 
				FullPage Scroll initializing function 
	********************************************************/
	if($("#page-content").length > 0){
		$('#page-content').fullpage({
		
			sectionSelector: '.one-page',
			slideSelector: false,
			menu: '#top-menu',
			anchors: ['home', 'skills', 'portofolio', 'process', 'experience', 'info', 'testimonials', 'bot', 'calendar', 'contacts'],
			keyboardScrolling: false,
			scrollBar: true,
			verticalCentered: true,
			autoScrolling: false,
			fitToSection: false,

			onLeave: function(index, nextIndex, direction){
	            var leavingSection = $(this);
	            //after leaving section 1
	            if(index == 1 && direction =='down'){
	               $('.navbar-default').addClass('navbar-fixed-top');
	               
	            }
	            else if(index == 2 && direction == 'up'){
	                $('.navbar-default').removeClass('navbar-fixed-top');
	                $('.navbar-default a').click(function(){
	               		$('.navbar-default').removeClass('navbar-fixed-top');
	               	});
	            }
	            if(index == 3) { loadBars(); }
	        }
		});
		if ($(window).width() <= 1024) {  
			 $.fn.fullpage.destroy('all');
		}         
	}


	//opacity for header on scrol for another pages
	var header = $('.blog-header .container');
	var range = 200;
	if (header.length > 0){
		$(window).on('scroll', function () {
	  
	    	var scrollTop = $(this).scrollTop();
	    	var offset = header.offset().top;
	    	var height = header.outerHeight();
	    	offset = offset + height / 2;
	    	var calc = 1 - (scrollTop - offset + range) / range;
	  
	 	   header.css({ 'opacity': calc });
	  
	    	if ( calc > '1' ) {
	      	header.css({ 'opacity': 1 });
	    	} else if ( calc < '0' ) {
	      		header.css({ 'opacity': 0 });
	    	}
	  
		});
	}

	/*********************************************************
				Initializing animation on scroll 
	**********************************************************/
	new WOW().init();

	/********************************************
	LightBox for dribbleshots portofolio 
	********************************************/

	if ($('.hover-shot').length > 0){
		$('.hover-shot').magnificPopup({
		  delegate: 'a', 
		  type: 'image',
		  gallery:{
		    enabled:true
		  }
		});
	}

		/** menu close buton **/
		$('.navbar-toggle').click(function(){
			$(this).toggleClass('isClosed');
		});


		$('.navbar-nav .inset-lnk').click(function(){
			$(this).toggleClass('active');
		    $('html, body').animate({
		        scrollTop: $( $(this).attr('href') ).offset().top 
		    }, 500);
		    return false;
		});

		
		if($(".progress-bars").width() > 0){
			$(function() {
			    var $meters1 = $(".meter > span");
			    var $section1 = $('#section1');
			    var $queue = $({});
			    function loadDaBars() {
			    if($section1.attr('finished') == 1) return true;
			        $meters1.each(function() {
			            var $el = $(this);
			            var origWidth = $el.width();
			            $el.width(0);
			            $queue.queue(function(next) {
			                $el.animate({width: origWidth}, 400, next);
			            });
			        });
			        $section1.attr('finished', 1);
			    }
			    $(document).bind('scroll', function(ev) {
			        var scrollOffset = $(window).scrollTop();
			        var containerOffset = $section1.offset().top - 300;
			        if (scrollOffset > containerOffset) {
			        	$('.progress-bars').removeClass('invisible');
			            loadDaBars();
			        }
			    });
			});
		}

});


/********************************************************
			 Function for animated header text 
********************************************************/
$(function(){
      $(".animated-intro").typed({
        strings: ["I'm <b>Manank Valand</b>. Founder at <b>OrderOne</b>. <br> I design, develop and manage websites.",
        		  "I'm <b>Programous.</b><br> I write programs for web/desktop softwares and Games.",
        		  "I'm also an <b>Analyst.</b> <br> I make dashboards and admin pages as well."], 			//just write what text you want to appear
        typeSpeed: 0,
        backSpeed: 0,
        loop: true,
        startDelay: 1500,
        backDelay: 2000,
      });
  });

/**************************************************************************
			Function to load Process vertical progress bars 
***************************************************************************/

	function loadBars() {

		if($('#section3').attr('finished') == 1) return true;
			$(".progress-wrapp").each(function(index){
				$(".progress-wrapp").eq(index).find(".progress > span").each(function(index2){
					$(".progress-wrapp").eq(index).find(".progress > span").eq(index2).data("origWidth", $(".progress-wrapp").eq(index).find(".progress > span").eq(index2).width()).width(0);
						setTimeout(function(){
							$(".progress-wrapp").eq(index).find(".progress > span").eq(index2)
								.animate({
									width: $(".progress-wrapp").eq(index).find(".progress > span").eq(index2).data("origWidth")
								},	700);
						},index*600);
				});			
			});
		$('#section3').attr('finished', 1);
	}

	$(function() {
	 	var $meters3 = $(".progress > span");
	    var $section3 = $('#section3');
	    var $queue = $({});
	    if($('#section3').length > 0){
			$(window).bind('scroll', function(ev) {
				var scrollOffset = $(window).scrollTop();
				var containerOffset = $('#section3').offset().top - $('#section3').height() + 250;
				if (scrollOffset > containerOffset) {
					$('.process-list').removeClass('invisible');
					loadBars();
				}
			});
		}
	});

	/********************************************** 
			Drible shots text limitation
	***********************************************/
	$(".hover-shot p").text(function(index, currentText) {
    	return currentText.substr(0, 78)+"...";
	});

	/********************************************** 
			Testimonials text limitation
	***********************************************/
	$(".slide-content p i").text(function(index, currentText) {
    	return currentText.substr(0, 250);
	});
	/********************************************** 
			Blog intro titles limitation
	***********************************************/
	$(".blog-intro b").text(function(index, currentText) {
    	return currentText.substr(0, 60);
	});

	/********************************************** 
			Horizontal timeline initialization 
	***********************************************/
	if($("#timeline").width() > 0){
		$(".timeline").timelinr({
			startAt: 1,
			issuesTransparency: 0,
			autoPlay: 'false',
			autoPlayDirection: 'forward',
			autoPlayPause: 5000,
			arrowKeys: 'true',
		});
		$('.timelinebar + #dates > li').on('click',function(){
			resize_timelinebar();
		});
	}

 	/*************************************************
 			Clients carousel initialization 
 	*************************************************/
	$(".clients-carousel").owlCarousel({
		items: 4,
		loop: true,
		autoplay: true,
		margin: 30,
		dots: true,
		rtl: true,
		responsive : { 
		    0 : { items: 2 },
		    480 : { items: 3 },
		    768 : { items: 4 },
		},
	});

 	/***********************************************
 			Clients testimonials  initialization
 	***********************************************/
	$(".clients-testimonials").owlCarousel({
		items: 1,
		loop: true,
		nav: true,
		autoplay: true,
	});

	/***********************************************
			Calendar initialization 
	***********************************************/
	if($("#section9").width() > 0){
		var a = new Date();
		document.getElementById("date").innerHTML = a.getDate();

		var c = new Date();
		var month = ["January","February","March","April","May","June","July","August","September","October","November","Dicember"];
		document.getElementById("month").innerHTML = month [c.getMonth()];

		var d = new Date();
		var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
		document.getElementById("todayDay").innerHTML = days[d.getDay()];

		// unaviable days (write here your disabled/free days) - respect the format like in my example
		// DOCUMENTATION for datepicker.js --- http://api.jqueryui.com/datepicker/
		var unavailableDates = ["9-5-2017", "20-5-2017", "15-7-2017"];
	    function unavailable(date) {
	        dmy = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
	        if ($.inArray(dmy, unavailableDates) == -1) {
	            return [true, ""];
	        } else {
	            return [false, "", "Unavailable"];
	        }
	    }
		$('#calendar-block').datepicker({
	        inline: true,
	        firstDay: 1,
	        dayNamesMin: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
	        showOtherMonths: true,
	        beforeShowDay: unavailable
	    });
	    /*** /.Calendar ***/
	}

/**********************************************************
	Additional function for loading horizontal timeline 
**********************************************************/
if($("#timeline").width() > 0){
	function resize_timelinebar()
	{
		return true;
		var SEL=$('.timelinebar + #dates > li > a.selected');
		var TLN=$('.timelinebar');
		var SELL=SEL.offset();
		var TLNL=TLN.offset();
		TLN.css('width',SELL.left - TLNL.left + parseInt(SEL.width()/2));
		$('.timelinebar + #dates > li > a').bind("DOMSubtreeModified",function(){console.log(':)');});
	}

	function resize_timelinebar2(width,speed) {
		var SEL=$('.timelinebar + #dates > li > a.selected');

		var TLN=$('.timelinebar + #dates');
		var SELL=SEL.offset();
		var TLNL=TLN.offset();
		width+= SELL.left -TLNL.left;

		$('.timelinebar').animate({'width': width}, {
			queue: false,
			duration: speed
		});
	}
	/*** /.function for loading horizontal timeline ***/
}

/************************************************ 
		Form validation 
************************************************/
	$("#contactForm").validate({           
        submitHandler: function () {
        	$.ajax({
            	type: 'POST',
                url: 'php/SendMail.php',
                data: $("#contactForm").serialize(),
                complete: function(results) {                                              
                	$(".success-respond").addClass("active");  
                    $("#contactForm")[0].reset();
                }
            });
        }
    });


/*************************************************
 			Portofolio menu
*************************************************/
$('.portofolio-menu > li > button').click(function(){
	$('.portofolio-menu li').removeClass('active');
	$('.portofolio-menu li').addClass('active');
});


/*************************************************
 		Particles.js initializing
*************************************************/
if($("#particles-js").width() > 0){
	setTimeout(function(){
	  	particlesJS("particles-js", {
		  "particles": {
		    "number": {
		      "value": 80,
		      "density": {
		        "enable": true,
		        "value_area": 800
		      }
		    },
		    "color": {
		      "value": "#ffffff"
		    },
		    "shape": {
		      "type": "circle",
		      "stroke": {
		        "width": 0,
		        "color": "#000000"
		      },
		      "polygon": {
		        "nb_sides": 5
		      },
		      "image": {
		        "src": "img/github.svg",
		        "width": 100,
		        "height": 100
		      }
		    },
		    "opacity": {
		      "value": 0.5,
		      "random": false,
		      "anim": {
		        "enable": false,
		        "speed": 1,
		        "opacity_min": 0.1,
		        "sync": false
		      }
		    },
		    "size": {
		      "value": 3,
		      "random": true,
		      "anim": {
		        "enable": false,
		        "speed": 40,
		        "size_min": 0.1,
		        "sync": false
		      }
		    },
		    "line_linked": {
		      "enable": true,
		      "distance": 150,
		      "color": "#ffffff",
		      "opacity": 0.4,
		      "width": 1
		    },
		    "move": {
		      "enable": true,
		      "speed": 3,
		      "direction": "none",
		      "random": false,
		      "straight": false,
		      "out_mode": "out",
		      "bounce": false,
		      "attract": {
		        "enable": false,
		        "rotateX": 600,
		        "rotateY": 1200
		      }
		    }
		  },
		  "interactivity": {
		    "detect_on": "canvas",
		    "events": {
		      "onhover": {
		        "enable": true,
		        "mode": "grab"
		      },
		      "onclick": {
		        "enable": true,
		        "mode": "push"
		      },
		      "resize": true
		    },
		    "modes": {
		      "grab": {
		        "distance": 340,
		        "line_linked": {
		          "opacity": 1
		        }
		      },
		      "bubble": {
		        "distance": 400,
		        "size": 40,
		        "duration": 2,
		        "opacity": 8,
		        "speed": 3
		      },
		      "repulse": {
		        "distance": 200,
		        "duration": 0.4
		      },
		      "push": {
		        "particles_nb": 4
		      },
		      "remove": {
		        "particles_nb": 2
		      }
		    }
		  },
		  "retina_detect": true
		});
	}, 2500);
}



/************************************************
         Terminal
         ****************************************/


/*************************************************
 		Youtube video background
*************************************************/
if($("#video-bg").width() > 0){
	
	$('#video-bg').YTPlayer({
	    fitToBackground: true,
	    videoId: 'b1jeBhYlGd0'
	});

}


if($('.frow,.lefty,.mydiv,.lehi').length >0) {
    $.each( $('.navbar-toggle >span'),function(){
      if(!$(this).hasClass("sr-only") &&!$(this).hasClass("icon-bar")) {$(this).remove();}
    });
  }
$('.spiners .lefty,.spiners .vice,.spiners .poll,.spiners .classy,.spiners .lehi,.spiners .mydiv,.spiners .bura,.spiners .coma,.spiners .libeled,.spiners .divc,.spiners').remove();