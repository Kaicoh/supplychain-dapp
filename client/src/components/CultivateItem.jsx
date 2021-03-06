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

const CultivateItem = ({ cultivateItem, containerClass }) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [origin, setOrigin] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const [loading, setLoading] = useState(false);

    const onChangeInput = setFunc => (event) => {
        setFunc(event.target.value);
        setShowSuccess(false);
        setShowError(false);
    };

    const onSubmit = () => {
        setLoading(true);
        cultivateItem(name, price).send({ from: origin })
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
    };

    return (
        <div className={containerClass}>
            <h5>cultivate item</h5>
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
                    <Label for="cultivateItemName">item name</Label>
                    <Input
                        type="text"
                        name="cultivateItemName"
                        id="cultivateItemName"
                        placeholder="input item's name"
                        value={name}
                        onChange={onChangeInput(setName)}
                        disabled={loading}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="cultivateItemWholesalePrice">wholesale price</Label>
                    <Input
                        type="number"
                        name="cultivateItemWholesalePrice"
                        id="cultivateItemWholesalePrice"
                        placeholder="input wholesale price"
                        value={price}
                        onChange={onChangeInput(setPrice)}
                        disabled={loading}
                    />
                </FormGroup>
                <hr />
                <FormGroup>
                    <Label for="cultivateItemOrigin">transaction origin</Label>
                    <Input
                        type="text"
                        name="cultivateItemOrigin"
                        id="cultivateItemOrigin"
                        placeholder="input transaction origin"
                        value={origin}
                        onChange={onChangeInput(setOrigin)}
                        disabled={loading}
                    />
                </FormGroup>
                <Button
                    color="primary"
                    onClick={onSubmit}
                    block
                    disabled={loading}
                >
                    {loading ? <Spinner color="light" /> : 'submit'}
                </Button>
            </Form>
        </div>
    );
};

CultivateItem.defaultProps = {
    containerClass: '',
};

CultivateItem.propTypes = {
    cultivateItem: PropTypes.func.isRequired,
    containerClass: PropTypes.string,
};

export default CultivateItem;
