pragma solidity ^0.4.4;

contract PatientContract {
//should this be made into a library for OOP practices? Is it necessary?

	address ProviderAdmin; //multiple providers work with multiple patients... should be more of all providers | all patients, maybe keep patient/provider info in struct Patient and then require that the Patient to match up with the sender... maybe only add Patient if within array of address ProviderAdmins, which are intialized on contract creation

	mapping (address => Patient) patientMap;

	function PatientContract() {
		ProviderAdmin = msg.sender;
	}

	struct Patient {
		string name;
		string email;
		address walletAddress; //uPort ID can't into wallet payments
		bytes32 incentiveType; //should make this an enum
		int256 payAmount; //amount patient is consistently paid
	}

	modifier onlyProvider() {
		require(msg.sender == ProviderAdmin); //modifier to restrict certain functions to provider only
		_;
	}

	modifier onlyPatient() {
		//require(msg.sender == ) //need form to confirm only patient accesses their own data
		_;
	}

	function addPatient(address patientAdd, string name, string email, address walletAddress, bytes32 incentiveType, int256 payAmount) onlyProvider returns (bool success){
		if(bytes(name).length != 0){
			patientMap[patientAdd] = Patient(name, email, walletAddress, incentiveType, payAmount);
			return true;
		} else {
			return false;
		}
	}

	function getPatient(address patientAdd) onlyProvider constant returns (string, string, bytes32){ //tentative on this; patientAdd shouldn't cause shadowing, but possible?
		return (patientMap[patientAdd].name, patientMap[patientAdd].email, patientMap[patientAdd].incentiveType);
	}

	//design issues with onlyPatient(needs to be implemented), access
}
