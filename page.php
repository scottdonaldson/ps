<?php get_header(); the_post(); ?>

<article <?php post_class(); ?>>

	<?php the_content(); ?>

</article>

<?php get_footer(); ?>