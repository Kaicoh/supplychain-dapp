import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
    Button,
    Form,
    FormGroup,
    Label,
    Input,
} from 'reactstrap';
import Message from './Message';

const ReceiveItem = ({ receiveItem, containerClass }) => {
    const [sku, setSku] = useState(0);
    const [origin, setOrigin] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);

    const onChangeInput = setFunc => (event) => {
        setFunc(event.target.value);
        setShowSuccess(false);
        setShowError(false);
    };

    const onSubmit = () => {
        receiveItem(sku).send({ from: origin })
            .on('confirmation', () => {
                setShowSuccess(true);
                setShowError(false);
            })
            .on('error', (error) => {
                setShowSuccess(false);
                setShowError(true);
                console.error(error); // eslint-disable-line no-console
            });
    };

    return (
        <div className={containerClass}>
            <h5>receive item</h5>
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
                    <Label for="receiveItemSku">sku</Label>
                    <Input
                        type="number"
                        name="receiveItemSku"
                        id="receiveItemSku"
                        placeholder="input sku"
                        value={sku}
                        onChange={onChangeInput(setSku)}
                    />
                </FormGroup>
                <hr />
                <FormGroup>
                    <Label for="receiveItemOrigin">transaction origin</Label>
                    <Input
                        type="text"
                        name="receiveItemOrigin"
                        id="receiveItemOrigin"
                        placeholder="input transaction origin"
                        value={origin}
                        onChange={onChangeInput(setOrigin)}
                    />
                </FormGroup>
                <Button
                    color="primary"
                    onClick={onSubmit}
                    block
                >
                    submit
                </Button>
            </Form>
        </div>
    );
};

ReceiveItem.defaultProps = {
    containerClass: '',
};

ReceiveItem.propTypes = {
    receiveItem: PropTypes.func.isRequired,
    containerClass: PropTypes.string,
};

export default ReceiveItem;
