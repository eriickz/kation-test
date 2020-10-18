import React, { Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';

import routes from '../routes';

const Loader = () => {
    return (
        <div className="text-center">
            <h1>Loading!...</h1>
        </div>
    )
}

function App() {
    const appRoutes = routes.map(( route, index ) => (
        <Route
            key={index}
            path={route.path}
            exact={route.exact}
            render={props => (
                <route.component {...props} />
            )} />
    ));

    return(
        <Suspense fallback={<Loader />}>
            <Switch>
                {appRoutes}
            </Switch>
        </Suspense>
    )
}

export default App;
