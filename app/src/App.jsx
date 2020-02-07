
import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect, useRouteMatch } from "react-router-dom";
import { connect } from 'react-redux';
import NavBar from "./components/NavBar";
import Notifications from "./components/notifications";
import HomeScreen from "./containers/HomeScreen";
import MailScreen from "./containers/MailScreen";
import PrivacyScreen from "./containers/PrivacyScreen";
import TermsScreen from "./containers/TermsScreen";
import TestingScreen from "./containers/TestingScreen";

import { checkUserLoggedIn, signOut } from "./state/ducks/user/actions.js";

class App extends Component {
  constructor (props) {
    super(props);
  }
  
  componentDidMount () {
    const { user, checkUserLoggedIn } = this.props;
    checkUserLoggedIn(user.fetchedLabelsFilters);
  }
  
  render () {
    const {user} = this.props;
    return (
      <React.Fragment>
        <Router>
          <Notifications/>
          <NavBar/>
          <div id="screen">
            <Switch>
              
              <Route exact path="/" component={ HomeScreen }/>
              
              <Route exact path="/privacy" component={ PrivacyScreen }/>
              <Route exact path="/terms" component={ TermsScreen }/>
              
              {user.isLoggedIn ?  <Route exact path="/mail" component={ MailScreen }/> : null}
            </Switch>
          </div>
        
        </Router>
      </React.Fragment>
    );
  }
}



const mapStateToProps = state => {
  return {
    user: state.user,
    email: state.email
  };
};

export default connect(
  mapStateToProps,
  { checkUserLoggedIn, signOut }
)(App);
