import {hot} from 'react-hot-loader/root';

import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useRouteMatch,
  withRouter,
} from 'react-router-dom';
import {connect} from 'react-redux';
import NavBar from './components/NavBar';

import Notifications from './components/notifications';
// import MailScreen from "./containers/MailScreen";

import HomeScreen from './containers/HomeScreen';
import PrivacyScreen from './containers/PrivacyScreen';
import TermsScreen from './containers/TermsScreen';
// import TestingScreen from './containers/TestingScreen';
import SortingScreen from './containers/SortingScreen';

import {getLoginStatus} from './features/user/userSlice.js';
import {resetFiltersState} from './features/settings/settingsSlice.js';


// --------------------------------------------------------------------------------------------------

class App extends Component {
  constructor(props) {
    super(props);
  }
  
  
  componentDidMount() {
    this.props.getLoginStatus();
  }
  
  
  render() {
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
                <Route exact path="/sorting" component={ SortingScreen }/>
                {/*<Route exact path="/testing" component={ TestingScreen }/>*/}
                
              </Switch>
            </div>
          
          </Router>
        </React.Fragment>
    );
  }
}


const mapDispatch = {
  getLoginStatus, resetFiltersState,
};

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps, mapDispatch)(hot(App));



