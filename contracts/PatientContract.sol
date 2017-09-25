pragma solidity ^0.4.4;

contract PatientContract {

	address ProviderAdmin; 

	mapping (address => Patient) patientMap;

	function PatientContract() payable {
		ProviderAdmin = msg.sender;
	}

	struct Patient {
		string name;
		string email;
		bytes32 incentivetype; //should make this an enum
	}

	modifier onlyProvider() {
		require(msg.sender == ProviderAdmin); //modifier to restrict certain functions to provider only
		_;
	}

	modifier onlyPatient() {
		//require(msg.sender == ) //need form to confirm only patient accesses their own data
		_;
	}

	function addPatient(address patientAdd, string n, string e, bytes32 it) onlyProvider returns (bool success){
		if(bytes(n).length != 0){
			patientMap[patientAdd] = Patient(n, e, it);
			return true;
		} else {
			return false;
		}
	}

	function getPatient(address patientAdd) onlyProvider constant returns (string, string, bytes32){ //tentative on this; patientAdd shouldn't cause shadowing, but possible?
		return (patientMap[patientAdd].name, patientMap[patientAdd].email, patientMap[patientAdd].incentivetype);
	}

	//design issues with onlyPatient(needs to be implemented), access
}
