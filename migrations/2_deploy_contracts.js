const SimpleStorage = artifacts.require('SimpleStorage');
const FarmerRole = artifacts.require('FarmerRole');
const DistributorRole = artifacts.require('DistributorRole');
const RetailerRole = artifacts.require('RetailerRole');
const ConsumerRole = artifacts.require('ConsumerRole');
const SupplyChain = artifacts.require('SupplyChain');

module.exports = function (deployer) {
    deployer.deploy(SimpleStorage);
    deployer.deploy(FarmerRole);
    deployer.deploy(DistributorRole);
    deployer.deploy(RetailerRole);
    deployer.deploy(ConsumerRole);
    deployer.deploy(SupplyChain);
};
