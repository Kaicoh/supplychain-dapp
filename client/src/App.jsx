import React, { Fragment } from 'react';
import { Container, Spinner } from 'reactstrap';
import useContract from './hooks/useContract';
import Owner from './components/Owner';
import { IsRoles, AddRoles } from './components/AccessControl';
import Items from './components/Items';

const App = () => {
    const [contract] = useContract();

    return (
        <Container>
            <h1>Flower shop supply chain</h1>
            {contract ? (
                <Fragment>
                    <Owner contract={contract} />
                    <IsRoles contract={contract} />
                    <AddRoles contract={contract} />
                    <Items contract={contract} />
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
