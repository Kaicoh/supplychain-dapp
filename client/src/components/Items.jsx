import React from 'react';
import { Row } from 'reactstrap';
import FetchItem from './FetchItem';
import contractProps from '../utils/contractProps';

const Items = ({ contract }) => (
    <div className="shadow p-3 mb-3 bg-light rounded">
        <h4>Handling Items</h4>
        <Row>
            <FetchItem
                contract={contract}
                containerClass="col-12"
            />
        </Row>
    </div>
);

Items.propTypes = {
    contract: contractProps.isRequired,
};

export default Items;
