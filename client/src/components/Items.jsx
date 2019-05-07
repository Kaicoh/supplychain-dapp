import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';
import FetchItem from './FetchItem';
import ItemTabs from './ItemTabs';
import SkuCount from './SkuCount';
import contractProps from '../utils/contractProps';
import EventObservable from '../utils/eventObservable';

const Items = ({ contract, containerClass, eventObservable }) => (
    <div className={containerClass}>
        <h4>Items</h4>
        <Row>
            <FetchItem
                fetchItem={contract.methods.fetchItem}
                containerClass="col-5"
            />
            <Col xs="7">
                <SkuCount
                    getSku={contract.methods.sku}
                    containerClass="mb-5"
                    eventObservable={eventObservable}
                />
                <ItemTabs
                    contract={contract}
                />
            </Col>
        </Row>
    </div>
);

Items.defaultProps = {
    containerClass: '',
    eventObservable: null,
};

Items.propTypes = {
    contract: contractProps.isRequired,
    containerClass: PropTypes.string,
    eventObservable: PropTypes.instanceOf(EventObservable),
};

export default Items;
