const DistributorRole = artifacts.require('DistributorRole');

contract('DistributorRole', (accounts) => {
    describe('isDistributor', () => {
        it('returns true when given the owner of the contract', async () => {
            const instance = await DistributorRole.deployed();
            const isDistributor = await instance.isDistributor.call(accounts[0]);
            assert.equal(isDistributor, true);
        });

        it('returns false when given not a distributor', async () => {
            const instance = await DistributorRole.deployed();
            const isDistributor = await instance.isDistributor.call(accounts[1]);
            assert.equal(isDistributor, false);
        });
    });

    describe('addDistributor', () => {
        it('adds a distributor role', async () => {
            const instance = await DistributorRole.deployed();
            await instance.addDistributor(accounts[1], { from: accounts[0] });
            const isDistributor = await instance.isDistributor.call(accounts[1]);
            assert.equal(isDistributor, true);
        });

        it('does not add a distributor role when submitted from not a distributor', async () => {
            const instance = await DistributorRole.deployed();
            try {
                await instance.addDistributor(accounts[1], { from: accounts[1] });
                throw new Error('unreachable error');
            } catch (error) {
                assert(error.message !== 'unreachable error');
            }
        });
    });

    describe('renounceDistributor', () => {
        it('removes the distributor role', async () => {
            const instance = await DistributorRole.deployed();
            await instance.renounceDistributor({ from: accounts[0] });
            const isDistributor = await instance.isDistributor.call(accounts[0]);
            assert.equal(isDistributor, false);
        });
    });
});
