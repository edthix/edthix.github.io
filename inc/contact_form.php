<?php 

// include PHP Mailer
require('class.phpmailer.php');

// ====================== Customization ======================== //


$redirect = "edham.arief@gmail.com"; 


// ====================== Customization END ======================== //

function cleanEntries($parameter) {
	$parameter = trim($parameter);
	$parameter = stripslashes($parameter);
	$parameter = htmlspecialchars($parameter);

	return $parameter;
}

// variables
$name_contact = cleanEntries($_POST[postName]);
$email_contact = cleanEntries($_POST[postEmail]);
$subject_contact = "vCard - Message from ".$name_contact;
$message_contact = cleanEntries($_POST[postMessage]);

// prepare email
$mail = new PHPMailer();
$mail->From = $email_contact;
$mail->FromName = $name_contact;
$mail->AddAddress($redirect);
$mail->Subject = $subject_contact;
$mail->Body = $message_contact;

// send mail
if ($name_contact && $email_contact && $subject_contact && $message_contact != "") {
	$mail->Send();
} 

?>