<?php

//error_reporting(E_ALL);
//ini_set('display_errors', 'on');


	$firstname=($POST['firstname']);
	$lastname=($POST['lastname']);
	$email=($POST['email']);
	$address=($POST['address']);
	//setting up variables
	$username="luisjgkr_incenthealth";
	$password="incenthealth404";
	$serverURL="localhost"; //replace this with localhost for deployment
	$database="luisjgkr_IncentHealth";

	//Connect to server and select database
	$mysqli = new mysqli($serverURL,$username,$password,$database);

	$result = $mysqli->query("INSERT INTO patientData (first_name,last_name,email,uport_address) VALUES('" + firstname + "', '" + lastname + "','" + email + "','" + address + "')");
?>