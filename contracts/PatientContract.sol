pragma solidity ^0.4.4;

contract PatientContract {
//should this be made into a library for OOP practices? Is it necessary?

	address HealthAdmin; //HealthAdmin - a true authority, as we will likely need it for sensitive functions (or things like selfdestruct)

	mapping (address => Patient) patientMap;
	mapping (address => Provider) providerMap;

	function PatientContract() {
		HealthAdmin = msg.sender;
	}

	struct Patient {
		string firstName;
		string lastName;
		string email;
		address walletAddress; //uPort ID can't into wallet payments
		bytes32 incentiveType; //should make this an enum
		int256 payAmount; //amount patient is consistently paid
		address providerAddress; //used as reference to provider if we need info on the provider; think primary key in RDMS design
					//Why? ----> If we insert Provider in Patient, every time we need info on the provider, we need to go through Patient data, or worse, iterate
	}

	struct Provider {		
		string name;
		//address[] patientAddresses;
	}

	struct MedicalData { //maybe not needed, used in case we need to return all data with MedicalData
		//mapping patientMap;
		//mapping providerMap;
	}

	modifier onlyAdmin() {
		require(msg.sender == HealthAdmin);
		_;
	}

	modifier onlyProvider() {
		require(bytes(providerMap[msg.sender].name).length != 0); //modifier to restrict certain functions to provider only
		_;
	}

	modifier onlyPatient() {
		//require(msg.sender == ) //need form to confirm only patient accesses their own data
		_;
	}

	function addPatient(address patientAdd, string firstName, string lastName, string email, address walletAddress, bytes32 incentiveType, int256 payAmount, address providerAddress) onlyAdmin returns (bool success){
		if(bytes(firstName).length != 0){ //we may not need this if SQL handles this through NOT NULL
			patientMap[patientAdd] = Patient(firstName, lastName, email, walletAddress, incentiveType, payAmount, providerAddress);
			return true;
		} else {
			return false;
		}
	}

	function addProvider(address providerAddress, string name) onlyAdmin returns (bool success){
		if(bytes(name).length != 0){
			providerMap[providerAddress] = Provider(name); //need to add address
			return true;
		} else {
			return false;
		}
	}

	function getPatient(address patientAdd) onlyProvider constant returns (string, string, bytes32){ //tentative on this; patientAdd shouldn't cause shadowing, but possible?
		return (patientMap[patientAdd].firstName, patientMap[patientAdd].email, patientMap[patientAdd].incentiveType);
	}

	function rewardPatient(address patientAdd, uint amount) onlyAdmin public payable { //should be onlyProvider; gotta work on the scoping
		patientAdd.transfer(amount);
	}

	//design issues with onlyPatient(needs to be implemented), access
}
