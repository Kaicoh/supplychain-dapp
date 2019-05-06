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

const BuyItem = ({ buyItem, containerClass }) => {
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
        buyItem(sku).send({ from: origin, value: price })
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
            <h5>buy item</h5>
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
                    <Label for="buyItemSku">sku</Label>
                    <Input
                        type="number"
                        name="buyItemSku"
                        id="buyItemSku"
                        placeholder="input sku"
                        value={sku}
                        onChange={onChangeInput(setSku)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="buyItemPrice">item price</Label>
                    <Input
                        type="number"
                        name="buyItemPrice"
                        id="buyItemPrice"
                        placeholder="input price"
                        value={price}
                        onChange={onChangeInput(setPrice)}
                    />
                </FormGroup>
                <hr />
                <FormGroup>
                    <Label for="buyItemOrigin">transaction origin</Label>
                    <Input
                        type="text"
                        name="buyItemOrigin"
                        id="buyItemOrigin"
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

BuyItem.defaultProps = {
    containerClass: '',
};

BuyItem.propTypes = {
    buyItem: PropTypes.func.isRequired,
    containerClass: PropTypes.string,
};

export default BuyItem;
