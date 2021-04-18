import React from "react";
import { Route, Switch } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import Login from "./components/Index/Login";
import Createcourse from "./components/course/create-course";
import ListCourse from "./components/course/list-course";
import EditCourse from "./components/course/edit-course";
import ExampleTeacher from "./components/teacher/main";

//Layouts
import RouteWithLayout from "./components/configRouter/RouteWithLayout";
import Minimal from "./layouts/Minimal/Minimal";
import MainLayout from "./layouts/Main/Main";

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

//pages for messages
import CreateMessageParent from "./pages/messages/create-message-parent";
import CreateMessageCourse from "./pages/messages/create-message-course";

import { store } from "./store/store";

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
          layout={MainLayout}
          component={CreateStudent}
        />
        <RouteWithLayout
          path="/teacher"
          layout={MainLayout}
          component={HomeTeacher}
        />
        <RouteWithLayout
          path="/teachers"
          layout={MainLayout}
          component={TeacherExplorer}
        />
        <RouteWithLayout
          path="/createteacher"
          layout={MainLayout}
          component={CreateTeacher}
        />
        <RouteWithLayout
          path="/students"
          layout={MainLayout}
          component={StudentExplorer}
        />
        <RouteWithLayout
          path="/tasks"
          layout={MainLayout}
          component={TaskExplorer}
        />
        <RouteWithLayout
          path="/createtask"
          layout={MainLayout}
          component={CreateTask}
        />
        <RouteWithLayout
          path="/messagesteacher"
          layout={MainLayout}
          component={MessageTeacher}
        />
        <RouteWithLayout
          path="/createmessageparent"
          layout={MainLayout}
          component={CreateMessageParent}
        />
        <RouteWithLayout
          path="/createmessagecourse"
          layout={MainLayout}
          component={CreateMessageCourse}
        />
      </Switch>
    </BrowserRouter>
  </Provider>
);
