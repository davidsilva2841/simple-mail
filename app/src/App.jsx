// Sentry logger service
import * as Sentry from '@sentry/browser';
if (process.env.NODE_ENV === 'production') Sentry.init({dsn: "https://ceeae75246a14736922ea43d46d5ce88@sentry.io/2244671"});

import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect, useRouteMatch } from "react-router-dom";

import NavBar from "./components/NavBar";
import Notifications from "./components/notifications";
import HomeScreen from "./containers/HomeScreen";
import MailScreen from "./containers/MailScreen";

import TestingScreen from "./containers/TestingScreen";

class App extends Component {
  
  render () {
    return (
      <React.Fragment>
        <Router>
          <Notifications/>
          <NavBar/>
          <div id="screen">
            <Switch>
              
              <Route exact path="/" component={ HomeScreen }/>
              <Route exact path="/mail" component={ MailScreen }/>
              <Route exact path="/testing" component={ TestingScreen }/>
            </Switch>
          </div>
        
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
