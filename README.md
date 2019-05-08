# Flower shop supply chain

Udacity Blockchain ND project 6

## program version

1.0.0

## rinkbey contract information
### contract address

[0x4423ef1Ca76cb31fDaDcFDEEeDb50532F0D95B08](https://rinkeby.etherscan.io/address/0x4423ef1ca76cb31fdadcfdeeedb50532f0d95b08)

### transaction hashes

| function | transaction hash |
----|----
| cultivateItem | [0x70130e02708057212bd78d60fb6038aba7bfd12afbad9f34aca28d5f1ceda9f4](https://rinkeby.etherscan.io/tx/0x70130e02708057212bd78d60fb6038aba7bfd12afbad9f34aca28d5f1ceda9f4) |
| upload | [0x8edb0d0ff61d1e68c905a8271781db8073decd456688c4c589c0470292b80ebe](https://rinkeby.etherscan.io/tx/0x8edb0d0ff61d1e68c905a8271781db8073decd456688c4c589c0470292b80ebe) |
| buyItem | [0x028ba38565ae77450d2a003295262589ad2654c4ede03e7dfa4c628a032fee61](https://rinkeby.etherscan.io/tx/0x028ba38565ae77450d2a003295262589ad2654c4ede03e7dfa4c628a032fee61) |
| shipItem | [0x45e7b56816c76ca71e41c2d93d1182e5a37d1e18b58ebae549ba25855a9eee1a](https://rinkeby.etherscan.io/tx/0x45e7b56816c76ca71e41c2d93d1182e5a37d1e18b58ebae549ba25855a9eee1a) |
| receiveItem | [0x49d8c588abce7142717507709d5394cfaa0312ddbb6bd6f0c51b2eca50842ebd](https://rinkeby.etherscan.io/tx/0x49d8c588abce7142717507709d5394cfaa0312ddbb6bd6f0c51b2eca50842ebd) |
| makeBouquet | [0xcb741a7d7fea0d5de9b45c1a2ce32e3ca3e2da89f13b6aeb59587202597f7069](https://rinkeby.etherscan.io/tx/0xcb741a7d7fea0d5de9b45c1a2ce32e3ca3e2da89f13b6aeb59587202597f7069) |
| purchaseItem | [0x039759fbf26ae58f6ad3e791bd494b46ab549c12ab9a31de8eafd976a6c8e27c](https://rinkeby.etherscan.io/tx/0x039759fbf26ae58f6ad3e791bd494b46ab549c12ab9a31de8eafd976a6c8e27c) |

## package versions

- node@10.15.3
- truffle@5.0.13
- web3@1.0.0-beta.54

## UML
UML.zip includes all the UML diagrams.

## libraries

| # | library | purpose |
----|----|----
| 1 | [react](https://github.com/facebook/react) | Building UI components |
| 2 | [bootstrap](https://github.com/twbs/bootstrap) | Styling components |
| 3 | [ipfs-http-client](https://github.com/ipfs/js-ipfs-http-client) | Interacting ipfs via http protocol |

## IPFS

This contract stores item image file to ipfs network and stores its ipfs hash to blockchain.

To store image file, send "upload" transaction with item sku and image file. Once uploaded, You can confirm the image via "fetchItem" call.

The owner of the item is only allowed to upload image file to the item.

| item state | item owner(role) |
----|----
| ForSale | Farmer |
| Sold | Distributor |
| Shipped | Distributor |
| Received | Retailer |
| Bouquet | Retailer |
| Purchased | Consumer |

## tracking function

You can see the item's state, properties and image (if uploaded) via "fetchItem" call.

## settings

Create .env file in the project root directory and set environment variables like this.

```
METAMASK_MNEMONIC=<Your MetaMask mnemonic>
INFURA_KEY=<Your infura project ID>
```

## how to test

Run these commands.

```
$ truffle compile
$ truffle migrate --reset
$ truffle test
```
