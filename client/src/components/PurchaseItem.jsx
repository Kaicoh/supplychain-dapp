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

const PurchaseItem = ({ purchaseItem, containerClass }) => {
    const [sku, setSku] = useState(0);
    const [price, setPrice] = useState(0);
    const [origin, setOrigin] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);

    const onChangeInput = setFunc => (event) => {
        setFunc(event.target.value);
        setShowSuccess(false);
        setShowError(false);
    };

    const onSubmit = () => {
        purchaseItem(sku).send({ from: origin, value: price })
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
            <h5>purchase item</h5>
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
                    <Label for="purchaseItemSku">sku</Label>
                    <Input
                        type="number"
                        name="purchaseItemSku"
                        id="purchaseItemSku"
                        placeholder="input sku"
                        value={sku}
                        onChange={onChangeInput(setSku)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="purchaseItemPrice">item price</Label>
                    <Input
                        type="number"
                        name="purchaseItemPrice"
                        id="purchaseItemPrice"
                        placeholder="input price"
                        value={price}
                        onChange={onChangeInput(setPrice)}
                    />
                </FormGroup>
                <hr />
                <FormGroup>
                    <Label for="purchaseItemOrigin">transaction origin</Label>
                    <Input
                        type="text"
                        name="purchaseItemOrigin"
                        id="purchaseItemOrigin"
                        placeholder="input transaction origin"
                        value={origin}
                        onChange={onChangeInput(setOrigin)}
                    />
                </FormGroup>
                <Button
                    color="primary"
                    onClick={onSubmit}
                >
                    submit
                </Button>
            </Form>
        </div>
    );
};

PurchaseItem.defaultProps = {
    containerClass: '',
};

PurchaseItem.propTypes = {
    purchaseItem: PropTypes.func.isRequired,
    containerClass: PropTypes.string,
};

export default PurchaseItem;
