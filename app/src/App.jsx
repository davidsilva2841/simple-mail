import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect, useRouteMatch } from "react-router-dom";

import NavBar from "./components/NavBar";
import HomeScreen from "./containers/HomeScreen";
import MailScreen from "./containers/MailScreen";

class App extends Component {
  
  render () {
    return (
      <React.Fragment>
        <Router>
          <NavBar/>
          <div id="screen">
            <Switch>
              
              <Route exact path="/" component={ HomeScreen }/>
              <Route exact path="/mail" component={ MailScreen }/>
            </Switch>
          </div>
        
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
