import React from "react";
import { Route, Switch } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import Login from "./components/Index/Login";
import Createcourse from "./pages/courses/create";
import ListCourse from "./pages/courses/list-courses";
import EditCourse from "./components/course/edit-course";

//Layouts
import RouteWithLayout from "./components/configRouter/RouteWithLayout";
import Minimal from "./layouts/Minimal/Minimal";
import MainLayout from "./layouts/Main/Main";

//pages for main view
import Home from "./pages/Home/Home";
import Content from "./pages/Home/Content";
//pages for institution
import MainInstitution from "./pages/Institution/home";

//pages for student
import StudentExplorer from "./pages/student/list-student";
import CreateStudent from "./pages/user/add-student";
import MainStudent from "./pages/student/main";

//pages for teacher
import HomeTeacher from "./pages/teacher/home-teacher";
import TeacherExplorer from "./pages/teacher/list-teacher";
import CreateTeacher from "./pages/teacher/add-teacher";
import MessageTeacher from "./pages/messages/message-teacher";
import Feedback from "./components/teacher/feedback";
import CreateMeeting from "./pages/meeting/create-meeting";

//pages for tasks
import TaskExplorer from "./pages/task/list-task";
import CreateTask from "./pages/task/add-task";

//pages for messages
import CreateMessageParent from "./pages/messages/create-message-parent";
import CreateMessageCourse from "./pages/messages/create-message-course";

//pages for parents
import MainParent from "./pages/parent/main";
import FeedExplorer from "./pages/parent/list-feedbacks";

import { store } from "./store/store";

export default (
  <Provider store={store}>
    <BrowserRouter basename="/">
      <Switch>
        <Route path="/login" component={Login} />
        <RouteWithLayout
          path="/feedback"
          layout={MainLayout}
          component={Feedback}
        />

        <RouteWithLayout
          path="/feed"
          layout={MainLayout}
          component={FeedExplorer}
        />

        <RouteWithLayout
          path="/parent"
          layout={MainLayout}
          component={MainParent}
        />

        <RouteWithLayout
          path="/student"
          layout={MainLayout}
          component={MainStudent}
        />

        <RouteWithLayout
          path="/institution"
          layout={MainLayout}
          component={MainInstitution}
        />

        <RouteWithLayout
          path="/createcourse"
          layout={MainLayout}
          component={Createcourse}
        />

        <RouteWithLayout
          path="/editcourse"
          layout={MainLayout}
          component={EditCourse}
        />

        <RouteWithLayout
          path="/courses"
          layout={MainLayout}
          component={ListCourse}
        />
        <RouteWithLayout exact path="/" layout={Minimal} component={Home} />

        <RouteWithLayout
          path="/createstudent"
          layout={MainLayout}
          component={CreateStudent}
        />

        <RouteWithLayout
          path="/content"
          layout={MainLayout}
          component={Content}
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
        <RouteWithLayout
          path="/createmeeting"
          layout={MainLayout}
          component={CreateMeeting}
        />
      </Switch>
    </BrowserRouter>
  </Provider>
);
