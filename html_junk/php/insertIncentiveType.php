<?php

	//Get info sent from patientscript2S.js
	$incentivetype=($_POST['incentivetype']);
	$address=($_POST['address']);

	//Setting up variables
	$username="luisjgkr_incenthealth";
	$password="incenthealth404";
	$serverURL="localhost"; //replace this with localhost for deployment
	$database="luisjgkr_IncentHealth";
	//echo $incentivetype;
	//Connect to server with mysqli and select database
	$mysqli = new mysqli($serverURL,$username,$password,$database);

	$result = $mysqli->query("UPDATE patientData SET incentive_type='" . $incentivetype . "' WHERE uport_address='" . $address . "')");
	echo $firstname + $result;

?>