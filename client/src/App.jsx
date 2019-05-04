import React, { useState, useEffect } from 'react';
import * as web3Adopter from './utils/web3Adopter';
import SimpleStorageContract from './contracts/SimpleStorage.json';
import './App.css';

const App = () => {
    const [web3, setWeb3] = useState(null);
    const [account, setAccount] = useState(null);
    const [contract, setContract] = useState(null);
    const [storageValue, setStorageValue] = useState(0);

    useEffect(() => {
        web3Adopter.init().then(setWeb3);
    }, []);

    useEffect(() => {
        if (web3) {
            web3.eth.getAccounts().then(accounts => setAccount(accounts[0]));
        }
    }, [web3]);

    useEffect(() => {
        if (web3) {
            web3.eth.net.getId().then((networkId) => {
                const deployedNetwork = SimpleStorageContract.networks[networkId];
                const instance = new web3.eth.Contract(
                    SimpleStorageContract.abi,
                    deployedNetwork && deployedNetwork.address,
                );
                setContract(instance);
            });
        }
    }, [web3]);

    useEffect(() => {
        if (account && contract) {
            const getStorageValue = () => {
                contract.methods.get().call().then((response) => {
                    setStorageValue(response.toNumber());
                });
            };

            getStorageValue();

            contract.methods.set(15).send({ from: account })
                .on('transactionHash', (hash) => {
                    console.log('transaction hash:', hash);
                })
                .on('confirmation', () => {
                    getStorageValue();
                })
                .on('error', (error) => {
                    console.log(error);
                });
        }
    }, [account, contract]);

    return (
        <div className="row justify-content-md-center">
            {web3 ? (
                <div className="col-8">
                    <h1>Good to Go!</h1>
                    <p>Your Truffle Box is installed and ready.</p>
                    <h2>Smart Contract Example</h2>
                    <p>
                        If your contracts compiled and migrated successfully, below will show
                        a stored value of 5 (by default).
                    </p>
                    <p>
                        Try changing the value stored on
                        <strong> line 40 </strong>
                        of App.js.
                    </p>
                    <div>
                        The stored value is:
                        {storageValue}
                    </div>
                </div>
            ) : (
                <p className="col-8">Loading Web3, accounts, and contract...</p>
            )}
        </div>
    );
};

export default App;
