import React, { Fragment } from 'react';
import { Container, Spinner } from 'reactstrap';
import useContract from './hooks/useContract';
import Owner from './components/Owner';
import { IsRoles, AddRoles } from './components/AccessControl';
import Items from './components/Items';

const App = () => {
    const [contract, eventObservable] = useContract();

    return (
        <Container>
            <h1>Flower shop supply chain</h1>
            {contract ? (
                <Fragment>
                    <Owner
                        containerClass="shadow p-3 mb-3 bg-light rounded"
                        getOwner={contract.methods.owner}
                    />
                    <IsRoles
                        containerClass="shadow p-3 mb-3 bg-light rounded"
                        contract={contract}
                    />
                    <AddRoles
                        containerClass="shadow p-3 mb-3 bg-light rounded"
                        contract={contract}
                    />
                    <Items
                        containerClass="shadow p-3 mb-3 bg-light rounded"
                        contract={contract}
                        eventObservable={eventObservable}
                    />
                </Fragment>
            ) : (
                <div className="row justify-content-center align-items-center">
                    <Spinner
                        style={{ width: '3rem', height: '3rem' }}
                        type="grow"
                        color="primary"
                    />
                </div>
            )}
        </Container>
    );
};

export default App;
