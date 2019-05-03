const FarmerRole = artifacts.require('FarmerRole');

contract('FarmerRole', (accounts) => {
    describe('isFarmer', () => {
        it('returns true when given the owner of the contract', async () => {
            const instance = await FarmerRole.deployed();
            const isFarmer = await instance.isFarmer.call(accounts[0]);
            assert.equal(isFarmer, true);
        });

        it('returns false when given not a farmer', async () => {
            const instance = await FarmerRole.deployed();
            const isFarmer = await instance.isFarmer.call(accounts[1]);
            assert.equal(isFarmer, false);
        });
    });

    describe('addFarmer', () => {
        it('adds a farmer role', async () => {
            const instance = await FarmerRole.deployed();
            await instance.addFarmer(accounts[1], { from: accounts[0] });
            const isFarmer = await instance.isFarmer.call(accounts[1]);
            assert.equal(isFarmer, true);
        });

        it('does not add a farmer role when submitted from not a farmer', async () => {
            const instance = await FarmerRole.deployed();
            try {
                await instance.addFarmer(accounts[1], { from: accounts[1] });
                throw new Error('unreachable error');
            } catch (error) {
                assert(error.message !== 'unreachable error');
            }
        });
    });

    describe('renounceFarmer', () => {
        it('removes the farmer role', async () => {
            const instance = await FarmerRole.deployed();
            await instance.renounceFarmer({ from: accounts[0] });
            const isFarmer = await instance.isFarmer.call(accounts[0]);
            assert.equal(isFarmer, false);
        });
    });
});
