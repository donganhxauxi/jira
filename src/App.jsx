import React from 'react';
import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from './pages/login/Login';
import Projects from './pages/projects/Projects';

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <div className="App">
      <Switch>
        <Route path="/" exact>
          <Redirect to="/login" />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/projects">
          {isLoggedIn && <Projects />}
          {!isLoggedIn && <Redirect to="/login" />}
        </Route>
        <Route path="*">
          <Redirect to="/login" />
        </Route>
      </Switch>

    </div>
  );
}

export default App;
