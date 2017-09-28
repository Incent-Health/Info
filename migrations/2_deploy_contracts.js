var PatientContract = artifacts.require("./PatientContract.sol");

module.exports = function(deployer) {
  deployer.deploy(PatientContract);
};
