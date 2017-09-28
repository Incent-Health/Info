pragma solidity ^0.4.4;

import "./ProviderRegistry.sol";

/*
HealthGoal contract is created whenever a patient signs up for an
incentive program. In this paradigm, Patients belong to HealthGoals,
or an incentive program
*/
contract HealthGoal {
	
	event ReceivedFunding(address payor, uint amount); //Logs payments to transaction log, useful for JS integration, watching for these...?

	struct Patient {
		address id;
		address wallet;
	}

	Patient private patient;
	string private goal;
	uint private deadline;

	ProviderRegistry providerRegistry = new ProviderRegistry("Provider IncentHealth"); //need way to control provider; should this be done at construction? need to figure out how providers are defined for a patient; who defines them?

	function HealthGoal(address patient_id, address patient_wallet, string _goal, uint _deadline) public {
		patient = Patient(patient_id, patient_wallet);
		goal = _goal;
		deadline = _deadline;
	}

/*
Modifiers
*/

	modifier onlyProvider() {
		require(providerRegistry.isVerifiedProvider(msg.sender));
		_;
	}

	modifier onlyPatient() {
		require(msg.sender == patient.id);
		_;
	}

	modifier beforeDeadline() {
		require(now < deadline);
		_;
	}

	modifier afterDeadline() {
		require(now > deadline);
		_;
	}

	function fund() public payable { //could rewardGoal be more expressive of a function name?
		ReceivedFunding(msg.sender, msg.value);
	}

	function goalSuccess() onlyProvider beforeDeadline {
		patient.wallet.transfer(this.balance);
	}

}
