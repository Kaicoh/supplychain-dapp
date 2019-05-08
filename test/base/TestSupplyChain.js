const SupplyChain = artifacts.require('SupplyChain');
const truffleAssert = require('truffle-assertions');

contract('SupplyChain', (accounts) => {
    let owner;
    let farmer;
    let distributor;
    let retailer;
    let consumer;

    let instance;
    let sku;

    const wholesalePrice = web3.utils.toWei('.01', 'ether');
    const retailPrice = web3.utils.toWei('.025', 'ether');

    before(async () => {
        /* eslint-disable prefer-destructuring */
        owner = accounts[0];
        farmer = accounts[1];
        distributor = accounts[2];
        retailer = accounts[3];
        consumer = accounts[4];
        /* eslint-enable prefer-destructuring */

        instance = await SupplyChain.deployed();
        await instance.addFarmer(farmer, { from: owner });
        await instance.addDistributor(distributor, { from: owner });
        await instance.addRetailer(retailer, { from: owner });
        await instance.addConsumer(consumer, { from: owner });
    });

    beforeEach(async () => {
        instance = await SupplyChain.deployed();
    });

    describe('cultivateItem', () => {
        it('adds new item', async () => {
            await instance.cultivateItem('rose', wholesalePrice, { from: farmer });
            sku = await instance.sku.call();
            const response = await instance.fetchItem.call(sku);

            assert.equal(response.itemName, 'rose');
            assert.equal(response.itemOwner, farmer);
            assert.equal(response.itemFarmer, farmer);
            assert.equal(response.itemState, 'For Sale');
            assert.equal(response.itemWholesalePrice, wholesalePrice);
        });

        it('emits ForSale event', async () => {
            const tx = await instance.cultivateItem('rose', wholesalePrice, { from: farmer });
            sku = await instance.sku.call();
            truffleAssert.eventEmitted(tx, 'ForSale', event => event.sku.toNumber() === sku.toNumber());
        });

        it('reverts when requested by not farmer', async () => {
            try {
                await instance.cultivateItem('rose', wholesalePrice, { from: distributor });
                throw new Error('unreachable error');
            } catch (error) {
                assert(error.message !== 'unreachable error');
            }
        });
    });

    describe('buyItem', () => {
        beforeEach(async () => {
            await instance.cultivateItem('lily', wholesalePrice, { from: farmer });
            sku = await instance.sku.call();
        });

        it('changes the item states', async () => {
            await instance.buyItem(sku, {
                from: distributor,
                value: wholesalePrice,
            });

            const response = await instance.fetchItem.call(sku);

            assert.equal(response.itemOwner, distributor);
            assert.equal(response.itemDistributor, distributor);
            assert.equal(response.itemState, 'Sold');
        });

        it('consumes weis as much as wholesale price', async () => {
            const balanceBefore = await web3.eth.getBalance(distributor);

            await instance.buyItem(sku, {
                from: distributor,
                value: web3.utils.toWei('.015', 'ether'), // to make refund
                gasPrice: 0,
            });

            const balanceAfter = await web3.eth.getBalance(distributor);

            assert.equal(
                Number(balanceBefore) - Number(balanceAfter),
                Number(wholesalePrice),
            );
        });

        it('sends weis to farmer as much as wholesale price', async () => {
            const balanceBefore = await web3.eth.getBalance(farmer);

            await instance.buyItem(sku, {
                from: distributor,
                value: wholesalePrice,
            });

            const balanceAfter = await web3.eth.getBalance(farmer);

            assert.equal(
                Number(balanceAfter),
                Number(balanceBefore) + Number(wholesalePrice),
            );
        });

        it('emits Sold event', async () => {
            const tx = await instance.buyItem(sku, {
                from: distributor,
                value: wholesalePrice,
            });
            sku = await instance.sku.call();
            truffleAssert.eventEmitted(tx, 'Sold', event => event.sku.toNumber() === sku.toNumber());
        });

        it('reverts when requested by not distributor', async () => {
            try {
                await instance.buyItem(sku, {
                    from: retailer,
                    value: wholesalePrice,
                });
                throw new Error('unreachable error');
            } catch (error) {
                assert(error.message !== 'unreachable error');
            }
        });

        it('reverts when trying to buy not for sale item', async () => {
            try {
                await instance.buyItem(sku, {
                    from: distributor,
                    value: wholesalePrice,
                });
                // trying to buy solded item
                await instance.buyItem(sku, {
                    from: distributor,
                    value: wholesalePrice,
                });
                throw new Error('unreachable error');
            } catch (error) {
                assert(error.message !== 'unreachable error');
            }
        });
    });

    describe('shipItem', () => {
        beforeEach(async () => {
            await instance.cultivateItem('tulip', wholesalePrice, { from: farmer });
            sku = await instance.sku.call();

            await instance.buyItem(sku, { from: distributor, value: wholesalePrice });
        });

        it('changes the item states', async () => {
            await instance.shipItem(sku, { from: farmer });

            const response = await instance.fetchItem.call(sku);
            assert.equal(response.itemState, 'Shipped');
        });

        it('emits Shipped event', async () => {
            const tx = await instance.shipItem(sku, { from: farmer });
            sku = await instance.sku.call();
            truffleAssert.eventEmitted(tx, 'Shipped', event => event.sku.toNumber() === sku.toNumber());
        });

        it('reverts when requested by not farmer', async () => {
            try {
                await instance.shipItem(sku, { from: retailer });
                throw new Error('unreachable error');
            } catch (error) {
                assert(error.message !== 'unreachable error');
            }
        });

        it('reverts when trying to ship not sold item', async () => {
            await instance.cultivateItem('rose', wholesalePrice, { from: farmer });
            sku = await instance.sku.call();
            try {
                await instance.shipItem(sku, { from: farmer });
                throw new Error('unreachable error');
            } catch (error) {
                assert(error.message !== 'unreachable error');
            }
        });
    });

    describe('receiveItem', () => {
        beforeEach(async () => {
            await instance.cultivateItem('cosmos', wholesalePrice, { from: farmer });
            sku = await instance.sku.call();

            await instance.buyItem(sku, { from: distributor, value: wholesalePrice });
            await instance.shipItem(sku, { from: farmer });
        });

        it('changes the item states', async () => {
            await instance.receiveItem(sku, { from: retailer });

            const response = await instance.fetchItem.call(sku);
            assert.equal(response.itemOwner, retailer);
            assert.equal(response.itemRetailer, retailer);
            assert.equal(response.itemState, 'Received');
        });

        it('emits Received event', async () => {
            const tx = await instance.receiveItem(sku, { from: retailer });
            sku = await instance.sku.call();
            truffleAssert.eventEmitted(tx, 'Received', event => event.sku.toNumber() === sku.toNumber());
        });

        it('reverts when requested by not retailer', async () => {
            try {
                await instance.receiveItem(sku, { from: distributor });
                throw new Error('unreachable error');
            } catch (error) {
                assert(error.message !== 'unreachable error');
            }
        });

        it('reverts when trying to receive not shipped item', async () => {
            await instance.cultivateItem('rose', wholesalePrice, { from: farmer });
            sku = await instance.sku.call();
            try {
                await instance.receiveItem(sku, { from: retailer });
                throw new Error('unreachable error');
            } catch (error) {
                assert(error.message !== 'unreachable error');
            }
        });
    });

    describe('makeBouquet', () => {
        beforeEach(async () => {
            await instance.cultivateItem('dahlia', wholesalePrice, { from: farmer });
            sku = await instance.sku.call();

            await instance.buyItem(sku, { from: distributor, value: wholesalePrice });
            await instance.shipItem(sku, { from: farmer });
            await instance.receiveItem(sku, { from: retailer });
        });

        it('changes the item states', async () => {
            await instance.makeBouquet(sku, retailPrice, { from: retailer });

            const response = await instance.fetchItem.call(sku);
            assert.equal(response.itemState, 'Bouquet');
            assert.equal(response.itemRetailPrice, retailPrice);
        });

        it('emits Bouquet event', async () => {
            const tx = await instance.makeBouquet(sku, retailPrice, { from: retailer });
            sku = await instance.sku.call();
            truffleAssert.eventEmitted(tx, 'Bouquet', event => event.sku.toNumber() === sku.toNumber());
        });

        it('reverts when requested by not retailer', async () => {
            try {
                await instance.makeBouquet(sku, retailPrice, { from: distributor });
                throw new Error('unreachable error');
            } catch (error) {
                assert(error.message !== 'unreachable error');
            }
        });

        it('reverts when trying to receive not received item', async () => {
            await instance.cultivateItem('rose', wholesalePrice, { from: farmer });
            sku = await instance.sku.call();
            try {
                await instance.makeBouquet(sku, retailPrice, { from: retailer });
                throw new Error('unreachable error');
            } catch (error) {
                assert(error.message !== 'unreachable error');
            }
        });
    });

    describe('purchaseItem', () => {
        beforeEach(async () => {
            await instance.cultivateItem('turquoise', wholesalePrice, { from: farmer });
            sku = await instance.sku.call();

            await instance.buyItem(sku, { from: distributor, value: wholesalePrice });
            await instance.shipItem(sku, { from: farmer });
            await instance.receiveItem(sku, { from: retailer });
            await instance.makeBouquet(sku, retailPrice, { from: retailer });
        });

        it('changes the item states', async () => {
            await instance.purchaseItem(sku, { from: consumer, value: retailPrice });
            const response = await instance.fetchItem.call(sku);
            assert.equal(response.itemOwner, consumer);
            assert.equal(response.itemConsumer, consumer);
            assert.equal(response.itemState, 'Purchased');
        });

        it('consumes weis as much as retail price', async () => {
            const balanceBefore = await web3.eth.getBalance(consumer);

            await instance.purchaseItem(sku, {
                from: consumer,
                value: web3.utils.toWei('.03', 'ether'), // to make refund
                gasPrice: 0,
            });

            const balanceAfter = await web3.eth.getBalance(consumer);

            assert.equal(
                Number(balanceBefore) - Number(balanceAfter),
                Number(retailPrice),
            );
        });

        it('sends weis to distributor as much as retail price', async () => {
            const balanceBefore = await web3.eth.getBalance(distributor);

            await instance.purchaseItem(sku, { from: consumer, value: retailPrice });

            const balanceAfter = await web3.eth.getBalance(distributor);

            assert.equal(
                Number(balanceAfter),
                Number(balanceBefore) + Number(retailPrice),
            );
        });

        it('emits Purchased event', async () => {
            const tx = await instance.purchaseItem(sku, { from: consumer, value: retailPrice });
            sku = await instance.sku.call();
            truffleAssert.eventEmitted(tx, 'Purchased', event => event.sku.toNumber() === sku.toNumber());
        });

        it('reverts when requested by not consumer', async () => {
            try {
                await instance.purchaseItem(sku, { from: farmer, value: retailPrice });
                throw new Error('unreachable error');
            } catch (error) {
                assert(error.message !== 'unreachable error');
            }
        });

        it('reverts when trying to purchase not bouquet', async () => {
            await instance.cultivateItem('rose', wholesalePrice, { from: farmer });
            sku = await instance.sku.call();
            try {
                await instance.purchaseItem(sku, { from: consumer, value: retailPrice });
                throw new Error('unreachable error');
            } catch (error) {
                assert(error.message !== 'unreachable error');
            }
        });
    });

    describe('fetchItem', () => {
        it('returns item info', async () => {
            await instance.cultivateItem('carnation', wholesalePrice, { from: farmer });
            sku = await instance.sku.call();

            await instance.buyItem(sku, { from: distributor, value: wholesalePrice });
            await instance.shipItem(sku, { from: farmer });
            await instance.receiveItem(sku, { from: retailer });
            await instance.makeBouquet(sku, retailPrice, { from: retailer });
            await instance.purchaseItem(sku, { from: consumer, value: retailPrice });

            const response = await instance.fetchItem.call(sku);

            assert.equal(response.itemSku.toNumber(), sku.toNumber());
            assert.equal(response.itemName, 'carnation');
            assert.equal(response.itemState, 'Purchased');
            assert.equal(response.itemOwner, consumer);
            assert.equal(response.itemFarmer, farmer);
            assert.equal(response.itemDistributor, distributor);
            assert.equal(response.itemRetailer, retailer);
            assert.equal(response.itemConsumer, consumer);
            assert.equal(response.itemWholesalePrice, wholesalePrice);
            assert.equal(response.itemRetailPrice, retailPrice);
        });
    });
});
