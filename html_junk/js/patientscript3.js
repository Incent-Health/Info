//$("header div, .mainbody *").hide();
//$("header div, .mainbody *").fadeIn(900);

var patientAddress = getUrlParameter('address');
var data = "address=" + patientAddress;
var incentivetype = getUrlParameter('incentivetype');
var healthprovider, providertimestamp;

/*
***********************PRECIOUS WEB3() CODE***********************
*/
// //connect.getWeb3();
// const web3 = connect.getWeb3();      

// //Setup the contract - allows you to set and read a status string
// const contractAddress = "0x646dedfe247ded3af9519f546873c3847fb1526e";
// const abi = [{"constant":true,"inputs":[{"name":"patientAdd","type":"address"},{"name":"index","type":"uint256"}],"name":"getPatientPlanItem","outputs":[{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"bool"},{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"patientAdd","type":"address"},{"name":"_date","type":"uint256"},{"name":"_amount","type":"uint256"},{"name":"_isWithdrawn","type":"bool"},{"name":"_isValid","type":"bool"}],"name":"addPatientPlanItem","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"patientAdd","type":"address"},{"name":"_firstName","type":"string"},{"name":"_lastName","type":"string"},{"name":"_email","type":"string"},{"name":"_walletAddress","type":"address"},{"name":"_incentiveType","type":"bytes32"},{"name":"_providerAddress","type":"address"}],"name":"addPatient","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"ppindex","type":"uint256"}],"name":"canGetReward","outputs":[{"name":"canReward","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"patientAdd","type":"address"}],"name":"getPatient","outputs":[{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"address"},{"name":"","type":"bytes32"},{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"patientAdd","type":"address"},{"name":"amount","type":"uint256"}],"name":"rewardPatient","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"providerAddress","type":"address"},{"name":"_name","type":"string"}],"name":"addProvider","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}];

// const PatientContract = web3.eth.contract(abi); //get Contract Object
// const ContractInstance = PatientContract.at("0x646dedfe247ded3af9519f546873c3847fb1526e");
// console.log("Instance of PatientContract loaded at: " + contractAddress);

// var adminaccount = web3.eth.accounts.privateKeyToAccount("b61a2e5bc57283f7c968c1c8c6f74e42b051de752821807ae7b551e1c6797bc8");
// web3.eth.defaultAccount = adminaccount;


$(".confirmForm").submit(function(e){
	e.preventDefault();

	sendPatientInviteInfoMySQL("address=" + patientAddress + "&incentivetype=" + incentivetype);
	var link = "./patient_thankyou.html";
	location.href = link;

});

function sendPatientInviteInfoMySQL(data){ //read about JS Asynchronous nature
	$.post("php/insertPatientInviteInfo.php", data, function(data){ 
		console.log(data);
		//var patientweb3 = connect.getWeb3();
        //var patientEthAddress = web3.eth.defaultAccount;
        //var patientEthAddress = "0xCf76bDEfcB60ee31934fc11a3e1c9140c1405331";
        //write to blockchain
        //var result = ContractInstance.addPatient(patientEthAddress, "Mark", "Huang", "incenthealth1@gmail.com", patientEthAddress, "Classic", "2oe6pP95iA6LADJG1wyPF2VV4kTzvPUaxz8"); //HARD CODE - TERRIBLE CHANGE
	});
};

// function getInfoPHP(patientAddress){ //read about JS Asynchronous nature
// 	$.post("php/getInfo.php", data, function(data){ 
// 		// console.log(data);
// 		// data = data.split("|");
// 		// healthprovider = data[0];
// 		// providertimestamp = data[1];
// 		// console.log(data);
// 		// console.log(healthprovider);
// 		// console.log(providertimestamp);
// 		// $(".providerText").text(healthprovider);
// 		// $(".providerInviteTime").text(providertimestamp);
// 		console.log(data);
// 		data = data.split("|");
// 		$(".AddressInput").text(data);
// 	});
// };

function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};
