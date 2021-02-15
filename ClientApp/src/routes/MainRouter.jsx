import React from "react";
import {
   
    Switch,
    Route,
    Redirect,
    withRouter
} from "react-router-dom";

import Landing from '../pages/Landing'
import SecureRoute from "./SecureRoute";

import CreateUser from '../components/CreateUser'
import Sales from "../pages/Sales/Sales"

import Packages from "../pages/Packages/Packages";


export default withRouter(function MainRouter() {
    return (
       
           
            <div>
                <Switch>
                    <Route exact path="/" component={Landing} />


                    <Route exact path="/register" component={CreateUser} />


                    <SecureRoute exact path='/dashboard' roles={['ADMIN', 'USER']} component={Packages} />
                    <SecureRoute exact path='/sales' roles={['ADMIN', 'USER']} component={Sales} />
                   
                    <Route path="*"><Redirect to="/" /></Route>
                </Switch>
            </div>
   
    );
})

