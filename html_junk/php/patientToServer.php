<?php

//error_reporting(E_ALL);
//ini_set('display_errors', 'on');

	// Import PHPMailer classes into the global namespace
	// These must be at the top of your script, not inside a function
	use PHPMailer\PHPMailer\PHPMailer;
	use PHPMailer\PHPMailer\Exception;

	//Load composer's autoloader
	require 'vendor/autoload.php';


	//Get info sent from providerscript.js
	$firstname=($_POST['firstname']);
	$lastname=($_POST['lastname']);
	$email=($_POST['email']);
	$address=($_POST['address']);

	//Setting up variables
	$username="luisjgkr_incenthealth";
	$password="incenthealth404";
	$serverURL="localhost"; //replace this with localhost for deployment
	$database="luisjgkr_IncentHealth";
	echo $firstname;
	//Connect to server with mysqli and select database
	$mysqli = new mysqli($serverURL,$username,$password,$database);

	$result = $mysqli->query("INSERT INTO patientData (first_name,last_name,email,uport_address) VALUES('" . $firstname . "', '" . $lastname . "','" . $email . "','" . $address . "')");
	echo $firstname + $result;


	/*
	MAIL PORTION : Send mail from provider to user:
	*/


	$mail = new PHPMailer(true);                              // Passing `true` enables exceptions
	try {
	    //Server settings
	    $mail->SMTPDebug = 2;                                 // Enable verbose debug output
	    $mail->isSMTP();                                      // Set mailer to use SMTP
	    $mail->Host = 'smtp.gmail.com';  // Specify main and backup SMTP servers
	    $mail->SMTPAuth = true;                               // Enable SMTP authentication
	    $mail->Username = 'incenthealth1@gmail.com';                 // SMTP username
	    $mail->Password = 'incenthealth404';                           // SMTP password
	    $mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
	    $mail->Port = 465;                                    // TCP port to connect to

	    //Recipients
	    $mail->setFrom('incenthealth1@gmail.com', 'IncentHealth');
	    $mail->addAddress('incenthealth1@gmail.com', 'Patient A');     // Add a recipient          RECIPIENT

	    //Content
	    $mail->isHTML(true);                                  // Set email format to HTML
	    $mail->Subject = 'IncentMail';
	    $mail->Body    = '<h1>Greetings Patient!</h1> <h3>Finish signing up with IncentHealth: <a href="http://sunquyman.xyz/incenthealth/html_junk/patient.html">click me friend</a></h3>';
	    $mail->AltBody = 'Greetings Patient! Finish signing up with IncentHealth: http://www.sunquyman.xyz/incenthealth/html_junk/patient.html';

	    $mail->send();
	    echo 'Message has been sent';
	} catch (Exception $e) {
	    echo 'Message could not be sent.';
	    echo 'Mailer Error: ' . $mail->ErrorInfo;
	}
?>