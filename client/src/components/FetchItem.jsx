import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
    Button,
    Row,
    Col,
    Form,
    FormGroup,
    Label,
    Input,
    Spinner,
} from 'reactstrap';

const DisabledForm = ({ type, label, value }) => {
    const capitalizedlabel = `${label.charAt(0).toUpperCase()}${label.slice(1)}`;
    const id = `fetchItem${capitalizedlabel}`;

    return (
        <FormGroup>
            <Label for={id}>{capitalizedlabel}</Label>
            <Input
                type={type}
                name={id}
                id={id}
                value={value}
                disabled
            />
        </FormGroup>
    );
};

DisabledForm.propTypes = {
    type: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
    ]).isRequired,
};

const FetchItem = ({ fetchItem, containerClass }) => {
    const [sku, setSku] = useState(0);
    const [name, setName] = useState('');
    const [itemState, setItemState] = useState('');
    const [owner, setOwner] = useState('');
    const [farmer, setFarmer] = useState('');
    const [distributor, setDistributor] = useState('');
    const [retailer, setRetailer] = useState('');
    const [consumer, setConsumer] = useState('');
    const [wholesalePrice, setWholesalePrice] = useState(0);
    const [retailPrice, setRetailePrice] = useState(0);
    const [ipfsHash, setIpfsHash] = useState('');
    const [loading, setLoading] = useState(false);

    const onSubmit = () => {
        setLoading(true);
        fetchItem(sku).call()
            .then((response) => {
                setName(response[1]);
                setItemState(response[2]);
                setOwner(response[3]);
                setFarmer(response[4]);
                setDistributor(response[5]);
                setRetailer(response[6]);
                setConsumer(response[7]);
                setWholesalePrice(response[8].toNumber());
                setRetailePrice(response[9].toNumber());
                setIpfsHash(response[10]);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                console.error(error); // eslint-disable-line no-console
            });
    };

    return (
        <div className={containerClass}>
            <h5>fetch item</h5>
            <Form>
                <Row form>
                    <Col sm={9}>
                        <FormGroup row>
                            <Label sm={2} for="fetchItemSku">Sku</Label>
                            <Col sm={10}>
                                <Input
                                    type="number"
                                    name="fetchItemSku"
                                    id="fetchItemSku"
                                    placeholder="input a sku"
                                    value={sku}
                                    onChange={event => setSku(event.target.value)}
                                    disabled={loading}
                                />
                            </Col>
                        </FormGroup>
                    </Col>
                    <Col sm={3}>
                        <Button
                            color="primary"
                            onClick={onSubmit}
                            outline
                            disabled={loading}
                            block
                        >
                            {loading ? <Spinner color="primary" /> : 'call'}
                        </Button>
                    </Col>
                </Row>
            </Form>
            <hr />
            <Form>
                <DisabledForm type="text" label="name" value={name} />
                <DisabledForm type="text" label="state" value={itemState} />
                <DisabledForm type="text" label="owner" value={owner} />
                <DisabledForm type="text" label="farmer" value={farmer} />
                <DisabledForm type="text" label="distributor" value={distributor} />
                <DisabledForm type="text" label="retailer" value={retailer} />
                <DisabledForm type="text" label="consumer" value={consumer} />
                <DisabledForm type="number" label="wholesalePrice" value={wholesalePrice} />
                <DisabledForm type="number" label="retailPrice" value={retailPrice} />
                {ipfsHash ? (
                    <img
                        src={`https://gateway.ipfs.io/ipfs/${ipfsHash}`}
                        alt={name}
                        style={{ width: '100%', marginTop: 10 }}
                    />
                ) : (
                    <p>no image</p>
                )}
            </Form>
        </div>
    );
};

FetchItem.defaultProps = {
    containerClass: '',
};

FetchItem.propTypes = {
    fetchItem: PropTypes.func.isRequired,
    containerClass: PropTypes.string,
};

export default FetchItem;
