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
    }).isRequired,
});

export default contractProps;
