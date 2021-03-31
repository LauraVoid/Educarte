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
import StudentExplorer from "./pages/student/list-student";
import CreateStudent from "./pages/user/add-student";
import CreateTeacher from "./pages/teacher/add-teacher";
import MainTeacher from "./components/teacher/main";
import MainInstitution from "./components/Institution/main";
import store from "./store/store";

export default (
  <Provider store={store}>
    <BrowserRouter basename="/">
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/feedback" component={Feedback} />
        <Route path="/teacher" component={MainTeacher} />
        <Route path="/institution" component={MainInstitution} />
        <Route path="/createcourse" component={Createcourse} />
        <Route path="/courses" component={ListCourse} />
        <RouteWithLayout exact path="/" layout={Minimal} component={Home} />
        <RouteWithLayout
          path="/createstudent"
          layout={Minimal}
          component={CreateStudent}
        />
        <RouteWithLayout
          path="/createteacher"
          layout={Minimal}
          component={CreateTeacher}
        />
        <RouteWithLayout
          path="/students"
          layout={Minimal}
          component={StudentExplorer}
        />
      </Switch>
    </BrowserRouter>
  </Provider>
);
