const RetailerRole = artifacts.require('RetailerRole');

contract('RetailerRole', (accounts) => {
    describe('isRetailer', () => {
        it('returns true when given the owner of the contract', async () => {
            const instance = await RetailerRole.deployed();
            const isRetailer = await instance.isRetailer.call(accounts[0]);
            assert.equal(isRetailer, true);
        });

        it('returns false when given not a retailer', async () => {
            const instance = await RetailerRole.deployed();
            const isRetailer = await instance.isRetailer.call(accounts[1]);
            assert.equal(isRetailer, false);
        });
    });

    describe('addRetailer', () => {
        it('adds a retailer role', async () => {
            const instance = await RetailerRole.deployed();
            await instance.addRetailer(accounts[1], { from: accounts[0] });
            const isRetailer = await instance.isRetailer.call(accounts[1]);
            assert.equal(isRetailer, true);
        });

        it('does not add a retailer role when submitted from not a retailer', async () => {
            const instance = await RetailerRole.deployed();
            try {
                await instance.addRetailer(accounts[1], { from: accounts[1] });
                throw new Error('unreachable error');
            } catch (error) {
                assert(error.message !== 'unreachable error');
            }
        });
    });

    describe('renounceRetailer', () => {
        it('removes the retailer role', async () => {
            const instance = await RetailerRole.deployed();
            await instance.renounceRetailer({ from: accounts[0] });
            const isRetailer = await instance.isRetailer.call(accounts[0]);
            assert.equal(isRetailer, false);
        });
    });
});
