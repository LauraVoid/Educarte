import React from "react";
import { Route, Switch } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import Login from "./components/Index/Login";
import Createcourse from "./components/course/create-course";
import ListCourse from "./components/course/list-course";
import RouteWithLayout from "./components/configRouter/RouteWithLayout";
import { Minimal as MinimalLayout } from "./layouts";
import Home from "./pages/Home/Home";
import store from "./store/store";

export default (
  <Provider store={store}>
    <BrowserRouter basename="/">
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/createcourse" component={Createcourse} />
        <Route path="/courses" component={ListCourse} />
        <RouteWithLayout
          path="/home"
          layout={MinimalLayout}
          component={Home}
          public={true}
        />
      </Switch>
    </BrowserRouter>
  </Provider>
);
