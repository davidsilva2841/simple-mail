import React, { Component } from "react";
import {
  MDBNavbar,
  MDBIcon,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavLink,
  MDBLink,
  MDBDropdown,
  MDBDropdownItem,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBNavbarToggler,
  MDBCollapse,
  MDBBtn
} from "mdbreact";
import { checkUserLoggedIn, signOut, getEmails, getLabelsFilters } from "../state/ducks/user/actions.js";
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';

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
  
  
  render () {
    const { user, signOut } = this.props;
    
    return (
      <div id="navbar">
        <MDBNavbar color="indigo" dark expand="md" fixed={ (window.innerWidth < 1000) ? 'bottom' : 'top' }>
          <MDBNavbarBrand>
            <MDBNavLink to="/" className="title"><MDBIcon icon="mail-bulk"/>Simple Mail</MDBNavLink>
          </MDBNavbarBrand>
          <MDBNavbarToggler onClick={ this.toggleCollapse }/>
          <MDBCollapse id="navbarCollapse3" isOpen={ this.state.isOpen } navbar>
            <MDBNavbarNav left>
              
              {/* Links */ }
              {/*{ navLink('Home', '/', <MDBIcon icon="home"/>) }*/}
              {/*{ navLink('Mail', '/mail', <MDBIcon icon="envelope"/>) }*/}
              {/*{ navLink('Sorting', '/sorting', <MDBIcon icon="random"/>) }*/}
              {/*{ navLink('Testing', '/testing', <MDBIcon icon="vials"/>) }*/}
              {/*{ navLink('Settings', '/settings', <MDBIcon icon="cog"/>) }*/}
              
              {/* Show log in if user not signed in */}
              { user.isLoggedIn ? navLink('Mail', '/mail', <MDBIcon icon="envelope"/>)  : <a className="nav-link nav-item" href='/auth/google'>Login With Google</a> }
  

  
              <MDBNavItem >
                <MDBDropdown>
                  <MDBDropdownToggle nav caret>
                    <span className="mr-2">About</span>
                  </MDBDropdownToggle>
                  <MDBDropdownMenu>
                    <MDBNavLink to="/privacy" className="dropdown-item">Privacy Policy</MDBNavLink>
                    <MDBNavLink to="/terms" className="dropdown-item">Terms</MDBNavLink>
                  </MDBDropdownMenu>
                </MDBDropdown>
              </MDBNavItem>
              
            </MDBNavbarNav>
            <MDBNavbarNav right>
              {/* Show log out if user signed in*/}
              { user.isLoggedIn ? <MDBBtn color="danger" size="sm" onClick={ () => signOut() }>Sign Out</MDBBtn> : null }

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


