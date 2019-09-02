import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import Register from '../auth/Register';
import Login from '../auth/Login';
import Alert from '../layout/Alert';
import Dashboard from '../dashboard/Dashboard';
import Memories from '../memories/Memories';
import Memory from '../memory/Memory';
import NotFound from '../layout/NotFound';
import PrivateRoute from './PrivateRoute';

// Material imports
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    landingWrapper: {
        textAlign: 'center'
    }
});

const Routes = () => {
    const classes = useStyles();

    return (
        <Fragment>
            <CssBaseline />
            <Container maxWidth="lg">
                <div className={classes.landingWrapper}>
                    <Alert />
                    <Switch>
                        <Route exact path="/register" component={Register} />
                        <Route exact path="/login" component={Login} />
                        <PrivateRoute
                            exact
                            path="/dashboard"
                            component={Dashboard}
                        />
                        <PrivateRoute
                            exact
                            path="/memories"
                            component={Memories}
                        />
                        <PrivateRoute
                            exact
                            path="/memories/:id"
                            component={Memory}
                        />
                        <Route component={NotFound} />
                    </Switch>
                </div>
            </Container>
        </Fragment>
    );
};

export default Routes;
