<!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" <?php language_attributes(); ?>> <!--<![endif]-->

<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>" />
	<meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0, user-scalable=no, width=device-width" />
	<title><?php wp_title(''); ?></title>
	<meta http-equiv="content-type" content="<?php bloginfo('html_type') ?>; charset=<?php bloginfo('charset') ?>" />
	
    <link rel="stylesheet" type="text/css" href="<?php bloginfo('stylesheet_url') ?>" />
    <link rel="stylesheet" type="text/css" href="<?php bloginfo('template_url') ?>/css/type.css" />
    <link rel="stylesheet" type="text/css" href="<?php bloginfo('template_url') ?>/css/ps.css" />

	<script src="<?php echo bloginfo('template_url'); ?>/js/libs/modernizr-2.5.3.min.js"></script>
	<!--[if lt IE 9]>
		<script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
	<![endif]-->
    
	<?php wp_head(); ?>    
    
</head>

<body <?php body_class('aller preload'); ?>>

<header class="clearfix">
	<div class="row">
    	<?php if (is_home()) { ?>
        	<h1 class="visuallyhidden">Parsley &amp; Sprouts</h1>
        <?php } else { ?>
        	<h3 class="visuallyhidden">Parsley &amp; Sprouts</h3>
        <?php } ?>
        
        <a id="logo" href="<?php echo home_url(); ?>" rel="home" title="Parsley and Sprouts">
			<img src="<?php echo bloginfo('template_url'); ?>/images/logo.png" title="Parsley and Sprouts" />
    	</a>
        
    	<nav class="monroe">
			<?php wp_nav_menu(); ?>
        </nav>
    </div>    
</header>

<div id="main" role="main" class="clearfix row">

