//Initialize web3
//var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

if(typeof web3 !== 'undefined') {
	web3 = new Web3(new Web3.currentProvider);
} else {
  // If no injected web3 instance is detected, fallback to the TestRPC.
	web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
}

var ethAmount = web3.eth.getBalance("0xbf2d51d1ab732f130362891e61a084e3ddba6a45");
$(".nameInput").value(ethAmount);


$(".submitButton").click(function(){ 

	console.log("CLICKED: " + name + " " + email + " " + address);
});


//IncentHealth
//incenthealth1@gmail.com
//incenthealth404