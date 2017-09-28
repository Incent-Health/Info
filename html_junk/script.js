//Initialize web3
if(typeof web3 !== 'undefined') {
	App.web3Provider = web3.currentProvider;
	web3 = new Web3(web3.currentProvider);
} else {
  // If no injected web3 instance is detected, fallback to the TestRPC.
	App.web3Provider = new web3.providers.HttpProvider('http://localhost:8545');
	web3 = new Web3(App.web3Provider);
}

var ethAmount = web3.eth.getBalance("0xbf2d51d1ab732f130362891e61a084e3ddba6a45");
$(".nameInput").attr("value",ethAmount);

$(".submitButton").click(function(){ 
	console.log("CLICKED");

});