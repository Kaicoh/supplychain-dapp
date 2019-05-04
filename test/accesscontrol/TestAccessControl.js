const AccessControl = artifacts.require('AccessControl');

contract('AccessControl', (accounts) => {
    describe('addAccessControlls', () => {
        it('adds all access controls to the account', async () => {
            const instance = await AccessControl.deployed();

            let isFarmer = await instance.isFarmer.call(accounts[1]);
            let isDistributor = await instance.isDistributor.call(accounts[1]);
            let isRetailer = await instance.isRetailer.call(accounts[1]);
            let isConsumer = await instance.isConsumer.call(accounts[1]);

            assert.equal(isFarmer, false);
            assert.equal(isDistributor, false);
            assert.equal(isRetailer, false);
            assert.equal(isConsumer, false);

            await instance.addAccessControls(accounts[1], { from: accounts[0] });

            isFarmer = await instance.isFarmer.call(accounts[1]);
            isDistributor = await instance.isDistributor.call(accounts[1]);
            isRetailer = await instance.isRetailer.call(accounts[1]);
            isConsumer = await instance.isConsumer.call(accounts[1]);

            assert.equal(isFarmer, true);
            assert.equal(isDistributor, true);
            assert.equal(isRetailer, true);
            assert.equal(isConsumer, true);
        });
    });

    describe('renounceAccessControlls', () => {
        it('removes all access controls from msg.sender', async () => {
            const instance = await AccessControl.deployed();
            await instance.renounceAccessControls({ from: accounts[0] });

            const isFarmer = await instance.isFarmer.call(accounts[0]);
            const isDistributor = await instance.isDistributor.call(accounts[0]);
            const isRetailer = await instance.isRetailer.call(accounts[0]);
            const isConsumer = await instance.isConsumer.call(accounts[0]);

            assert.equal(isFarmer, false);
            assert.equal(isDistributor, false);
            assert.equal(isRetailer, false);
            assert.equal(isConsumer, false);
        });
    });
});
