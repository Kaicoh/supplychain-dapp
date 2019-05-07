class BaseObservable {
    constructor(contractEvent) {
        // subscribers is a Set of functions.
        this.subscribers = new Set();

        contractEvent()
            .on('data', (event) => {
                this.subscribers.forEach((subscriber) => {
                    console.log('event', event);
                    subscriber(event);
                });
            })
            .on('error', console.error); // eslint-disable-line no-console
    }

    subscribe(subscriber) {
        this.subscribers.add(subscriber);
    }

    unsubscribe(subscriber) {
        this.subscribers.delete(subscriber);
    }
}

class ForSaleObservable extends BaseObservable {
    constructor(contract) {
        super(contract.events.ForSale);
    }
}

class SoldObservable extends BaseObservable {
    constructor(contract) {
        super(contract.events.Sold);
    }
}

class ShippedObservable extends BaseObservable {
    constructor(contract) {
        super(contract.events.Shipped);
    }
}

class ReceivedObservable extends BaseObservable {
    constructor(contract) {
        super(contract.events.Received);
    }
}

class BouquetObservable extends BaseObservable {
    constructor(contract) {
        super(contract.events.Bouquet);
    }
}

class PurchasedObservable extends BaseObservable {
    constructor(contract) {
        super(contract.events.Purchased);
    }
}

class EventObservable {
    constructor(contract) {
        this.forSaleObservable = new ForSaleObservable(contract);
        this.soldObservable = new SoldObservable(contract);
        this.shippedObservable = new ShippedObservable(contract);
        this.receivedObservable = new ReceivedObservable(contract);
        this.bouquetObservable = new BouquetObservable(contract);
        this.purchasedObservable = new PurchasedObservable(contract);
    }

    subscribeForSale(subscriber) {
        this.forSaleObservable.subscribe(subscriber);
    }

    subscribeSold(subscriber) {
        this.soldObservable.subscribe(subscriber);
    }

    subscribeShipped(subscriber) {
        this.shippedObservable.subscribe(subscriber);
    }

    subscribeReceived(subscriber) {
        this.receivedObservable.subscribe(subscriber);
    }

    subscribeBouquet(subscriber) {
        this.bouquetObservable.subscribe(subscriber);
    }

    subscribePurchases(subscriber) {
        this.purchasedObservable.subscribe(subscriber);
    }

    unsubscribeForSale(subscriber) {
        this.forSaleObservable.unsubscribe(subscriber);
    }

    unsubscribeSold(subscriber) {
        this.soldObservable.unsubscribe(subscriber);
    }

    unsubscribeShipped(subscriber) {
        this.shippedObservable.unsubscribe(subscriber);
    }

    unsubscribeReceived(subscriber) {
        this.receivedObservable.unsubscribe(subscriber);
    }

    unsubscribeBouquet(subscriber) {
        this.bouquetObservable.unsubscribe(subscriber);
    }

    unsubscribePurchased(subscriber) {
        this.purchasedObservable.unsubscribe(subscriber);
    }
}

export default EventObservable;
