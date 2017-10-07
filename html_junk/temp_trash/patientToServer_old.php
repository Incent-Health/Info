<?php

error_reporting(E_ALL);
ini_set('display_errors', 'on');

	$name=($POST['name']);
	$email=($POST['email']);
	$address=($POST['address']);
	//setting up variables
	$username="luisjgkr_incenthealth";
	$password="incenthealth404";
	$serverURL="localhost"; //replace this with localhost for deployment
	$database="luisjgkr_IncentHealth";

	//Connect to server and select database
	$mysqli = new mysqli($serverURL,$username,$password,$database);
	$result = $mysqli->query("INSERT INTO patientData (first_name,last_name,email,incentive_type,uport_address) VALUES('Aaron', '" + $name + "','" + $email + "','Classic','0x1702c51f3db95ddd417514adc9b93f62ff593d5b')");
	mysqli_close($mysqli);
?>