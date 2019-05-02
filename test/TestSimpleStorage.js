const SimpleStorage = artifacts.require('SimpleStorage');

contract('SimpleStorage', (accounts) => {
    it('should store the value', async () => {
        const instance = await SimpleStorage.deployed();

        // Set value of 89
        await instance.set(89, { from: accounts[0] });

        // Get stored value
        const storedData = await instance.get.call();

        assert.equal(storedData, 89, 'The value 89 was not stored.');
    });
});
