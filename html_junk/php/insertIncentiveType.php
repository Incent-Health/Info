<?php

	//Get info sent from patientscript2S.js
	$incentivetype=($_POST['incentiveselect']);
	$address=($_POST['address']);
	echo $incentivetype;
	echo "\n" . $address;
	//Setting up variables
	$username="luisjgkr_incenthealth";
	$password="incenthealth404";
	$serverURL="localhost"; //replace this with localhost for deployment
	$database="luisjgkr_IncentHealth";
	//echo $incentivetype;
	//Connect to server with mysqli and select database
	$mysqli = new mysqli($serverURL,$username,$password,$database);

	$result = $mysqli->query("UPDATE patientData SET incentive_type='" . $incentivetype . "'WHERE uport_address='" . $address . "'");
	echo "reached end of PHP";

?>