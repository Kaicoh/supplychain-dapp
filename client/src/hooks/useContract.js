import { useState, useEffect } from 'react';
import Web3 from 'web3';
import CoreContract from '../contracts/Core.json';

const useContract = () => {
    const [web3, setWeb3] = useState(null);
    const [contract, setContract] = useState(null);

    const reloadWeb3 = () => {
        if (window.ethereum) {
            // Modern dapp browsers
            const web3Instance = new Web3(window.ethereum);
            window.ethereum
                .enable()
                .then(() => setWeb3(web3Instance))
                .catch(error => console.error(error)); // eslint-disable-line no-console
        } else if (window.web3) {
            // Legacy dapp browsers
            setWeb3(window.web3);
        } else {
            // Fallback to localhost; use dev console port by default
            const provider = new Web3.providers.HttpProvider('http://127.0.0.1:8545');
            setWeb3(new Web3(provider));
        }
    };

    useEffect(reloadWeb3, []);

    useEffect(() => {
        if (web3) {
            web3.eth.net.getId().then((networkId) => {
                const deployedNetwork = CoreContract.networks[networkId];
                const instance = new web3.eth.Contract(
                    CoreContract.abi,
                    deployedNetwork && deployedNetwork.address,
                );
                setContract(instance);
            });
        }
    }, [web3]);

    return [contract, reloadWeb3];
};

export default useContract;
