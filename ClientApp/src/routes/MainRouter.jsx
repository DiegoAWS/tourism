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
import Sales from "../pages/Sales/Sales"

import Packages from "../pages/Packages/Packages";


export default function MainRouter() {
    return (
        <Router>
           
            <div>
                <Switch>
                    <Route exact path="/" component={Landing} />


                    <Route exact path="/register" component={CreateUser} />


                    <SecureRoute exact path='/dashboard' roles={['ADMIN', 'USER']} component={Packages} />
                    <SecureRoute exact path='/sales' roles={['ADMIN', 'USER']} component={Sales} />
                   
                    <Route path="*"><Redirect to="/" /></Route>
                </Switch>
            </div>
        </Router>
    );
}

