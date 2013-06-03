<?php
/*
Template Name: About
*/
get_header();
the_post(); ?>

<article <?php post_class(); ?>>

	<h1 class="entry-title visuallyhidden"><?php the_title(); ?></h1>

    <div class="callout">
        <p>We're two people wearing&nbsp;many&nbsp;hats.
        </p>
    </div>
    
    <div class="about-above clearfix">
	    <img class="alignleft" src="<?php echo bloginfo('template_url'); ?>/images/about.png" />
        <div class="about-content">
	    	<p>When we realized that our varied skills complemented each other and that we could do better and more interesting work together, we founded Parsley &amp; Sprouts*. Although our tastes may vary — one of us likes tea and the other coffee — we both like good honest web design.</p>
            <p><small><em>* The name Parsley &amp; Sprouts was inspired by our other passion, house rabbits and their favorite&nbsp;foods.</em></small></p>
    	</div>
    </div>
    
    <div class="clearfix" style="clear: both; position: relative;">
    
    	<section id="scott" class="clearfix">
        	<img class="alignleft" src="<?php echo bloginfo('template_url'); ?>/images/scott.jpg" />
            <hgroup>
	            <h2 class="aller">Scott Donaldson</h2>
    			<h3 class="aller">Web Development | Copywriting</h3>
            </hgroup>
            <p>Scott specializes in front-end development, building websites that are easily manageable by non-technical users. As a former studio art and almost math major, he considers himself both a left- and right-brained thinker.</p>
            <p><a href="mailto:scott@parsleyandsprouts.com">scott@parsleyandsprouts.com</a></p>
        </section>
        
        <section id="lisa" class="clearfix">
        	<img class="alignleft" src="<?php echo bloginfo('template_url'); ?>/images/lisa.jpg" />
        	<hgroup>
            	<h2 class="aller">Lisa Otto</h2>
                <h3 class="aller">Design | User Experience</h3>
            </hgroup>
            <p>Lisa ensures that all the visual details add up to the big picture. She brings sound strategy and insight to the creative process. An avid filmgoer, she enjoys films with ambiguous endings.</p>
            <p><a href="mailto:lisa@parsleyandsprouts.com">lisa@parsleyandsprouts.com</a></p>
        </section>
    
        <div id="minnesota" class="clearfix">
            <img src="<?php echo bloginfo('template_url'); ?>/images/ribbon-map.png" />
            
            <h3>We've moved! We're now based in Washington D.C., but work with clients across the country.</h3>
            
            <label>Where can we find you?</label>
            <input type="text" placeholder="Type your city and state" />
            
            <div class="results">
            
            </div>
            
        </div>
    
    </div>
    
</article>    

<?php get_footer(); ?>