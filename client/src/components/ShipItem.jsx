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

const ShipItem = ({ shipItem, containerClass }) => {
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
        shipItem(sku).send({ from: origin })
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
            <h5>ship item</h5>
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
                    <Label for="shipItemSku">sku</Label>
                    <Input
                        type="number"
                        name="shipItemSku"
                        id="shipItemSku"
                        placeholder="input sku"
                        value={sku}
                        onChange={onChangeInput(setSku)}
                    />
                </FormGroup>
                <hr />
                <FormGroup>
                    <Label for="shipItemOrigin">transaction origin</Label>
                    <Input
                        type="text"
                        name="shipItemOrigin"
                        id="shipItemOrigin"
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

ShipItem.defaultProps = {
    containerClass: '',
};

ShipItem.propTypes = {
    shipItem: PropTypes.func.isRequired,
    containerClass: PropTypes.string,
};

export default ShipItem;
