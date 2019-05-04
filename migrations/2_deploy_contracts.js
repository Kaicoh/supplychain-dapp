const SimpleStorage = artifacts.require('SimpleStorage');
const FarmerRole = artifacts.require('FarmerRole');
const DistributorRole = artifacts.require('DistributorRole');
const RetailerRole = artifacts.require('RetailerRole');
const ConsumerRole = artifacts.require('ConsumerRole');
const AccessControl = artifacts.require('AccessControl');
const SupplyChain = artifacts.require('SupplyChain');
const Ownable = artifacts.require('Ownable');
const Core = artifacts.require('Core');

module.exports = function (deployer) {
    deployer.deploy(SimpleStorage);
    deployer.deploy(FarmerRole);
    deployer.deploy(DistributorRole);
    deployer.deploy(RetailerRole);
    deployer.deploy(ConsumerRole);
    deployer.deploy(AccessControl);
    deployer.deploy(SupplyChain);
    deployer.deploy(Ownable);
    deployer.deploy(Core);
};
