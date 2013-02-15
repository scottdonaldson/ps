<?php
/* 
Template Name: Services
*/
get_header();
the_post(); ?>

<article <?php post_class(); ?>>

	<h1 class="entry-title visuallyhidden"><?php the_title(); ?></h1>

    <div class="callout">
        <p>We create for the</p><p>web</p><p>with the</p><p>big</p><p>picture&nbsp;in</p><p>mind.
        </p>
    </div>
    
    <div class="services-above">
        <div class="rotators">
            <img src="<?php bloginfo('template_url'); ?>/images/services1.png" />
            <img src="<?php bloginfo('template_url'); ?>/images/services2.png" />
            <img src="<?php bloginfo('template_url'); ?>/images/services3.png" />
        </div>
        
        <p>We understand the value of developing a relationship with you so that we can get to know and build your brand. We are firm believers in being open and honest about the design and development process, which we know can be obscure. We work hard, provide creative and intelligent solutions, and will always be up-front about what you're really getting. Here are the services we can provide:</p>
    </div>
    
    
    <section id="services" class="clearfix">
    	<div class="service">
        	<h3>Plan <span class="icon-plus"></span></h3>
            <p>Every project we take on begins with a conversation to determine goals and needs. From market research and your objectives, we develop a strategy that suits your project and your audience.</p>
            <ul>
            	<li>Information Architecture</li>
				<li>Content Strategy</li>
				<li>Marketing Strategy</li>
				<li>Domain &amp; Hosting</li>
            </ul>
        </div>
        
        <div class="service">
        	<h3>Create <span class="icon-plus"></span></h3>
            <p>When we look at the creative process, we determine what will work best for your message and last in the long haul. Our strength is in our understanding of the interactive and dynamic nature of the web.</p>
            <ul>
            	<li>User Interface Design</li>
				<li>Layout</li>
				<li>Copywriting</li>
            </ul>
        </div>
        
        <div class="service">
        	<h3>Develop <span class="icon-plus"></span></h3>
            <p>All sites we develop function well across browsers and on mobile devices. We customize WordPress to allow you to easily update your site.</p>
            <ul>
            	<li>Web Standards-Compliant Site Coding</li>
				<li>CMS Set-Up &amp; Customization</li>
				<li>Search Engine Optimization</li>
			</ul>
        </div>

    </section>

    <div class="bar"></div>
    
    <div class="callout secondary">
    	<p>We know you're thinking them.<br />Here are a</p><p>few <span class="orange">frequently asked questions</span> about how we work.</p>
    </div>

    <div class="bar"></div>
    
    <section id="faq" class="clearfix">
        <div class="left">
            <h3>What do you <span class="orange">charge</span>?</h3>
            <p>We understand working within a budget and we provide flexible and competitive rates. We charge by project rather than hourly so we can focus on what the project needs rather than how much time is left on the clock. And of course, estimates are always free.</p>
        </div>
        
        <div class="right">
            <h3>How does the <span class="orange">process</span> work?</h3>
            <p>The process is different for each project but typically starts with a lengthy sit down (or phone call) to discuss project needs and goals. We lay out a strategy and timeline that meets your project's scope. As we move along the process, we meet with you regularly to review progress and share feedback. Before launch we make sure your site is 100% ready for the web.</p>
        </div>
    </section>
    
</article>    

<?php get_footer(); ?>