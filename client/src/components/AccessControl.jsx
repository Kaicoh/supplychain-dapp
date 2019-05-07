import React from 'react';
import PropTypes from 'prop-types';
import { Row } from 'reactstrap';
import AddRole from './AddRole';
import IsRole from './IsRole';
import contractProps from '../utils/contractProps';

export const IsRoles = ({ contract, containerClass }) => (
    <div className={containerClass}>
        <h4>Is a Role?</h4>
        <Row>
            <IsRole
                containerClass="col-md-3 col-sm-6"
                name="farmer"
                isRole={contract.methods.isFarmer}
            />
            <IsRole
                containerClass="col-md-3 col-sm-6"
                name="distributor"
                isRole={contract.methods.isDistributor}
            />
            <IsRole
                containerClass="col-md-3 col-sm-6"
                name="retailer"
                isRole={contract.methods.isRetailer}
            />
            <IsRole
                containerClass="col-md-3 col-sm-6"
                name="consumer"
                isRole={contract.methods.isConsumer}
            />
        </Row>
    </div>
);

IsRoles.defaultProps = {
    containerClass: '',
};

IsRoles.propTypes = {
    contract: contractProps.isRequired,
    containerClass: PropTypes.string,
};

export const AddRoles = ({ contract, containerClass }) => (
    <div className={containerClass}>
        <h4>Add Role</h4>
        <Row>
            <AddRole
                containerClass="col-md-3 col-sm-6"
                name="farmer"
                addRole={contract.methods.addFarmer}
            />
            <AddRole
                containerClass="col-md-3 col-sm-6"
                name="distributor"
                addRole={contract.methods.addDistributor}
            />
            <AddRole
                containerClass="col-md-3 col-sm-6"
                name="retailer"
                addRole={contract.methods.addRetailer}
            />
            <AddRole
                containerClass="col-md-3 col-sm-6"
                name="consumer"
                addRole={contract.methods.addConsumer}
            />
        </Row>
    </div>
);

AddRoles.defaultProps = {
    containerClass: '',
};

AddRoles.propTypes = {
    contract: contractProps.isRequired,
    containerClass: PropTypes.string,
};
