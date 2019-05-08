import ipfsClient from 'ipfs-http-client';

const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });

// eslint-disable-next-line import/prefer-default-export
export const uploadToIPFS = file => new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
        const buffer = Buffer.from(event.target.result);
        ipfs.add(buffer, (error, response) => {
            if (error) {
                reject(error);
            }
            resolve(response);
        });
    };

    reader.onerror = error => reject(error);

    reader.readAsArrayBuffer(file);
});
