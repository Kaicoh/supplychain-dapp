pragma solidity ^0.5.0;

import "./ConsumerRole.sol";
import "./DistributorRole.sol";
import "./FarmerRole.sol";
import "./RetailerRole.sol";

contract AccessControl is ConsumerRole, DistributorRole, FarmerRole, RetailerRole {
    constructor()
        ConsumerRole()
        DistributorRole()
        FarmerRole()
        RetailerRole()
        public
    {} // solium-disable-line no-empty-blocks

    function renounceAccessControls() public {
        if (isFarmer(msg.sender)) {
            renounceFarmer();
        }

        if (isDistributor(msg.sender)) {
            renounceDistributor();
        }

        if (isRetailer(msg.sender)) {
            renounceRetailer();
        }

        if (isConsumer(msg.sender)) {
            renounceConsumer();
        }
    }

    function addAccessControls(address account) public {
        if (!isFarmer(account)) {
            addFarmer(account);
        }

        if (!isDistributor(account)) {
            addDistributor(account);
        }

        if (!isRetailer(account)) {
            addRetailer(account);
        }

        if (!isConsumer(account)) {
            addConsumer(account);
        }
    }
}
