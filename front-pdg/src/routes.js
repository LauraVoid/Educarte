import React from "react";
import { Route, Switch } from "react-router";
import { BrowserRouter } from "react-router-dom";
import Login from './components/Index/Login'

export default (
    <BrowserRouter basename="/">
        <Switch>
            <Route path="/login"
            component={Login}/>     

        </Switch>
    </BrowserRouter>
)
