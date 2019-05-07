import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Spinner, Button } from 'reactstrap';

const Owner = ({ getOwner, containerClass }) => {
    const [owner, setOwner] = useState(null);
    const [loading, setLoading] = useState(true);

    const loadOwner = () => {
        setLoading(true);
        getOwner().call().then((response) => {
            setOwner(response);
            setLoading(false);
        });
    };

    useEffect(loadOwner, []);

    return (
        <div className={containerClass}>
            <h4>Contract Owner</h4>
            {loading ? (
                <Spinner color="primary" />
            ) : (
                <p>{owner}</p>
            )}
            {!loading && (
                <Button
                    outline
                    block
                    color="primary"
                    onClick={loadOwner}
                    disabled={loading}
                >
                    Reload
                </Button>
            )}
        </div>
    );
};

Owner.defaultProps = {
    containerClass: '',
};

Owner.propTypes = {
    getOwner: PropTypes.func.isRequired,
    containerClass: PropTypes.string,
};

export default Owner;
