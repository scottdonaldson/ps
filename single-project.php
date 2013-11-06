<?php get_header(); the_post(); ?>

<article <?php post_class('clearfix'); ?>>

	<section class="entry-content">
    
    	<h1 class="entry-title"><?php the_title(); ?></h1>
        
        <?php the_content(); ?>
        
        <div class="devices">
        	<?php 
				$devices = get_field('devices');
				$image_url = get_bloginfo('template_url').'/images';
			
				if (count($devices) > 1) { // Only show options if more than one device is enabled
					echo '<p><strong>Choose the device:</strong></p>'; 
					foreach ($devices as $device) {
						echo '<img class="'.strtolower($device).'" src="'.$image_url.'/'.strtolower($device).'.png" />';
					};
				} else { // Otherwise there's just one 
					echo '<p class="only-device"><strong>Optimized for:</strong></p>';
					foreach ($devices as $device) {
						echo '<img class="'.strtolower($device).' only-device" src="'.$image_url.'/'.strtolower($device).'.png" style="opacity: 1;" />';
					}
				} ?>
        </div>
        
        <?php if (get_field('site_url')) { ?>
			<a class="visit" href="<?php the_field('site_url'); ?>" target="_blank" onclick="_gaq.push(['_trackEvent', 'Click', 'External Link', '<?php the_title(); ?>']);">Visit the Site</a>
		<?php } ?>
    
    </section>
    
    <section class="gallery clearfix">

        <div class="loading orange monroe">Loading...<span></span></div>
	    
        <?php if (is_single('60')) { // College Park Car Wash ?>
        
        <div id="mobile-carwash" class="rotate">
            <?php $i=1; while ($i<=6) { 
                $mobile_[$i] = get_field('mobile_'.$i);
                if ($mobile_[$i]) {
                    echo '<img src="'.$mobile_[$i].'" class="image-'.$i.'" />';
                }
                $i++; } ?>
        </div>
        
        <?php } else { ?>
        
        <div id="desktop" class="chosen rotate">
			<?php $i=1; while ($i<=6) { 
                $desktop_[$i] = get_field('desktop_'.$i);
                if ($desktop_[$i]) {
                    echo '<img src="'.$desktop_[$i].'" class="image-'.$i.'" />';
                } else { $last = $i; break; }
                $i++; } ?>
		</div>
        
        <div id="tablet" class="rotate">
			<?php $i=1; while ($i<=6) { 
                $tablet_[$i] = get_field('tablet_'.$i);
                if ($tablet_[$i]) {
                    echo '<img src="'.$tablet_[$i].'" class="image-'.$i.'" />';
                }
                $i++; } ?>
        </div>
        
        <div id="mobile" class="rotate">
            <?php $i=1; while ($i<=6) { 
                $mobile_[$i] = get_field('mobile_'.$i);
                if ($mobile_[$i]) {
                    echo '<img src="'.$mobile_[$i].'" class="image-'.$i.'" />';
                }
                $i++; } ?>
        </div>

        <div id="controls" style="display: none;">
            <?php // empty divs for styling and controls for other rotators ?>
            <div class="active"></div>
            <div></div>
            <div class="last"></div>
        </div>

        <?php if (get_field('site_url')) { ?>
            <a class="visit eighthundred" href="<?php the_field('site_url'); ?>" target="_blank" onclick="_gaq.push(['_trackEvent', 'Click', 'External Link', '<?php the_title(); ?>']);">Visit the Site</a>
        <?php } ?>
        
        <?php } ?>
        
	</section>

</article>

<?php get_footer(); ?>