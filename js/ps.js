$(document).ready(function(){
	
	var body = $('body'),
		main = $('#main');
	
	var navItem = $('header .menu a'),
		dropdown = $('.dropdown'),
		design = $('#design'),
		code = $('#code');	
	
	// Explanation bubbles to appear below callout text
	$('#design, #code').mouseover(function(){
		var $this = $(this),
			id = $this.attr('id'),
			explo = $('div.'+id),
			pointer = explo.find('.pointer');
	
		// Set dropdown height equal to explo height
		var cHeight = explo.outerHeight(),
			cPosition = $this.position();
		dropdown.height(cHeight+60);
		
		// Give our explo 'shown' class. If other explo is shown, hide it.
		explo.addClass('shown');
		$('.shown').css({
			'top': -500
		});
			
		// Do some work on the horizontal position of the explanation bubble - right and left
		var rPosit = dropdown.width()-cPosition.left-.5*explo.width()-.5*$this.width(),
			lPosit = dropdown.width()-explo.outerWidth()-rPosit;
		if (rPosit > 0 && lPosit > 0) { // Are both right and left positions greater than 0?
			explo.css({
				'right': dropdown.width()-cPosition.left-.5*explo.width()-.5*$this.width(),
				'top': 0
			});
			pointer.css({
				'left': '50%',
				'top': -50
			});
		} else if (lPosit < 0) { // Or is left position less than 0?
			explo.css({
				'left': 0,
				'top': 0
			});
			pointer.css({
				'left': '50%',
				'top': -50
			});
		} else { // Or is right position less than 0?
			explo.css({
				'right': 0,
				'top': 0
			});
			pointer.css({
				'left': explo.width()-.5*$this.width(),
				'top': -50
			});
		};
	}).mouseleave(function(){
		dropdown.height(20);
		$('div.'+$(this).attr('id')).closest('.unit').css({
			'top': -500
		});
	});
	
	// Make sure bubbles stay underneath on window resizes
	$(window).resize(function(){
		if (body.hasClass('page-template-pg-main-php')) { // Only do this on home page
			// Annoying, but have to do code and design separately.
			var codePosition = code.position(),
				codeExplo = $('.code'),
				codePointer = codeExplo.find('.pointer'),
				designPosition = design.position(),
				designExplo = $('.design'),
				designPointer = designExplo.find('.pointer');
			// Calculate the positions of the explanation bubbles from the left and right	
			var rCodePosit = dropdown.width()-codePosition.left-.5*codeExplo.width()-.5*code.width(),
				lCodePosit = dropdown.width()-codeExplo.outerWidth()-rCodePosit,
				rDesignPosit = dropdown.width()-designPosition.left-.5*designExplo.width()-.5*design.width(),
				lDesignPosit = dropdown.width()-designExplo.outerWidth()-rDesignPosit;
			if (rCodePosit > 0 && lCodePosit > 0) {
				codeExplo.css({
					'left': 'auto',
					'right': dropdown.width()-codePosition.left-.5*codeExplo.width()-.5*code.width()
				});
				codePointer.css({
					'left': '50%'
				});
			} else if (lCodePosit < 0) {
				codeExplo.css({
					'left': 0,
					'right': 'auto'
				});
				codePointer.css({
					'left': '50%'
				});
			} else {
				codeExplo.css({
					'left': 'auto',
					'right': 0
				});
				codePointer.css({
					'left': codeExplo.width()-.5*code.width()
				});
			};
			if (rDesignPosit > 0 && lDesignPosit > 0) {
				designExplo.css({
					'left': 'auto',
					'right': dropdown.width()-designPosition.left-.5*designExplo.width()-.5*design.width()
				});
				designPointer.css({
					'left': '50%'
				});
			} else if (lDesignPosit < 0) {
				designExplo.css({
					'left': 0,
					'right': 'auto'
				});
				designPointer.css({
					'left': '50%'
				});
			} else { 
				designExplo.css({
					'left': 'auto',
					'right': 0
				});
				designPointer.css({
					'left': designExplo.width()-.5*design.width()
				});
			};
		}
	});
	
	// Add 'X' to close explanation bubble
	$('.design, .code').append('<div class="close">&times;</div>');
	$('.close').on('click',function(){
		dropdown.height(20);
		$(this).closest('.unit').css({
			'top': -500
		});
	});

	// Strikethrough text
	var s = $('s');
	$('s').append('<span class="stricken"></span>');
	var stricken = $('.stricken');
	function sizeStricken() {
		$('.stricken').css({
			top: 0.5 * s.height() - 1,
			width: s.width()
		});
	}
	sizeStricken();
	$(window).on('load resize', sizeStricken);

	// Projects on main page
	var piece = $('.no-touch .piece'),
		featImg = piece.find('img');

	piece.each(function(){ // margin right and clearing hack for IE8 and below
		var $this = $(this);
		if ($this.index()%3 == 2) {
			$this.addClass('n-3-b');
		}
		if ($this.index()%3 == 0) {
			$this.addClass('n-3');
		}
		if ($this.index()%2 == 1) {
			$this.addClass('n-2-b');
		}
		if ($this.index()%2 == 0) {
			$this.addClass('n-2');
		}
	})
		
	// Set height of div.piece equal to featured image (and on resizes)
	if (!$('html').hasClass('ie7')) {
		piece.mouseover(function(){
			$(this).find('.popup').css({
				'top': -featImg.height()-5
			});
		}).mouseleave(function(){
			$(this).find('.popup').css({
				'top': -8
			});
		});
	}

	// Center stuff on main page if the window is too tall
	var bodyHeight = body.height();
	$.fn.extend({
		centerMe: function(){
			if (body.hasClass('home') && $(window).height() > 1000) {
				main = $(this);
				/* 690: height of #main
				   120: padding/margin on #main
				   150: height of header
				   108: height of footer 
				*/
				main.css('margin-top', ($(window).height() - 690 - 120 - 150 - 108)/2 );
			}
			$(window).resize(function() {
				if (body.hasClass('home') && $(window).height() > 1000) {
					main.css('margin-top', ($(window).height() - 690 - 120 - 150 - 108)/2 );
				} else {
					main.css('margin-top', 0);
				}
			});
		}
	});
	main.centerMe();
	
	// ----- Services
	var service = $('#services h3');

	service.last().closest('.service').addClass('n-3');
	
	service.on('click',function(){
		var $this = $(this);
		
		$this.find('span').toggleClass('icon-plus').toggleClass('icon-minus');
		$this.next('p').slideToggle();
	});
	
	function toRad(Value) {
		/** Converts numeric degrees to radians */
		return Value * Math.PI / 180;
	}

	// Location
	var results = $('.results');
	results.hide();
	
	if (body.hasClass('page-template-pg-about-php')) {
		$("#minnesota input").autocomplete("http://ws.geonames.org/searchJSON", {		
			// latitude/longitude of P&S prior to move: (44.949316,-93.086241)
			// In DC: (38.9097, -77.0231)
			dataType: 'jsonp',
			parse: function(data) {
				var rows = new Array();
				data = data.geonames;
				for(var i=0; i<data.length; i++){
					rows[i] = { 
						data: data[i], 
						value: data[i].name, 
						lat: data[i].lat,
						lng: data[i].lng,
						result: data[i].name+', '+data[i].adminCode1
					}
				}
				return rows;
			},
			formatItem: function(row, i, n) {
				return row.name + ', ' + row.adminCode1;
			},
			extraParams: {
				// geonames doesn't support q and limit, which are the autocomplete plugin defaults, so let's blank them out.
				q: '',
				limit: '',
				country: 'US',
				featureClass: 'P',
				style: 'full',
				maxRows: 5,
				name_startsWith: function () { return $("#minnesota input").val() }
			},
			max: 5
		}).result(function(event, data, formatted) {
			results.hide();

	
			var R = 3959; // mi
			var dLat = (parseFloat(data.lat) - 38.9097) * Math.PI/180;
			var dLon = (parseFloat(data.lng) + 77.0231) * Math.PI/180;
			var lat1 = 38.9097 * Math.PI / 180;
			var lat2 = parseFloat(data.lat) * Math.PI / 180;
			
			var a = ( Math.sin(0.5 * dLat) * Math.sin(0.5 * dLat) ) + 
					( Math.sin(0.5 * dLon) * Math.sin(0.5 * dLon) * Math.cos(lat1) * Math.cos(lat2) ); 
			var c = 2 * Math.atan2( Math.sqrt(a), Math.sqrt(1 - a) ); 
			var d = Math.ceil(R * c);
			
			if ( d < 10 ) {
				results.html("You're practically in our backyard! Ready to <a href='contact'>get started</a>?");
			} else if ( d > 9 && d < 100 ) {
				results.html("You're <span class='monroe orange'>" + d + "</span> miles away &mdash; as the crow flies! Ready to <a href='contact'>get started</a>?");
			} else if ( d > 100 && d < 350 ) {
				results.html("You're <span class='monroe orange'>" + d + "</span> miles from Washington D.C. &mdash; but only a quick email or phone call away. Ready to <a href='contact'>get started</a>?");
			} else {
				results.html("You're a whopping <span class='monroe orange'>" + d + "</span> miles from Washington D.C. &mdash; but just a short email or phone call away. Ready to <a href='contact'>get started</a>?");
			}
			results.fadeIn();
		});
	}

	body.removeClass('preload');
});

$(window).load(function(){

	// fade in the callout
	$('.callout').animate({
		opacity: 1
	}, 250);

	var body = $('body'),
		main = $('#main');
	
	// Contact form
	$('.contact-form').submit(function(){
		$(this).find('input[type="submit"]').fadeOut();
	});

});