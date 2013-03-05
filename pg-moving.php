<?php
/*
Template Name: Moving
*/
get_header();
the_post(); 

function helper_js() { ?>
	<script src="<?php echo bloginfo('template_url'); ?>/js/fittext.js"></script>
	<script>
		jQuery(document).ready(function($){
			$('h1').fitText(0.8);
			$('h2').fitText(1.7);

			$('#main').animate({
				'opacity': 1
			}, 300);
		});
	</script>
<?php } 
add_action('wp_footer', 'helper_js');
?>

    <h1 class="orange"><span class="tighten">W</span><span class="tighten less">e</span>’re <span class="tighten less">mo</span>ving!</h1>

    <img class="map" src="<?php echo bloginfo('template_url'); ?>/images/map.png" alt="Parsley and Sprouts is moving from St. Paul, Minnesota, to Washington, DC!"></img>

    <h2 class="orange">Goodbye St. Paul, Hello DC!</h2>
    <h3>We’re relocating to the DC metro area this March and are not taking on new clients right now as we&nbsp;settle&nbsp;in.</h3>
    <h3>But feel free to look around! <a href="<?php echo home_url(); ?>/main">Continue&nbsp;to&nbsp;the&nbsp;homepage.</a></h3>

<?php get_footer(); ?>