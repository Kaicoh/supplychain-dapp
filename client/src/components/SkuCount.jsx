import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Spinner, Button } from 'reactstrap';
import EventObservable from '../utils/eventObservable';

const SkuCount = ({ getSku, containerClass, eventObservable }) => {
    const [sku, setSku] = useState(0);
    const [loading, setLoading] = useState(true);

    const loadSku = () => {
        setLoading(true);
        getSku().call().then((response) => {
            setSku(response.toNumber());
            setLoading(false);
        });
    };

    const subscription = () => {
        if (eventObservable) {
            eventObservable.subscribeForSale(loadSku);
            return () => eventObservable.unsubscribeForSale(loadSku);
        }
        return f => f;
    };

    useEffect(loadSku, []);
    useEffect(subscription, [eventObservable]);

    return (
        <div className={containerClass}>
            <h5 className="d-inline-block mr-5">current sku count</h5>
            {loading ? (
                <Spinner color="primary" />
            ) : (
                <strong className="text-primary h1">{sku}</strong>
            )}
            {!loading && (
                <Button
                    block
                    outline
                    color="primary"
                    onClick={loadSku}
                    disabled={loading}
                >
                    Reload
                </Button>
            )}
        </div>
    );
};

SkuCount.defaultProps = {
    containerClass: '',
    eventObservable: null,
};

SkuCount.propTypes = {
    getSku: PropTypes.func.isRequired,
    containerClass: PropTypes.string,
    eventObservable: PropTypes.instanceOf(EventObservable),
};

export default SkuCount;
