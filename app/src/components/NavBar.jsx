import React, { Component } from "react";
import {
  MDBNavbar,
  MDBIcon,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavLink,
  MDBNavbarToggler,
  MDBCollapse,
  MDBBtn
} from "mdbreact";
import { checkUserLoggedIn, signOut, getEmails, getLabelsFilters } from "../actions";
import { connect } from 'react-redux';
// --------------------------------------------------------------------------------------------------

/**
 * Wrapper function for creating a nav link button
 * @param title - Title for link
 * @param href - Route for link
 * @param icon - Icon for link
 * @returns {*}
 */
const navLink = (title, href, icon = '') => {
  return (
    <MDBNavItem>
      <MDBNavLink to={ href }>{ icon ? icon : null } { title }</MDBNavLink>
    </MDBNavItem>
  );
};


/**
 * Navigation bar
 */
class NavBar extends Component {
  constructor (props) {
    super(props);
    this.state = {
      isOpen: false
    };
  }
  
  
  toggleCollapse = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };
  
   componentDidMount () {
     const { user, checkUserLoggedIn, getEmails, getLabelsFilters } = this.props;
     let userLoggedIn0 = user.loggedIn;
     checkUserLoggedIn();
     console.log(`FILE: NavBar.jsx componentDidMount() | user.loggedIn: \n`, user.loggedIn);
     if(user.loggedIn !== userLoggedIn0) {
       // getEmails();
       console.log(`FILE: NavBar.jsx componentDidMount() | running: \n`);
       getLabelsFilters();
     }
   }
  
  render () {
    const { user, signOut } = this.props;
    
    return (
      <div id="navbar">
        <MDBNavbar color="indigo" dark expand="md" fixed={ (window.innerWidth < 1000) ? 'bottom' : 'top' }>
          <MDBNavbarBrand>
            <MDBIcon icon="mail-bulk"/>
            <span className="title">Simple Mail</span>
          </MDBNavbarBrand>
          <MDBNavbarToggler onClick={ this.toggleCollapse }/>
          <MDBCollapse id="navbarCollapse3" isOpen={ this.state.isOpen } navbar>
            <MDBNavbarNav left>
              
              {/* Links */ }
              {/*{ navLink('Home', '/', <MDBIcon icon="home"/>) }*/}
              {/*{ navLink('Mail', '/mail', <MDBIcon icon="envelope"/>) }*/}
              {/*{ navLink('Sorting', '/sorting', <MDBIcon icon="random"/>) }*/}
              { navLink('Testing', '/testing', <MDBIcon icon="vials"/>) }
              {/*{ navLink('Settings', '/settings', <MDBIcon icon="cog"/>) }*/}
  
              { user.loggedIn ? <MDBBtn color="danger" size="sm"
                onClick={ () => signOut() }>Sign Out</MDBBtn> : null }
                
              {/* Show log in if user not signed in */}
              { user.loggedIn ? navLink('Mail', '/mail', <MDBIcon icon="envelope"/>)  : <a className="nav-link nav-item" href='/auth/google'>Login With Google</a> }
              
              
            
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBNavbar>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(
  mapStateToProps,
  { checkUserLoggedIn, signOut, getEmails, getLabelsFilters}
)
(NavBar);


