import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";

import Landing from '../pages/Landing'
import Dashboard from "../pages/Dashboard";
import SecureRoute from "./SecureRoute";

import CreateUser from '../components/CreateUser'

export default function MainRouter() {
    return (
        <Router>
            <div>
                <Switch>
                    <Route exact path="/" component={Landing} />
                    <Route exact path="/register" component={CreateUser} />
                    <SecureRoute exact path='/dashboard' roles={['ADMIN', 'USER']} component={Dashboard} />

                </Switch>
            </div>
        </Router>
    );
}

