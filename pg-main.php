<?php
/*
Template Name: Main
*/
get_header();
the_post(); ?>

<div class="callout">
	<p>
    	Parsley &amp; Sprouts is a</p><p>two-person</p><p>web design studio</p><p>based</p><p>out of the Twin Cities. We</p><p>build</p><p>websites</p><p>with 
        <a id="design">beautiful&nbsp;design</a>&nbsp;and&nbsp;<a id="code">clean&nbsp;code</a>.
    </p>
</div>
    
<div class="dropdown">
	<div class="design unit">
    	<div class="pointer"></div>
        <strong>Beautiful design</strong> fits your unique brand, enhances your message, and leaves a lasting impression.
        <abbr></abbr>
    </div>  
    <div class="code unit">
        <div class="pointer"></div>
		<strong>Clean code</strong> loads quickly, works on browsers new and old, and is optimized for phones and tablets.
        <abbr></abbr>
   	</div>     
</div>

<div class="clearfix">

	<?php query_posts('post_type=project&posts_per_page=6'); while (have_posts()) : the_post(); ?>
        
        <div class="piece">
        	<a href="<?php the_permalink(); ?>" title="<?php the_title(); ?>">
				<?php the_post_thumbnail(); ?>
                <div class="popup monroe">
                    <h3><?php the_title(); ?></h3>
                </div>
            </a>
        </div>
	<?php endwhile; wp_reset_query(); ?>   

</div>

<?php get_footer(); ?>