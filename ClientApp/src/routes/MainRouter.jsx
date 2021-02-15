import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";

import Landing from '../pages/Landing'
import SecureRoute from "./SecureRoute";

import CreateUser from '../components/CreateUser'
import Transfers from "../pages/Transfers/Transfers"
import Navbar from "../components/Navbar";
import Packages from "../pages/Packages/Packages";


export default function MainRouter() {
    return (
        <Router>
            <Navbar />
            <div>
                <Switch>
                    <Route exact path="/" component={Landing} />


                    <Route exact path="/register" component={CreateUser} />


                    <SecureRoute exact path='/dashboard' roles={['ADMIN', 'USER']} component={Packages} />
                    <SecureRoute exact path='/sales' roles={['ADMIN', 'USER']} component={Transfers} />
                    <SecureRoute exact path='/hotels' roles={['ADMIN', 'USER']} component={Transfers} />
                    <SecureRoute exact path='/transfers' roles={['ADMIN', 'USER']} component={Transfers} />
                    <SecureRoute exact path='/excursions' roles={['ADMIN', 'USER']} component={Transfers} />

                    <Route path="*"><Redirect to="/" /></Route>
                </Switch>
            </div>
        </Router>
    );
}

