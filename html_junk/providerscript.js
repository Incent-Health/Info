// var name = $(".nameInput").attr("value");
// var email = $(".emailInput").attr("value");
// var address = $(".addressInput").attr("value");

var name, email, address;

$(".submitButton").click(function(){ 

	name = $(".nameInput").val();
	email = $(".emailInput").val();
	address = $(".addressInput").val();
	console.log("CLICKED " + name + "  " + email +  "  " + address);
	sendPatientDatatoMySQL();

});

function sendPatientDatatoMySQL(){

        if(window.XMLHttpRequest) {
            // code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        } else {
            // code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        // xmlhttp.onreadystatechange = function() {
        //     if (this.readyState == 4 && this.status == 200) {
        //         document.getElementById("txtHint").innerHTML = this.responseText;
        //     }
        // };
        xmlhttp.open("GET","patientToServer.php?name=" + name + "?email=" + email + "?address=" + address,true);
        xmlhttp.send();

}


//send to MySQL DB

//gmail API


//IncentHealth
//incenthealth1@gmail.com
//incenthealth404


//address 0x1702c51f3db95ddd417514adc9b93f62ff593d5b