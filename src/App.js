import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  NavLink,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";

import Header from "./components/Home/Header/Header";
import Modal from "./HOC/Modal/Modal";
import LoginCyberBugs from "./pages/CyberBugs/LoginCyberBugs/LoginCyberBugs";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import Detail from "./pages/Detail/Detail";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Profile from "./pages/Profile/Profile";
import { HomeTemplate } from "./templates/HomeTemplate/HomeTemplate";
import { UserLoginTemplate } from "./templates/HomeTemplate/UserLoginTemplate";
import { useDispatch } from "react-redux";
import { CyberbugsTemplate } from "./templates/HomeTemplate/CyberbugsTemplate";
import indexCyberBugs from "./redux/sagas/Cyberbugs/indexCyberBugs";
import CreateProject from "./pages/CyberBugs/CreateProject/CreateProject";
import ProjectManagement from "./pages/CyberBugs/ProjectManagement/ProjectManagement";
import DrawerCyberBugs from "./HOC/CyberbugsHOC/DrawerCyberBugs";

function App() {
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: "ADD_HISTORY", history: history });
  }, []);

  return (
    <>
      {/* <Modal /> */}

      <DrawerCyberBugs />

      <Switch>
        <HomeTemplate path="/home" exact Component={Home} />

        <HomeTemplate exact path="/contact" Component={Contact} />
        <HomeTemplate exact path="/about" Component={About} />
        <UserLoginTemplate exact path="/login" Component={LoginCyberBugs} />
        <HomeTemplate exact path="/detail/:id" Component={Detail} />
        <HomeTemplate exact path="/profile" Component={Profile} />
        <CyberbugsTemplate exact path="/cyberbugs" Component={indexCyberBugs} />
        <CyberbugsTemplate
          exact
          path="/createproject"
          Component={CreateProject}
        />
        <CyberbugsTemplate
          exact
          path="/projectmanagement"
          Component={ProjectManagement}
        />

        <HomeTemplate exact path="/" component={Home} />
      </Switch>
    </>
  );
}

export default App;
