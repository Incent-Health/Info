/* global Web3 globalState render */

//Stuff borrowed from HTML

// Setup
const SimpleSigner = window.uportconnect.SimpleSigner;
const Connect = window.uportconnect.Connect;
const appName = "IncentHealth - App";
var connect;


const uportConnect = function () {

    connect = new Connect("IncentHealth - App", {
        clientId: "2og7ypfrpDj8Un8FTzPpwUSCat7e3Js3LU5",
        network: "rinkeby",
        signer: SimpleSigner("c7a3be5fbed3d61c3a29edc1c3f34040804d67a5d1eef9bbbf4e9c8702b3f358")
    })

    // Request credentials to login
    connect.requestCredentials({
    	requested: ['name', 'phone', 'country'],
    	notifications: true // We want this if we want to recieve credentials
    })
    .then((credentials) => {
    	var address = credentials.address;
    	console.log(address);
        checkProviderAddress(address);
    })  
}

function checkProviderAddress(address){
     if(isProviderAddressMySQL(address)){
            succesfulLogin();
        } else {
            alert("ERROR: Address not recognized as a provider.");
        }
}

function successfulLogin(){
    window.location.href = "./providerportal.html?address=" + address;
}

function isProviderAddressMySQL(address){

    var data = "address=" + address;
    $.post('php/isProviderAddress.php', data, function(data){
        console.log(data);
        if(data == "true"){
            return true;
        } else {
            return false;
        }
    }); //NEED WAY TO ADD CONDITIONALS, I.E. CHECK FOR DATABASE INSERT ERRORS AND REPORT APPROPRIATE RESULT TO USER
}