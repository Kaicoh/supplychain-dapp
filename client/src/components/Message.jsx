import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Collapse, Alert } from 'reactstrap';
import { bsColors } from '../utils/bootstrap';

// eslint-disable-next-line object-curly-newline
const Message = ({ show, type, message, onDismiss }) => {
    const [timer, setTimer] = useState(null);

    const updateItmer = () => {
        if (show) {
            clearTimeout(timer);
            setTimer(setTimeout(onDismiss, 5000));
        }
        return () => clearTimeout(timer);
    };

    useEffect(updateItmer, [show]);

    return (
        <Collapse isOpen={show} onExited={onDismiss}>
            <Alert color={type}>
                {message}
            </Alert>
        </Collapse>
    );
};

Message.defaultProps = {
    show: false,
    type: 'success',
};

Message.propTypes = {
    show: PropTypes.bool,
    type: PropTypes.oneOf(bsColors),
    message: PropTypes.string.isRequired,
    onDismiss: PropTypes.func.isRequired,
};

export default Message;
