<?php

	//Get info sent from providerloginscript.js
	$address=($_POST['address']);
	//Setting up variables
	$username="luisjgkr_incenthealth";
	$password="incenthealth404";
	$serverURL="localhost"; //replace this with localhost for deployment
	$database="luisjgkr_IncentHealth";

	//Connect to server with mysqli and select database
	$mysqli = new mysqli($serverURL,$username,$password,$database);

	$request = $mysqli->query("SELECT id FROM providerData WHERE uport_address = \"" . $address . "\"");

    if($results->num_rows !== 0){
        echo "true";
    } else {
    	echo "false";
    }


?>