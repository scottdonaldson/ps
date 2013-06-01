$(window).load(function(){
	
	$('.loading').hide();
	
	var desktop = $('#desktop'),
		tablet = $('#tablet'),
		mobile = $('#mobile'),
		desktopImg = $('img.desktop').addClass('active'),
		tabletImg = $('img.tablet'),
		mobileImg = $('img.mobile');

	desktop.find('img').first().addClass('active').fadeIn();	// Within desktop / mobile / tablet,
	tablet.find('img').first().addClass('active').fadeIn();		// get the first image, call it active,
	mobile.find('img').first().addClass('active').fadeIn();		// and fade in

	// Center images vertically in space
	var mainHeight = $('#main').height(),
		gallery = $('.gallery'),
		galHeight;

	function centerGallery() {
		// if window larger than 600px, 
		// set height to 6/7 of width (proper for images).
		// otherwise 1.25 * width (since tablet/mobile get larger)
		galHeight = $(window).width() > 600 ? 0.85714 * gallery.width() : 1.25 * gallery.width();
		gallery.height(galHeight);
		if (mainHeight > gallery.height()) {
			gallery.css({
				'top': (mainHeight - gallery.height())/2 - 45
			});
		}
	}
	centerGallery();
	$(window).resize(centerGallery);

	// Auto-rotate
	var rotators = $('.rotate img'),
		active, next, prev;

	var goNext = function(){
		active = $('.rotate .active, #controls .active');
		active.stop().each(function(){
			$this = $(this);
			// Next is the next image, or if we're at the last one, the first
			next = $this.next().length ? $this.next() : $this.parent().find('img, div').first();
			// Make this one inactive and the next one active
			if ($this.parent().attr('id') == 'controls') {
				$this.removeClass('active');
				next.addClass('active');
			} else {
				$this.removeClass('active').fadeOut(); // want to fade out and in images
				next.addClass('active').fadeIn();	   // but not the controls
			}
		});
	}

	var rotate = setInterval(function(){
		goNext();
	}, 4000);

	var goPrev = function(){
		active = $('.rotate .active, #controls .active');
		active.stop().each(function(){
			$this = $(this);
			// Prev is the prev image, or if we're at the first one, the last
			prev = $this.prev().length ? $this.prev() : $this.parent().find('img, div').last();
			// Make this one inactive and the prev one active
			if ($this.parent().attr('id') == 'controls') {
				$this.removeClass('active');
				prev.addClass('active');
			} else {
				$this.removeClass('active').fadeOut();
				prev.addClass('active').fadeIn();
			}
		});
	}
	// Arrow key navigation
	$(document).keydown(function(e) {
		if (e.keyCode == 39) { 
			goNext();
		} else if (e.keyCode == 37) { 
			goPrev();
		}
	});

	// Controls
	var num,
		controls = $('#controls'),
		visit = $('.visit.eighthundred');
	function posControls() {
		controls.css({
			'left': 0.5 * gallery.width() - 34 // 34 is half of the controls' width
		}),
		visit = $('.visit.eighthundred').css({
			'top': gallery.height() + 30
		});
	}
	posControls();
	$(window).resize(posControls);

	controls.find('div').click(function(){
		$this = $(this);
		num = $this.index();

		$this.addClass('active').siblings().removeClass('active');

		rotators.each(function(){
			active = $('#desktop .active, #tablet .active, #mobile .active');
			next = $(this).index() == num ? $(this) : false;

			// If same index, fade in and hide the active one
			if (next) next.addClass('active').fadeIn().siblings('.active').removeClass('active').fadeOut();
		});
	});

	// Desktop / tablet / mobile
	var devices = $('.devices img'),
		devicesArray = ['desktop', 'tablet', 'mobile'];
	devices.click(function(){
		$this = $(this);
		num = $this.index() - 1; // minus one for the 'choose:' paragraph

		$this.addClass('active').siblings().removeClass('active');
		
		// Choose the images for this one and unchoose the others
		$('.gallery #' + devicesArray[num]).addClass('chosen').siblings().removeClass('chosen');
	});

});