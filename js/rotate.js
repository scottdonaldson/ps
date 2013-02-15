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
		gallery = $('.gallery');
	gallery.height(0.85714 * gallery.width()); // set height to 6/7 of width (proper for images)

		if (mainHeight > gallery.height()) {
			gallery.css({
				'top': (mainHeight - gallery.height())/2 - 45
			});
		}
	
	$(window).resize(function(){
		mainHeight = $('#main').height(),
		gallery.height(0.85714 * $('.gallery').width());
		if (mainHeight > gallery.height()) {
			gallery.css({
				'top': (mainHeight - gallery.height())/2 - 45
			});
		}
	});

	// Auto-rotate
	var rotators = $('.rotate img'),
		active, next, prev;

	var goNext = function(){
		active = $('.rotate .active');
		active.stop().each(function(){
			$this = $(this);
			// Next is the next image, or if we're at the last one, the first
			next = $this.next().length > 0 ? $this.next() : $this.closest('.rotate').find('img, div').first();
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
		active = $('.rotate .active');
		active.stop().each(function(){
			$this = $(this);
			// Prev is the prev image, or if we're at the first one, the last
			prev = $this.prev().length > 0 ? $this.prev() : $this.closest('.rotate').find('img, div').last();
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
		controls = $('#controls').css({
			'left': 0.5 * gallery.width() - 34, // 34 is half of the controls' width
			'top': gallery.height()
		}),
		visit = $('.visit.eighthundred').css({
			'top': gallery.height() + 30
		});
	$(window).resize(function(){
		controls.css({
			'left': 0.5 * gallery.width() - 34,
			'top': gallery.height()
		});
		visit.css({
			'top': gallery.height() + 30
		})
	});

	controls.find('div').click(function(){
		$this = $(this);
		num = $this.index();

		$this.addClass('active').siblings().removeClass('active');

		rotators.each(function(){
			active = $('#desktop .active, #tablet .active, #mobile .active');
			next = $(this).index() == num ? $(this) : undefined;

			// If same index, fade in and hide the active one
			if (next) {
				next.addClass('active').fadeIn().siblings('.active').removeClass('active').fadeOut();
			}
		});
	});

	// Desktop / tablet / mobile
	var devices = $('.devices img'),
		devicesArray = new Array('desktop', 'tablet', 'mobile');
	devices.click(function(){
		$this = $(this);
		num = $this.index() - 1; // minus one for the 'choose:' paragraph

		$this.addClass('active').siblings().removeClass('active');

		for (i=0; i<devicesArray.length; i++) {
			if ($this.hasClass(devicesArray[i])) {
				$('.gallery #'+devicesArray[i]).addClass('chosen').siblings().removeClass('chosen');
			}
		}
	});

});