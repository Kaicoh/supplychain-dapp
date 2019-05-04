pragma solidity ^0.5.0;

import "../accesscontrol/AccessControl.sol";

contract SupplyChain is AccessControl {
    address owner;
    uint public sku;
    mapping (uint => Item) items;

    enum State {
        ForSale,
        Sold,
        Shipped,
        Received,
        Bouquet,
        Purchased
    }

    struct Item {
        uint    sku;
        string  name;
        address currentOwner;
        address farmer;
        address distributor;
        address retailer;
        address consumer;
        State   itemState;
        uint    wholesalePrice;
        uint    retailPrice;
    }

    event ForSale(uint sku);
    event Sold(uint sku);
    event Shipped(uint sku);
    event Received(uint sku);
    event Bouquet(uint sku);
    event Purchased(uint sku);

    modifier paidEnough(uint _price) {
        require(msg.value >= _price);
        _;
    }

    modifier checkValue(uint _price) {
        _;
        uint amountToReturn = msg.value - _price;
        if (amountToReturn > 0) {
            msg.sender.transfer(amountToReturn);
        }
    }

    modifier isForSale(uint _sku) {
        require(items[_sku].itemState == State.ForSale);
        _;
    }

    modifier isSold(uint _sku) {
        require(items[_sku].itemState == State.Sold);
        _;
    }

    modifier isShipped(uint _sku) {
        require(items[_sku].itemState == State.Shipped);
        _;
    }

    modifier isReceived(uint _sku) {
        require(items[_sku].itemState == State.Received);
        _;
    }

    modifier isBouquet(uint _sku) {
        require(items[_sku].itemState == State.Bouquet);
        _;
    }

    constructor() AccessControl() public payable {
        owner = msg.sender;
        sku = 0;
    }

    function kill() public {
        if (msg.sender == owner) {
            selfdestruct(_make_payable(owner));
        }
    }

    function cultivateItem(string memory _name, uint _price)
        public
        onlyFarmer
    {
        sku = sku + 1;

        Item memory newItem = Item({
            sku: sku,
            name: _name,
            currentOwner: msg.sender,
            farmer: msg.sender,
            distributor: address(0),
            retailer: address(0),
            consumer: address(0),
            itemState: State.ForSale,
            wholesalePrice: _price,
            retailPrice: 0
        });
        items[sku] = newItem;

        emit ForSale(sku);
    }

    function buyItem(uint _sku)
        public
        payable
        onlyDistributor
        isForSale(_sku)
        paidEnough(items[_sku].wholesalePrice)
        checkValue(items[_sku].wholesalePrice)
    {
        items[_sku].currentOwner = msg.sender;
        items[_sku].distributor = msg.sender;
        items[_sku].itemState = State.Sold;

        address payable payableFarmer = _make_payable(items[_sku].farmer);
        payableFarmer.transfer(items[_sku].wholesalePrice);

        emit Sold(_sku);
    }

    function shipItem(uint _sku)
        public
        onlyFarmer
        isSold(_sku)
    {
        items[_sku].itemState = State.Shipped;

        emit Shipped(_sku);
    }

    function receiveItem(uint _sku)
        public
        onlyRetailer
        isShipped(_sku)
    {
        items[_sku].currentOwner = msg.sender;
        items[_sku].retailer = msg.sender;
        items[_sku].itemState = State.Received;

        emit Received(_sku);
    }

    function makeBouquet(uint _sku, uint _price)
        public
        onlyRetailer
        isReceived(_sku)
    {
        items[_sku].itemState = State.Bouquet;
        items[_sku].retailPrice = _price;

        emit Bouquet(_sku);
    }

    function purchaseItem(uint _sku)
        public
        payable
        onlyConsumer
        isBouquet(_sku)
        paidEnough(items[_sku].retailPrice)
        checkValue(items[_sku].retailPrice)
    {
        items[_sku].currentOwner = msg.sender;
        items[_sku].consumer = msg.sender;
        items[_sku].itemState = State.Purchased;

        address payable payableDistributor = _make_payable(items[_sku].distributor);
        payableDistributor.transfer(items[_sku].retailPrice);

        emit Purchased(_sku);
    }

    function fetchItem(uint _sku)
        public
        view
        returns (
            uint    itemSku,
            string memory itemName,
            string memory itemState,
            address itemOwner,
            address itemFarmer,
            address itemDistributor,
            address itemRetailer,
            address itemConsumer,
            uint    itemWholesalePrice,
            uint    itemRetailPrice
        )
    {
        Item memory item = items[_sku];
        itemSku = _sku;
        itemName = item.name;
        if (item.itemState == State.ForSale) {
            itemState = "For Sale";
        }

        if (item.itemState == State.Sold) {
            itemState = "Sold";
        }

        if (item.itemState == State.Shipped) {
            itemState = "Shipped";
        }

        if (item.itemState == State.Received) {
            itemState = "Received";
        }

        if (item.itemState == State.Bouquet) {
            itemState = "Bouquet";
        }

        if (item.itemState == State.Purchased) {
            itemState = "Purchased";
        }

        itemOwner = item.currentOwner;
        itemFarmer = item.farmer;
        itemDistributor = item.distributor;
        itemRetailer = item.retailer;
        itemConsumer = item.consumer;
        itemWholesalePrice = item.wholesalePrice;
        itemRetailPrice = item.retailPrice;
    }

    function _make_payable(address x) internal pure returns (address payable) {
        return address(uint160(x));
    }
}
