<?php

	$patientAddress=($_POST['address']);

	//Setting up variables
	$username="luisjgkr_incenthealth";
	$password="incenthealth404";
	$serverURL="localhost"; //replace this with localhost for deployment
	$database="luisjgkr_IncentHealth";

	//Connect to server with mysqli and select database
	$mysqli = new mysqli($serverURL,$username,$password,$database);

	$result = $mysqli->query("SELECT providerData.name, patientData.provider_invite_timestamp FROM providerData, patientData WHERE patientData.uport_address = \"" . $patientAddress . "\" AND providerData.id = patientData.health_provider_id");

	while($row = $result->fetch_assoc()){ //really bad code
		echo $row['name'] . "|" . $row['provider_invite_timestamp'];
	}

	//echo $row['health_provider'] . "|" . $row['provider_invite_timestamp'];

?>