import React from "react";
import { Route, Switch } from "react-router";
import { BrowserRouter } from "react-router-dom";
import Login from './components/Index/Login'
import Createcourse from './components/course/create-course'
import ListCourse from './components/course/list-course'

export default (
    <BrowserRouter basename="/">
        <Switch>
            <Route path="/login"
            component={Login}/> 

               <Route path="/createcourse"
            component={Createcourse}/>  
            <Route path="/courses"
            component={ListCourse}/>     

        </Switch>
    </BrowserRouter>
)
