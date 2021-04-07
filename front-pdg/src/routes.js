import React from "react";
import { Route, Switch } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import Login from "./components/Index/Login";
import Createcourse from "./components/course/create-course";
import ListCourse from "./components/course/list-course";
import EditCourse from "./components/course/edit-course"
import ExampleTeacher from "./components/teacher/main"

import RouteWithLayout from "./components/configRouter/RouteWithLayout";
import Minimal from "./layouts/Minimal/Minimal";

//pages for main view
import Home from "./pages/Home/Home";

//pages for institution
import MainInstitution from "./components/Institution/main";

//pages for student
import StudentExplorer from "./pages/student/list-student";
import CreateStudent from "./pages/user/add-student";

//pages for teacher
import HomeTeacher from "./pages/teacher/home-teacher";
import TeacherExplorer from "./pages/teacher/list-teacher";
import CreateTeacher from "./pages/teacher/add-teacher";
import MessageTeacher from "./pages/messages/message-teacher";
import Feedback from "./components/teacher/feedback";

//pages for tasks
import TaskExplorer from "./pages/task/list-task";
import CreateTask from "./pages/task/add-task";

import store from "./store/store";

export default (
  <Provider store={store}>
    <BrowserRouter basename="/">
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/feedback" component={Feedback} />
        <Route path="/institution" component={MainInstitution} />
        <Route path="/createcourse" component={Createcourse} />
        <Route path="/editcourse" component={EditCourse} />
        <Route path="/courses" component={ListCourse} />
        <RouteWithLayout exact path="/" layout={Minimal} component={Home} />
        <RouteWithLayout
          path="/createstudent"
          layout={Minimal}
          component={CreateStudent}
        />
        <RouteWithLayout
          path="/teacher"
          layout={Minimal}
          component={HomeTeacher}
        />
        <RouteWithLayout
          path="/teachers"
          layout={Minimal}
          component={TeacherExplorer}
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
        <RouteWithLayout
          path="/tasks"
          layout={Minimal}
          component={TaskExplorer}
        />
        <RouteWithLayout
          path="/createtask"
          layout={Minimal}
          component={CreateTask}
        />
        <RouteWithLayout
          path="/messagesteacher"
          layout={Minimal}
          component={MessageTeacher}
        />
      </Switch>
    </BrowserRouter>
  </Provider>
);
