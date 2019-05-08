import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    Spinner,
} from 'reactstrap';
import Message from './Message';
import { uploadToIPFS } from '../utils/ipfs';

const UploadFile = ({ uploadIPFSHash, containerClass }) => {
    const [sku, setSku] = useState(0);
    const [origin, setOrigin] = useState('');
    const [file, setFile] = useState(null);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const [loading, setLoading] = useState(false);

    const uploadFile = async () => {
        if (!sku || !origin || !file) return;

        setLoading(true);

        try {
            const response = await uploadToIPFS(file);
            const ipfsHash = response[0].hash;
            uploadIPFSHash(sku, ipfsHash).send({ from: origin })
                .on('confirmation', () => {
                    setShowSuccess(true);
                    setShowError(false);
                    setLoading(false);
                })
                .on('error', (error) => {
                    setShowSuccess(false);
                    setShowError(true);
                    setLoading(false);
                    console.error(error); // eslint-disable-line no-console
                });
        } catch (error) {
            setShowSuccess(false);
            setShowError(true);
            setLoading(false);
            console.error(error); // eslint-disable-line no-console
        }
    };

    return (
        <div className={containerClass}>
            <h5>upload item image</h5>
            <Message
                show={showSuccess}
                type="success"
                message="transaction confirmed successfully."
                onDismiss={() => setShowSuccess(false)}
            />
            <Message
                show={showError}
                type="danger"
                message="transaction failed. See console to confirm detail."
                onDismiss={() => setShowError(false)}
            />
            <Form>
                <FormGroup>
                    <Label for="uploadFileSku">sku</Label>
                    <Input
                        type="number"
                        name="uploadFileSku"
                        id="uploadFileSku"
                        placeholder="input sku"
                        value={sku}
                        onChange={event => setSku(event.target.value)}
                        disabled={loading}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="uploadFileFile">file to upload</Label>
                    <Input
                        type="file"
                        name="uploadFileFile"
                        id="uploadFileFile"
                        onChange={event => setFile(event.target.files[0])}
                        disabled={loading}
                    />
                </FormGroup>
                <hr />
                <FormGroup>
                    <Label for="uploadFileOrigin">transaction origin</Label>
                    <Input
                        type="text"
                        name="uploadFileOrigin"
                        id="uploadFileOrigin"
                        placeholder="input transaction origin"
                        value={origin}
                        onChange={event => setOrigin(event.target.value)}
                        disabled={loading}
                    />
                </FormGroup>
                <Button
                    color="primary"
                    onClick={uploadFile}
                    block
                    disabled={loading}
                >
                    {loading ? <Spinner color="light" /> : 'submit'}
                </Button>
            </Form>
        </div>
    );
};

UploadFile.defaultProps = {
    containerClass: '',
};

UploadFile.propTypes = {
    uploadIPFSHash: PropTypes.func.isRequired,
    containerClass: PropTypes.string,
};

export default UploadFile;
