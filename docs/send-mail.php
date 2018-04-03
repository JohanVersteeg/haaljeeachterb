<?php
error_reporting(-1);

// Same as error_reporting(E_ALL);
ini_set('error_reporting', E_ALL);

    // Check for empty fields
    if(empty($_POST['name']) ||
    empty($_POST['emailOrPhone']) ||
    empty($_POST['message']))
    {
        echo "No arguments Provided!";
        die();
    }
        
    $name = $_POST['name'];
    $emailOrPhone = $_POST['emailOrPhone'];
    $message = nl2br($_POST['message']);
        
    // Create the email and send the message
    $to = 'Website<info@verkeersschoolruarkvandijken.nl>'; // Add your email address inbetween the '' replacing yourname@yourdomain.com - This is where the form will send a message to.
    $email_subject = "Website contact formulier: $name";
    $email_body = "<h2>Bericht van de website</h2><b>Naam:</b> $name<br /><b>E-mail of telefoonnummer:</b> $emailOrPhone<br /><b>Bericht:</b><br />$message";
	$headers = "MIME-Version: 1.0\r\n";
	$headers .= "Content-type: text/html; charset=iso-8859-1\r\n"; 
    $headers .= "BCC: Johan Versteeg<versteeg.joh@outlook.com>\r\n"; 
	$headers .= "From: no-reply@verkeersschoolruarkvandijken.nl\r\n";
    
    if(mail($to,$email_subject,$email_body,$headers))
    {
        echo "true";
    }
    else
    {
        echo "Fail";
    }
?>