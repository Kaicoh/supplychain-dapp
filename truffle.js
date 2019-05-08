const path = require('path');
const HDWalletProvider = require('truffle-hdwallet-provider');

require('dotenv').config();

const infuraKey = process.env.INFURA_KEY;
const mnemonic = process.env.METAMASK_MNEMONIC;

if (!infuraKey || !mnemonic) {
    throw new Error('Not found environment variables. INFURA_KEY, METAMASK_MNEMONIC.');
}

module.exports = {
    networks: {
        development: {
            host: '127.0.0.1',
            port: 7545,
            network_id: '*',
        },

        rinkeby: {
            provider: () => new HDWalletProvider(mnemonic, `https://rinkeby.infura.io/v3/${infuraKey}`),
            network_id: 4,
            gas: 4500000,
            gasPrice: 10000000000,
        },

    },

    compilers: {
        solc: {
            version: '0.5.2',
        },
    },

    contracts_build_directory: path.join(__dirname, 'client/src/contracts'),
};
