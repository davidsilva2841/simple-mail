import React from 'react';
import {useSelector} from 'react-redux';
import {
  MDBDropdown,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBIcon,
  MDBNavbar,
  MDBNavItem,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavLink,
  MDBBtn,
} from 'mdbreact';

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

const getLinks = isLoggedIn => {
  if ( isLoggedIn ) {
    return (
        <React.Fragment>
          { navLink('Sorting', '/sorting', <MDBIcon icon="random"/>) }
          {/*{ navLink('Settings', '/settings', <MDBIcon icon="cogs"/>) }*/ }
        </React.Fragment>
    );
  } else {
    return (
        <React.Fragment>
          { navLink('Login with Google', '/auth/google', <MDBIcon fab
                                                                  icon="google"/>) }
        
        </React.Fragment>
    );
  }
};

const NavBar = () => {
  const user = useSelector(state => state.user);
  return (
      <div id="navbar">
        <MDBNavbar color="indigo" dark expand="md"
                   fixed={ (window.innerWidth < 1000) ? 'bottom' : 'top' }>
          <MDBNavbarBrand>
            <MDBNavLink to="/" className="title"><MDBIcon icon="mail-bulk"/>Simple
                                                                            Mail</MDBNavLink>
          </MDBNavbarBrand>
          <MDBNavbarNav left>
            
            
            { navLink('Testing', '/testing', <MDBIcon icon="vials"/>) }
            { getLinks(user.isLoggedIn) }
            
            
            <MDBDropdown>
              <MDBDropdownToggle nav caret>
                <span className="mr-1"><MDBIcon icon="info-circle"
                                                className="mr-1"/>About</span>
              </MDBDropdownToggle>
              <MDBDropdownMenu>
                
                <MDBNavLink to="/privacy" className="dropdown-item">
                  <MDBIcon icon="user-secret" className="mr-1"/>Privacy
                                                                Policy</MDBNavLink>
                <MDBNavLink to="/terms" className="dropdown-item">
                  <MDBIcon icon="file-contract" className="mr-1"/>Terms
                </MDBNavLink>
              </MDBDropdownMenu>
            </MDBDropdown>
          
          </MDBNavbarNav>
          <MDBNavbarNav right>
            {/* Show log out if user signed in*/ }
            { user.isLoggedIn ?
                <MDBBtn color="danger" size="sm"
                        onClick={ () => console.log('hi') }>Sign Out</MDBBtn> :
                null }
          
          </MDBNavbarNav>
        </MDBNavbar>
      </div>
  );
  
};

export default NavBar;


