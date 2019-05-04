const path = require('path');

module.exports = {
    networks: {
        development: {
            host: '127.0.0.1',
            port: 7545,
            network_id: '*',
        },
    },

    compilers: {
        solc: {
            version: '0.5.2',
        },
    },

    contracts_build_directory: path.join(__dirname, 'client/src/contracts'),
};
