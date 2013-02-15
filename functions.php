<?php

// Navigation menu
register_nav_menu('primary','Primary Menu');

// Featured images
add_theme_support('post-thumbnails');

// Create Project custom post type
function create_post_type_project() {
	register_post_type( 'project',
		array(
		'labels' => array(
			'name' => __( 'Projects' ),
			'singular name' => __( 'Project' ),
			'add_new_item' => __( 'Add New Project' ),
			'edit_item' => __( 'Edit Project' ),
			'new_item' => __( 'New Project' ),
			'view_item' => __( 'View Project' ),
			'search_items' => __( 'Search Project' ),
			'not_found' => __( 'No projects found' ),
			'not_found_in_trash' => __( 'No projects found in Trash' ),
			),
		'public' => true,
		'menu_position' => 4		
		)
	);
	add_post_type_support( 'project', 'thumbnail' );
}
add_action( 'init', 'create_post_type_project' );

// Add admin CSS
function ps_admin_stuff() {
	$template_url = get_bloginfo('template_url');
	echo '<link rel="stylesheet" href="'.$template_url.'/css/admin-style.css" />';
}
add_action('admin_head', 'ps_admin_stuff');

?>