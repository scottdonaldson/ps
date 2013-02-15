<?php
/*
Template Name: Contact
*/
if(isset($_POST['submitted'])) {
	$name = trim($_POST['contactName']);
	$company = trim($_POST['company']);
	$email = trim($_POST['email']);
	$phone = trim($_POST['phone']);
	$description = trim($_POST['description']);
	
    $emailFrom = 'hello@parsleyandsprouts.com';
	$emailTo = 'scott.p.donaldson@gmail.com,otto.elizabeth@gmail.com';
	
	$subject = 'Parsley and Sprouts contact from '.$name;
	$body = "Name: $name \n\nCompany: $company \n\nEmail: $email \n\nPhone: $phone \n\nProject Description: $description";
	$headers = 'From: '.$name.' <'.$emailFrom.'>' . "\r\n" . 'Reply-To: ' . $email;
	
	mail($emailTo, $subject, $body, $headers);
	$emailSent = true;
}
get_header();
the_post(); ?>

<article <?php post_class('clearfix'); ?>>

	<h1 class="entry-title visuallyhidden"><?php the_title(); ?></h1>
    
    <aside class="get-in-touch">
    	<h2>Get in touch with us!</h2>
        <p>Whether you are ready to get started on a project or just wanted to ask a few questions, feel free to drop us a line.</p>
        <p class="aligncenter">
            <a class="icon-email" href="mailto:hello@parsleyandsprouts.com"></a>
            <a class="icon-facebook" href="http://www.facebook.com/parsleyandsprouts" target="_blank"></a>
        </p>
    </aside>
    
    <form action="<?php the_permalink(); ?>" class="contact-form" method="post">
    	<?php if( $emailSent == true ) { ?>
            <div class="sent">
	            <h2 class="big orange thanks">Thanks!</h2>
                <h3>We'll get in touch with you soon.</h3>
    	        <p>If you have anything to add, just <a href="mailto:hello@parsleyandsprouts.com">email us</a>!</p>
        	</div>
		<?php } else { ?>
    	<h2 class="sixhundred">Get in touch with us!</h2>
        <label for="contactName">Name*</label>
        <input type="text" name="contactName" id="contactName" value="<?php if(isset($_POST['contactName'])) echo $_POST['contactName'];?>" required="required" />
            
        <label for="company">Company</label>
        <input type="text" name="company" id="company" value="<?php if(isset($_POST['company'])) echo $_POST['company'];?>" />

        <label for="email">Email*</label>
        <input type="email" name="email" id="email" value="<?php if(isset($_POST['email'])) echo $_POST['email'];?>" required="required" />       
            
        <label for="phone">Phone</label>
        <input type="tel" name="phone" id="phone" value="<?php if(isset($_POST['phone'])) echo $_POST['phone'];?>" />
        
        <label class="description" for="description">Project Description*<br /><small><em>Be sure to mention budget and timeline!</em></small></label>
        <textarea name="description" id="description" required="required"></textarea>
        
        <input type="submit" value="send" />
        <input type="hidden" name="submitted" id="submitted" value="true" />
        <small class="alignleft blue"><em>*required</em></small>
        
        <div class="sixhundred" style="margin-top: 60px;">
            <p>Whether you are ready to get started on a project or just wanted to ask a few questions, feel free to drop us a line.</p>
            <p class="aligncenter big">
                <a href="mailto:hello@parsleyandsprouts.com"><span class="icon-email"></span></a>
                <a href="http://www.facebook.com/parsleyandsprouts"><span class="icon-facebook"></span></a>
            </p>
        </div>
        <?php } ?>
    </form>

</article>

<?php get_footer(); ?>