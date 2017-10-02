// var name = $(".nameInput").attr("value");
// var email = $(".emailInput").attr("value");
// var address = $(".addressInput").attr("value");

var firstname, lastname, email, address;

$(".submitButton").click(function(){ 

	firstname = $(".firstNameInput").val();
	lastname = $(".lastNameInput").val();
	email = $(".emailInput").val();
	address = $(".addressInput").val();
	console.log("CLICKED " + name + "  " + email +  "  " + address);
	sendPatientDatatoMySQL();
	console.log("INSERT INTO patientData (first_name,last_name,email,uport_address) VALUES('" + firstname + "', '" + lastname + "','" + email + "','" + address + "');");

});



function sendPatientDatatoMySQL(){

    var data = "firstname=" + firstname + "&lastname=" + lastname + "&email=" + email + "&address=" + address;
    //xmlhttp.open("POST","patientToServer.php",true);
    console.log("PHP JS MARKER");
    $.post('php/patientToServer.php', data, function(data){console.log(data + "\n");}); //NEED WAY TO ADD CONDITIONALS, I.E. CHECK FOR DATABASE INSERT ERRORS AND REPORT APPROPRIATE RESULT TO USER
    //xmlhttp.send(data);
    console.log("SENT");

}


//send to MySQL DB

//gmail API


//IncentHealth
//incenthealth1@gmail.com
//incenthealth404


//address 0x1702c51f3db95ddd417514adc9b93f62ff593d5b