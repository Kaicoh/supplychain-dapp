import React from 'react';
import PropTypes from 'prop-types';
import { Row } from 'reactstrap';
import AddRole from './AddRole';
import IsRole from './IsRole';

const contractPropTypes = PropTypes.shape({
    methods: PropTypes.shape({
        // is Role?
        isFarmer: PropTypes.func.isRequired,
        isDistributor: PropTypes.func.isRequired,
        isRetailer: PropTypes.func.isRequired,
        isConsumer: PropTypes.func.isRequired,

        // add Role
        addFarmer: PropTypes.func.isRequired,
        addDistributor: PropTypes.func.isRequired,
        addRetailer: PropTypes.func.isRequired,
        addConsumer: PropTypes.func.isRequired,
    }).isRequired,
});

export const IsRoles = ({ contract }) => (
    <div className="shadow p-3 mb-3 bg-light rounded">
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

IsRoles.propTypes = {
    contract: contractPropTypes.isRequired,
};

export const AddRoles = ({ contract }) => (
    <div className="shadow p-3 mb-3 bg-light rounded">
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

AddRoles.propTypes = {
    contract: contractPropTypes.isRequired,
};
