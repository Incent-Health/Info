<?php

	$providerAddress=($_POST['address']);

	//Setting up variables
	$username="luisjgkr_incenthealth";
	$password="incenthealth404";
	$serverURL="localhost"; //replace this with localhost for deployment
	$database="luisjgkr_IncentHealth";

	//Connect to server with mysqli and select database
	$mysqli = new mysqli($serverURL,$username,$password,$database);

	$result = $mysqli->query("SELECT first_name, last_login_timestamp FROM patientData WHERE uport_address = \"" . $providerAddress . "\"");
	//echo("SELECT health_provider, provider_invite_timestamp FROM patientData WHERE uport_address = \"" . $patientAddress . "\";");
	//$providertimestamp = $mysqli->query("SELECT provider_invite_timestamp FROM patientData WHERE uport_address = \"" . patientAddress .	 "\";");

	$mysqli->query("UPDATE patientData SET last_login_timestamp = CURRENT_TIMESTAMP WHERE uport_address = \"" . $providerAddress . "\"");

	while($row = $result->fetch_assoc()){ 
		echo $row['first_name'] . "|" . $row['last_login_timestamp'];
	}

?>