import React, { useState, useEffect } from 'react';
import { Spinner, Button } from 'reactstrap';
import contractProps from '../utils/contractProps';

const Owner = ({ contract }) => {
    const [owner, setOwner] = useState(null);
    const [loading, setLoading] = useState(true);

    const getOwner = () => {
        setLoading(true);
        contract.methods.owner().call().then((response) => {
            setOwner(response);
            setLoading(false);
        });
    };

    useEffect(getOwner, []);

    return (
        <div className="shadow p-3 mb-3 bg-light rounded">
            <h4>Contract Owner</h4>
            {loading ? (
                <Spinner color="primary" />
            ) : (
                <p>{owner}</p>
            )}
            {!loading && (
                <Button color="primary" onClick={getOwner}>
                    Reload
                </Button>
            )}
        </div>
    );
};

Owner.propTypes = {
    contract: contractProps.isRequired,
};

export default Owner;
