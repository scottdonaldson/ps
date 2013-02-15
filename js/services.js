$(document).ready(function(){
	
	var rotators = $('.rotators img'),
		active, next;

	rotators.first().fadeIn().addClass('active');

	setInterval(function(){
		active = $('.active');
		active.fadeOut();

		next = active.next().length > 0 ? active.next() : rotators.first();
		setTimeout(function(){
			next.fadeIn().addClass('active').siblings().removeClass('active');
		}, 400);
		
	}, 4000);

});