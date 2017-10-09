<?php

	$patientAddress=($_POST['address']);

	//Setting up variables
	$username="luisjgkr_incenthealth";
	$password="incenthealth404";
	$serverURL="localhost"; //replace this with localhost for deployment
	$database="luisjgkr_IncentHealth";

	//Connect to server with mysqli and select database
	$mysqli = new mysqli($serverURL,$username,$password,$database);


	$result = $mysqli->query("SELECT health_provider, provider_invite_timestamp FROM patientData WHERE uport_address = \"" . $patientAddress . "\"");
	//echo("SELECT health_provider, provider_invite_timestamp FROM patientData WHERE uport_address = \"" . $patientAddress . "\";");
	//$providertimestamp = $mysqli->query("SELECT provider_invite_timestamp FROM patientData WHERE uport_address = \"" . patientAddress .	 "\";");

	while($row = $result->fetch_assoc()){ //really bad code
		echo $row['health_provider'] . "|" . $row['provider_invite_timestamp'];
	}

	//echo $row['health_provider'] . "|" . $row['provider_invite_timestamp'];

?>