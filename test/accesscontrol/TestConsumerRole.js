const ConsumerRole = artifacts.require('ConsumerRole');

contract('ConsumerRole', (accounts) => {
    describe('isConsumer', () => {
        it('returns true when given the owner of the contract', async () => {
            const instance = await ConsumerRole.deployed();
            const isConsumer = await instance.isConsumer.call(accounts[0]);
            assert.equal(isConsumer, true);
        });

        it('returns false when given not a consumer', async () => {
            const instance = await ConsumerRole.deployed();
            const isConsumer = await instance.isConsumer.call(accounts[1]);
            assert.equal(isConsumer, false);
        });
    });

    describe('addConsumer', () => {
        it('adds a consumer role', async () => {
            const instance = await ConsumerRole.deployed();
            await instance.addConsumer(accounts[1], { from: accounts[0] });
            const isConsumer = await instance.isConsumer.call(accounts[1]);
            assert.equal(isConsumer, true);
        });

        it('does not add a consumer role when submitted from not a consumer', async () => {
            const instance = await ConsumerRole.deployed();
            try {
                await instance.addConsumer(accounts[1], { from: accounts[1] });
                throw new Error('unreachable error');
            } catch (error) {
                assert(error.message !== 'unreachable error');
            }
        });
    });

    describe('renounceConsumer', () => {
        it('removes the consumer role', async () => {
            const instance = await ConsumerRole.deployed();
            await instance.renounceConsumer({ from: accounts[0] });
            const isConsumer = await instance.isConsumer.call(accounts[0]);
            assert.equal(isConsumer, false);
        });
    });
});
