pragma solidity ^0.4.4;

import "./ProviderRegistry.sol";

contract HealthGoal {

	event ReceivedFunding(address payor, uint amount);

	struct Patient {
		address id;
		address wallet;
	}

	Patient private patient;

	string private goal;

	uint private deadline;

	ProviderRegistry providerRegistry;

	function HealthGoal(address patient_id, address patient_wallet, string _goal, ProviderRegistry _providerRegistry, uint _deadline) public {
		patient = Patient(patient_id, patient_wallet);
		goal = _goal;
		deadline = _deadline;
	}

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

	function fund() public payable {
		ReceivedFunding(msg.sender, msg.value);
	}

	function goalSuccess() onlyProvider beforeDeadline {
		patient.wallet.transfer(this.balance);
	}

}
