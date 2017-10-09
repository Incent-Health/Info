/* global Web3 globalState render */

//Stuff borrowed from HTML

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


/*
***********************PRECIOUS WEB3() CODE***********************
*/
//connect.getWeb3();
// const web3 = connect.getWeb3();      

// Setup the contract - allows you to set and read a status string
// const contractAddress = "0xCD7C289E43C38EEaBD060558297913E0d7A3936F";
// const abi = [{"constant":false,"inputs":[{"name":"patientAdd","type":"address"},{"name":"firstName","type":"string"},{"name":"lastName","type":"string"},{"name":"email","type":"string"},{"name":"walletAddress","type":"address"},{"name":"incentiveType","type":"bytes32"},{"name":"payAmount","type":"int256"},{"name":"providerAddress","type":"address"}],"name":"addPatient","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"patientAdd","type":"address"}],"name":"getPatient","outputs":[{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"patientAdd","type":"address"},{"name":"amount","type":"uint256"}],"name":"rewardPatient","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"providerAddress","type":"address"},{"name":"name","type":"string"}],"name":"addProvider","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}];

// const PatientContract = web3.eth.contract(abi); //get Contract Object
// const ContractInstance = PatientContract.at("0xCD7C289E43C38EEaBD060558297913E0d7A3936F");
// console.log("Instance of PatientContract loaded at: " + contractAddress);


const uportConnect = function () {

    // Request credentials to login
    connect.requestCredentials({
    	requested: ['name', 'phone', 'country'],
    	notifications: true // We want this if we want to recieve credentials
    })
    .then((credentials) => {
    	var address = credentials.address;
    	console.log(address);
    	window.location.href = "./patientinvite.html?address=" + address;
    })
}
