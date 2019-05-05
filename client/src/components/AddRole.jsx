import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    FormFeedback,
} from 'reactstrap';
import useValid from '../hooks/useValid';

const AddRole = ({ containerClass, name, addRole }) => {
    const [target, setTarget] = useState('');
    const [origin, setOrigin] = useState('');
    const [valid, invalid, setValidities, clearValidities] = useValid();

    const onChangeText = setFunc => (event) => {
        setFunc(event.target.value);
        clearValidities();
    };
    const capitalizedRole = `${name.charAt(0).toUpperCase()}${name.slice(1)}`;

    const targetID = `${name}ToAdd`;
    const originID = `Adding${capitalizedRole}From`;

    const onSubmit = () => {
        addRole(target).send({ from: origin })
            .on('confirmation', () => {
                setValidities(true);
            })
            .on('error', (error) => {
                console.error(error); // eslint-disable-line no-console
                setValidities(false);
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
                        onChange={onChangeText(setTarget)}
                        valid={valid}
                        invalid={invalid}
                    />
                    {valid && <FormFeedback valid>Added successfully!</FormFeedback>}
                    {invalid && <FormFeedback valid>Failed to add...</FormFeedback>}
                </FormGroup>
                <FormGroup>
                    <Label for={originID}>from</Label>
                    <Input
                        type="text"
                        name={originID}
                        id={originID}
                        placeholder="input transaction origin"
                        value={origin}
                        onChange={onChangeText(setOrigin)}
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

AddRole.defaultProps = {
    containerClass: '',
};

AddRole.propTypes = {
    containerClass: PropTypes.string,
    name: PropTypes.string.isRequired,
    addRole: PropTypes.func.isRequired,
};

export default AddRole;
