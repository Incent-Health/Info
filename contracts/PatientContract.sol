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
		PaymentPlanItem[] paymentPlan;
		address providerAddress; //used as reference to provider if we need info on the provider; think primary key in RDMS design
					//Why? ----> If we insert Provider in Patient, every time we need info on the provider, we need to go through Patient data, or worse, iterate
	}

	struct Provider {		
		string name;
		address[] patientAddresses;
	}
	
	struct PaymentPlanItem {
		uint date;
		uint amount;
		bool isWithdrawn;
		bool isValid;
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

	function addPatient(address patientAdd, string _firstName, string _lastName, string _email, address _walletAddress, bytes32 _incentiveType, address _providerAddress) onlyProvider returns (bool success){
		if(bytes(_firstName).length != 0){ //we may not need this if SQL handles this through NOT NULL
			//patientMap[patientAdd] = Patient();
			patientMap[patientAdd].firstName = _firstName;
			patientMap[patientAdd].lastName = _lastName;
			patientMap[patientAdd].email = _email;
			patientMap[patientAdd].walletAddress = _walletAddress;
			patientMap[patientAdd].incentiveType = _incentiveType;
			patientMap[patientAdd].providerAddress = _providerAddress;
			//firstName, lastName, email, walletAddress, incentiveType, providerAddress);
			return true;
		} else {
			return false;
		}
	}

	function addProvider(address providerAddress, string _name) onlyAdmin returns (bool success){
		if(bytes(_name).length != 0){
			//providerMap[providerAddress] = Provider(); //need to add address
			providerMap[providerAddress].name = _name;
			return true;
		} else {
			return false;
		}
	}

	function addPatientPlanItem(address patientAdd, uint _date, uint _amount, bool _isWithdrawn, bool _isValid) onlyProvider {
		patientMap[patientAdd].paymentPlan.push(PaymentPlanItem(_date, _amount, _isWithdrawn, _isValid));
	}

	function getPatientPlanItem(address patientAdd, uint index) constant returns (uint, uint, bool, bool) {
		return (patientMap[patientAdd].paymentPlan[index].date, patientMap[patientAdd].paymentPlan[index].amount, patientMap[patientAdd].paymentPlan[index].isWithdrawn, patientMap[patientAdd].paymentPlan[index].isValid);
	}

	function getPatient(address patientAdd) constant returns (string, string, string, address, bytes32, address){ //tentative on this; patientAdd shouldn't cause shadowing, but possible?
		return (patientMap[patientAdd].firstName, patientMap[patientAdd].lastName, patientMap[patientAdd].email, patientMap[patientAdd].walletAddress, patientMap[patientAdd].incentiveType, patientMap[patientAdd].providerAddress);
	}


	function canGetReward(uint ppindex) returns (bool canReward){
		return (!(patientMap[msg.sender].paymentPlan[ppindex].isWithdrawn) && patientMap[msg.sender].paymentPlan[ppindex].isValid);
	}

	function rewardPatient(address patientAdd, uint amount) public payable { //should be onlyProvider; gotta work on the scoping
		patientAdd.transfer(amount);
	}

	//design issues with onlyPatient(needs to be implemented), access
}
