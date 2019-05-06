import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
    TabContent,
    TabPane,
    Nav,
    NavItem,
    NavLink,
} from 'reactstrap';
import classnames from 'classnames';
import CultivateItem from './CultivateItem';
import BuyItem from './BuyItem';
import ShipItem from './ShipItem';
import ReceiveItem from './ReceiveItem';
import MakeBouquet from './MakeBouquet';
import PurchaseItem from './PurchaseItem';
import contractProps from '../utils/contractProps';

const ItemTabs = ({ contract, containerClass }) => {
    const [activeTab, setActiveTab] = useState('cultivateItem');

    return (
        <div className={containerClass}>
            <Nav tabs>
                <NavItem>
                    <NavLink
                        className={classnames({ active: activeTab === 'cultivateItem' })}
                        onClick={() => setActiveTab('cultivateItem')}
                    >
                        cultivate
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        className={classnames({ active: activeTab === 'buyItem' })}
                        onClick={() => setActiveTab('buyItem')}
                    >
                        buy
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        className={classnames({ active: activeTab === 'shipItem' })}
                        onClick={() => setActiveTab('shipItem')}
                    >
                        ship
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        className={classnames({ active: activeTab === 'receiveItem' })}
                        onClick={() => setActiveTab('receiveItem')}
                    >
                        receive
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        className={classnames({ active: activeTab === 'makeBouquet' })}
                        onClick={() => setActiveTab('makeBouquet')}
                    >
                        bouquet
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        className={classnames({ active: activeTab === 'purchaseItem' })}
                        onClick={() => setActiveTab('purchaseItem')}
                    >
                        purchase
                    </NavLink>
                </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
                <TabPane tabId="cultivateItem">
                    <CultivateItem cultivateItem={contract.methods.cultivateItem} />
                </TabPane>
                <TabPane tabId="buyItem">
                    <BuyItem buyItem={contract.methods.buyItem} />
                </TabPane>
                <TabPane tabId="shipItem">
                    <ShipItem shipItem={contract.methods.shipItem} />
                </TabPane>
                <TabPane tabId="receiveItem">
                    <ReceiveItem receiveItem={contract.methods.receiveItem} />
                </TabPane>
                <TabPane tabId="makeBouquet">
                    <MakeBouquet makeBouquet={contract.methods.makeBouquet} />
                </TabPane>
                <TabPane tabId="purchaseItem">
                    <PurchaseItem purchaseItem={contract.methods.purchaseItem} />
                </TabPane>
            </TabContent>
        </div>
    );
};

ItemTabs.defaultProps = {
    containerClass: '',
};

ItemTabs.propTypes = {
    contract: contractProps.isRequired,
    containerClass: PropTypes.string,
};

export default ItemTabs;
