pragma solidity ^0.4.4; //Defining solidity version in the first line is necessary

contract ProviderRegistry {

	function ProviderRegistry(string _name) { //Is it ok to put this in the start of the contract?
		providerMap[msg.sender].name = _name;
	}

	mapping (address => Provider) providerMap;

	struct Provider {
		string name;
	}

	modifier onlyProvider(){
		require(isVerifiedProvider(msg.sender));
		_;
	}
	
	function addProvider(address newProvider, string _name) onlyProvider returns (bool) {
		providerMap[newProvider].name = _name;
	}

	function isVerifiedProvider(address provider) public returns (bool) {
		return (bytes(providerMap[provider].name).length != 0);
	}

}
