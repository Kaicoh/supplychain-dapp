const Ownable = artifacts.require('Ownable');

contract('Ownable', (accounts) => {
    let instance;

    beforeEach(async () => {
        instance = await Ownable.deployed();
    });

    describe('owner', () => {
        it('returns owner address', async () => {
            const owner = await instance.owner.call();
            assert.equal(owner, accounts[0]);
        });
    });

    describe('isOwner', () => {
        it('returns true when given owner address', async () => {
            const isOwner = await instance.isOwner.call({ from: accounts[0] });
            assert.equal(isOwner, true);
        });

        it('returns false when given not owner address', async () => {
            const isOwner = await instance.isOwner.call({ from: accounts[1] });
            assert.equal(isOwner, false);
        });
    });

    describe('transferOwnership', () => {
        // change owner from accounts[0] to accounts[1]
        it('changes the owner', async () => {
            await instance.transferOwnership(accounts[1], { from: accounts[0] });

            let isOwner = await instance.isOwner.call({ from: accounts[0] });
            assert.equal(isOwner, false);

            isOwner = await instance.isOwner.call({ from: accounts[1] });
            assert.equal(isOwner, true);
        });

        it('reverts when requested by not owner', async () => {
            try {
                await instance.transferOwnership(accounts[2], { from: accounts[0] });
                throw new Error('unreachable error');
            } catch (error) {
                assert(error.message !== 'unreachable error');
            }
        });
    });

    describe('renounceOwnership', () => {
        // owner is accounts[1]
        it('reverts when requested by not owner', async () => {
            try {
                await instance.renounceOwnership({ from: accounts[0] });
                throw new Error('unreachable error');
            } catch (error) {
                assert(error.message !== 'unreachable error');
            }
        });

        it('removes the ownership from the owner', async () => {
            await instance.renounceOwnership({ from: accounts[1] });
            const isOwner = await instance.isOwner.call({ from: accounts[1] });
            assert.equal(isOwner, false);
        });
    });
});
