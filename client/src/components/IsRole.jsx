import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    FormFeedback,
    Spinner,
} from 'reactstrap';
import useValid from '../hooks/useValid';

const IsRole = ({ containerClass, name, isRole }) => {
    const [target, setTarget] = useState('');
    const [loading, setLoading] = useState(false);
    const [valid, invalid, setValidities, clearValidities] = useValid();

    const onChangeText = (event) => {
        setTarget(event.target.value);
        clearValidities();
    };

    const capitalizedRole = `${name.charAt(0).toUpperCase()}${name.slice(1)}`;

    const targetID = `${name}ToAsk`;

    const onSubmit = () => {
        setLoading(true);
        isRole(target).call()
            .then((response) => {
                setValidities(response);
                setLoading(false);
            })
            .catch((error) => {
                setValidities(false);
                setLoading(false);
                console.error(error); // eslint-disable-line no-console
            });
    };

    return (
        <div className={containerClass}>
            <h5>{capitalizedRole}</h5>
            <Form>
                <FormGroup>
                    <Label for={targetID}>target address</Label>
                    <Input
                        type="text"
                        name={targetID}
                        id={targetID}
                        placeholder={`input ${name} address`}
                        value={target}
                        onChange={onChangeText}
                        valid={valid}
                        invalid={invalid}
                        disabled={loading}
                    />
                    {valid && (
                        <FormFeedback valid>
                            {`Yes, this is a ${name}!`}
                        </FormFeedback>
                    )}
                    {invalid && (
                        <FormFeedback>
                            {`No, this is not a ${name}..`}
                        </FormFeedback>
                    )}
                </FormGroup>
                <Button
                    color="primary"
                    onClick={onSubmit}
                    outline
                    block
                    disabled={loading}
                >
                    {loading ? <Spinner color="primary" /> : 'call'}
                </Button>
            </Form>
        </div>
    );
};

IsRole.defaultProps = {
    containerClass: '',
};

IsRole.propTypes = {
    containerClass: PropTypes.string,
    name: PropTypes.string.isRequired,
    isRole: PropTypes.func.isRequired,
};

export default IsRole;
