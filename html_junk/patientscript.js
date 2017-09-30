//Initialize web3
//var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

// if(typeof web3 !== 'undefined') {
// 	web3 = new Web3(new Web3.currentProvider);
// } else {
//   // If no injected web3 instance is detected, fallback to the TestRPC.
// 	web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
// }
var patientAddress = getUrlParameter('address');


//$.post("php/getAddress.php", function(data){ console.log(data + "\n"); memetest=data;});

//var ethAmount = web3.eth.getBalance("0xbf2d51d1ab732f130362891e61a084e3ddba6a45");
//$(".nameInput").value(ethAmount);


$(".startButton").click(function(){ 

	console.log("CLICKED: " + address);
});

/*Borrowed from https://davidwalsh.name/query-string-javascript; Using over URLSearchParams to support all browsers!*/
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};


//IncentHealth
//incenthealth1@gmail.com
//incenthealth404