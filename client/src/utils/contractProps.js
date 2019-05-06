import PropTypes from 'prop-types';

const contractProps = PropTypes.shape({
    methods: PropTypes.shape({
        owner: PropTypes.func.isRequired,

        isFarmer: PropTypes.func.isRequired,
        isDistributor: PropTypes.func.isRequired,
        isRetailer: PropTypes.func.isRequired,
        isConsumer: PropTypes.func.isRequired,

        addFarmer: PropTypes.func.isRequired,
        addDistributor: PropTypes.func.isRequired,
        addRetailer: PropTypes.func.isRequired,
        addConsumer: PropTypes.func.isRequired,

        cultivateItem: PropTypes.func.isRequired,
        buyItem: PropTypes.func.isRequired,
        shipItem: PropTypes.func.isRequired,
        receiveItem: PropTypes.func.isRequired,
        makeBouquet: PropTypes.func.isRequired,
        purchaseItem: PropTypes.func.isRequired,
        fetchItem: PropTypes.func.isRequired,
    }).isRequired,
});

export default contractProps;
