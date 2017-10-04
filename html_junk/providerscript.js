
var firstname, lastname, email, address;

// Setup
const SimpleSigner = window.uportconnect.SimpleSigner;
const Connect = window.uportconnect.Connect;
const appName = "IncentHealth - App";
//const connect = new Connect(appName, {network: 'rinkeby'});
const connect = new Connect("IncentHealth - App", {
	clientId: "2og7ypfrpDj8Un8FTzPpwUSCat7e3Js3LU5",
    	network: "rinkeby",
    	signer: SimpleSigner("c7a3be5fbed3d61c3a29edc1c3f34040804d67a5d1eef9bbbf4e9c8702b3f358")
    })

const uportConnect = function () {

    // Request credentials to login
    connect.requestCredentials({
    	requested: ['name', 'email', 'phone', 'country'],
    	notifications: true // We want this if we want to recieve credentials
    })
    .then((credentials) => {
    	//Parse, set, and update obtained credentials
    	var name = credentials.name;
    	var pos = name.indexOf(" ");
    	if(pos != -1){
    		var first_name = name.substring(0, pos);
    		var last_name = name.substring(pos+1);
    	} else {
    		var first_name = name;
    	}
    	var email = credentials.email;
    	var address = credentials.address;
    	console.log(first_name + " " + last_name + " " + email + " " + address)
    	updateFields(first_name, last_name, email, address);
    })
}

$(".identifyButton").click(function(){
	uportConnect();
});

$(".submitButton").click(function(){ 

	firstname = $(".firstNameInput").val();
	lastname = $(".lastNameInput").val();
	email = $(".emailInput").val();
	address = $(".addressInput").val();
	console.log("CLICKED " + name + "  " + email +  "  " + address);
	sendPatientDatatoMySQL();
	console.log("INSERT INTO patientData (first_name,last_name,email,uport_address) VALUES('" + firstname + "', '" + lastname + "','" + email + "','" + address + "');");

});

function updateFields(firstn, lastn, email, address){
	$(".firstNameInput").val(firstn);
	$(".lastNameInput").val(lastn);
	$(".emailInput").val(email);
	$(".addressInput").val(address);
	console.log("Updated fields!!!");
}


function sendPatientDatatoMySQL(){

    var data = "firstname=" + firstname + "&lastname=" + lastname + "&email=" + email + "&address=" + address;
    //xmlhttp.open("POST","patientToServer.php",true);
    console.log("PHP JS MARKER");
    $.post('php/patientToServer.php', data, function(data){console.log(data + "\n");}); //NEED WAY TO ADD CONDITIONALS, I.E. CHECK FOR DATABASE INSERT ERRORS AND REPORT APPROPRIATE RESULT TO USER
    //xmlhttp.send(data);
    console.log("SENT");

}