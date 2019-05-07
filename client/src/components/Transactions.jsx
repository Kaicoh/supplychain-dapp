import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'reactstrap';
import EventObservable from '../utils/eventObservable';

class Transaction {
    constructor(event) {
        this.hash = event.transactionHash;
        this.event = event.event;
        this.sku = event.returnValues[0].toNumber();
        this.timestamp = new Date();
    }

    get received() {
        return this.timestamp.toString().split(/\s+GMT/)[0];
    }
}

const Row = ({ transaction }) => (
    <tr>
        <td>{transaction.received}</td>
        <td>{transaction.hash}</td>
        <td>{transaction.event}</td>
        <td>{transaction.sku}</td>
    </tr>
);

Row.propTypes = {
    transaction: PropTypes.instanceOf(Transaction).isRequired,
};

const Transactions = ({ eventObservable, containerClass }) => {
    const [transactions, setTransactions] = useState([]);

    const pushTransaction = (event) => {
        if (!transactions.map(tx => tx.hash).includes(event.transactionHash)) {
            const newTransaction = new Transaction(event);
            const newTransactions = [newTransaction, ...transactions]
                .sort((a, b) => b.timestamp - a.timestamp);
            setTransactions(newTransactions);
        }
    };

    const subscription = () => {
        if (eventObservable) {
            eventObservable.unsubscribeAll(pushTransaction);
            eventObservable.subscribeAll(pushTransaction);
            return () => eventObservable.unsubscribeAll(pushTransaction);
        }
        return f => f;
    };

    useEffect(subscription, [transactions, eventObservable]);

    return (
        <div className={containerClass}>
            <h4>Transactions</h4>
            <Table striped>
                <thead>
                    <tr>
                        <th>Timestamp</th>
                        <th>Transaction Hash</th>
                        <th>Event</th>
                        <th>Sku</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map(transaction => (
                        <Row
                            key={transaction.hash}
                            transaction={transaction}
                        />
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

Transactions.defaultProps = {
    eventObservable: null,
    containerClass: '',
};

Transactions.propTypes = {
    eventObservable: PropTypes.instanceOf(EventObservable),
    containerClass: PropTypes.string,
};

export default Transactions;
