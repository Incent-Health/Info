<?php
	$name=($GET['name']);
	$email=($GET['email']);
	$address=($GET['address']);
	//setting up variables
	$username="luisjgkr_incenthealth";
	$password="incenthealth404";
	$serverURL="localhost"; //replace this with localhost for deployment
	$database="luisjgkr_IncentHealth";

	//Connect to server and select database
	mysql_connect($serverURL,$username,$password);
	@mysql_select_db($database) or die("Unable to select database");

	$query="INSERT INTO patientData (first_name,last_name,email,incentive_type,uport_address) VALUES('Aaron', '" + $name + "','" + $email + "','Classic','0x1702c51f3db95ddd417514adc9b93f62ff593d5b');"


	mysql_close();
?>