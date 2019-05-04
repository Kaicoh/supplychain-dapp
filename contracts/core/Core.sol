pragma solidity ^0.5.0;

import "../base/SupplyChain.sol";
import "./Ownable.sol";

contract Core is SupplyChain, Ownable {
    constructor()
        SupplyChain()
        Ownable()
        public
    {} // solium-disable-line no-empty-blocks

    function kill() public {
        if (msg.sender == owner()) {
            selfdestruct(msg.sender);
        }
    }

    function renounceOwnership() public onlyOwner {
        renounceAccessControls();
        super.renounceOwnership();
    }

    function transferOwnership(address newOwner) public onlyOwner {
        addAccessControls(newOwner);
        super.transferOwnership(newOwner);
    }
}
