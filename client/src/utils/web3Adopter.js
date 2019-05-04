import Web3 from 'web3';

let web3;

// eslint-disable-next-line import/prefer-default-export
export const init = () => new Promise(async (resolve, reject) => {
    if (window.ethereum) {
        // Modern dapp browsers
        console.log('Modern dapp browsers'); // eslint-disable-line no-console
        web3 = new Web3(window.ethereum);

        try {
            // Request account access if needed
            await window.ethereum.enable();
            // Acccounts now exposed
            resolve(web3);
        } catch (error) {
            reject(error);
        }
    } else if (window.web3) {
        // Legacy dapp browsers
        web3 = window.web3; // eslint-disable-line prefer-destructuring
        console.log('Injected web3 detected.'); // eslint-disable-line no-console
        resolve(web3);
    } else {
        // Fallback to localhost; use dev console port by default
        const provider = new Web3.providers.HttpProvider('http://127.0.0.1:8545');
        web3 = new Web3(provider);
        console.log('No web3 instance injected, using Local web3.'); // eslint-disable-line no-console
        resolve(web3);
    }
});
