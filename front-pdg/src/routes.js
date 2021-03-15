import React from "react";
import { Route, Switch } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import Login from "./components/Index/Login";
import Createcourse from "./components/course/create-course";
import ListCourse from "./components/course/list-course";
import Feedback from "./components/teacher/feedback";
import RouteWithLayout from "./components/configRouter/RouteWithLayout";
import Minimal from "./layouts/Minimal/Minimal";
import Home from "./pages/Home/Home";
import CreateStudent from "./pages/user/add-student";
import store from "./store/store";

export default (
  <Provider store={store}>
    <BrowserRouter basename="/">
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/feedback" component={Feedback} />
        <Route path="/createcourse" component={Createcourse} />
        <Route path="/courses" component={ListCourse} />
        <RouteWithLayout exact path="/" layout={Minimal} component={Home} />
        <RouteWithLayout
          path="/createstudent"
          layout={Minimal}
          component={CreateStudent}
        />
      </Switch>
    </BrowserRouter>
  </Provider>
);
