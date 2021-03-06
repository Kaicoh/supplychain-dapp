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

const MakeBouquet = ({ makeBouquet, containerClass }) => {
    const [sku, setSku] = useState(0);
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
        makeBouquet(sku, price).send({ from: origin })
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
            <h5>make bouquet</h5>
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
                    <Label for="makeBouquetSku">sku</Label>
                    <Input
                        type="number"
                        name="makeBouquetSku"
                        id="makeBouquetSku"
                        placeholder="input sku"
                        value={sku}
                        onChange={onChangeInput(setSku)}
                        disabled={loading}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="makeBouquetPrice">retail price</Label>
                    <Input
                        type="number"
                        name="makeBouquetPrice"
                        id="makeBouquetPrice"
                        placeholder="input retail price"
                        value={price}
                        onChange={onChangeInput(setPrice)}
                        disabled={loading}
                    />
                </FormGroup>
                <hr />
                <FormGroup>
                    <Label for="makeBouquetOrigin">transaction origin</Label>
                    <Input
                        type="text"
                        name="makeBouquetOrigin"
                        id="makeBouquetOrigin"
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

MakeBouquet.defaultProps = {
    containerClass: '',
};

MakeBouquet.propTypes = {
    makeBouquet: PropTypes.func.isRequired,
    containerClass: PropTypes.string,
};

export default MakeBouquet;
