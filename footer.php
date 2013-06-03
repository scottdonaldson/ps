</div><!-- #main -->

<footer class="clearfix">

	<a class="footer-icon" href="<?php echo home_url(); ?>" rel="home"></a>

	<div class="row">
		<p class="alignleft">
			<a class="green icon-email" href="mailto:hello@parsleyandsprouts.com">hello@parsleyandsprouts.com</a>
		</p>
		<p class="alignright green">web design + strategy<br /><small>&copy; Parsley &amp; Sprouts, LLC <?php echo date('Y'); ?></small></p>
	</div>
</footer>

	<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js"></script>
	<script>window.jQuery || document.write('<script src="js/libs/jquery-1.10.1.min.js"><\/script>')</script>
    
	<?php if (is_page('about')) { // Load autocomplete script for About page ?>
		<script src="<?php echo bloginfo('template_url'); ?>/js/jquery.autocomplete.js"></script>
	<?php } elseif (is_single()) { // Load rotate script for projects ?>
    	<script src="<?php echo bloginfo('template_url'); ?>/js/rotate.js"></script> 
   	<?php } elseif (is_page('services')) { // Load separate script for services ?>
   		<script src="<?php echo bloginfo('template_url'); ?>/js/services.js"></script> 
   	<?php } ?> 
       
	<script src="<?php echo bloginfo('template_url'); ?>/js/jquery.animate-colors-min.js"></script>
	<script src="<?php echo bloginfo('template_url'); ?>/js/ps.js"></script>

	<script type="text/javascript">

	  var _gaq = _gaq || [];
	  _gaq.push(['_setAccount', 'UA-9215814-8']);
	  _gaq.push(['_trackPageview']);

	  (function() {
	    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
	    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
	    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
	  })();

	</script>

<?php wp_footer(); ?>
</body>

</html>