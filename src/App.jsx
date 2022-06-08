import React from 'react';
import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from './pages/login/Login';
import Project from './pages/project/Project';

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (

    <Switch>
      <Route path="/" exact>
        {isLoggedIn ? <Redirect to="/project" /> : <Redirect to="login" />}
      </Route>
      <Route path="/login">
        {isLoggedIn ? <Redirect to="/project" /> : <Login />}
      </Route>
      <Route path="/project/:projectID">
        {isLoggedIn ? <Project /> : <Redirect to="/login" />}
      </Route>

      {/* <Route path="*">
        {isLoggedIn ? <Redirect to="/project" /> : <Redirect to="login" />}
      </Route> */}
    </Switch>

  );
}

export default App;
