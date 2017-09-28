var PatientContract = artifacts.require("./PatientContract.sol");
var HealthGoal = artifacts.require("./HealthGoal.sol");

module.exports = function(deployer) {
  deployer.deploy(PatientContract);
  deployer.deploy(HealthGoal, "0xc44b91a23e4d446226bec034ddcdf23451fb3865","0x1702c51f3db95ddd417514adc9b93f62ff593d5b", "epic goal xd", 1506586560);
};
