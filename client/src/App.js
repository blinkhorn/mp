import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Redux
import { Provider } from 'react-redux';

import './App.css';

const App = () => {
  return (
    // <Provider store={store}>
        <Router>
            <Fragment>
                <Navbar />
                <Route exact path="/" component={Landing} />
                <section className="container">
                    <Alert />
                    <Switch>
                        <Route
                            exact
                            path="/register"
                            component={Register}
                        />
                        <Route exact path="/login" component={Login} />
                        {/* <PrivateRoute exact path="/dashboard" component={Dashboard} /> */}
                    </Switch>
                </section>
            </Fragment>
        </Router>
    // </Provider>
);
}

export default App;
