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
    // const { user, signOut } = this.props;
    
    return (
      <div id="navbar">
        <MDBNavbar color="indigo" dark expand="md" fixed={ (window.innerWidth < 1000) ? 'bottom' : 'top' }>
          <MDBNavbarBrand>
            <MDBIcon icon="mail-bulk" />
            <span className="title">Simple Mail</span>
          </MDBNavbarBrand>
          <MDBNavbarToggler onClick={ this.toggleCollapse }/>
          <MDBCollapse id="navbarCollapse3" isOpen={ this.state.isOpen } navbar>
            <MDBNavbarNav left>
              
              {/* Links */ }
              { navLink('Home', '/', <MDBIcon icon="home"/>) }
              {/*{ navLink('Login', '/auth/google', <MDBIcon icon="home"/>) }*/}
              { navLink('Mail', '/mail', <MDBIcon icon="envelope" />) }
              { navLink('Sorting', '/sorting', <MDBIcon icon="random" />) }
              { navLink('Settings', '/settings', <MDBIcon icon="cog" />) }
              <a className="nav-link" href='/auth/google'>Login</a>

            </MDBNavbarNav>
          </MDBCollapse>
        </MDBNavbar>
      </div>
    );
  }
}

export default NavBar;
// const mapStateToProps = state => {
//   return {
//     user: state.user
//   };
// };
//
// export default connect(
//   mapStateToProps,
//   { signOut }
// )
// (
//   Navbar
// );


