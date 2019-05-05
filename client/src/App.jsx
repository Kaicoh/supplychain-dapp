import React, { Fragment } from 'react';
import { Container, Spinner } from 'reactstrap';
import useContract from './hooks/useContract';
import Owner from './components/Owner';
import { IsRoles, AddRoles } from './components/AccessControl';

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
