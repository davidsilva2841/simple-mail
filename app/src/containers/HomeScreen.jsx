import React, { Component } from 'react';
import {MDBContainer, MDBIcon} from "mdbreact";

class HomeScreen extends Component {
  
  render () {
    return (
      <MDBContainer fluid>

        <h1>Home Screen (In Progress)</h1>
        <span>
          <MDBIcon far icon="smile-beam" size="5x"/>
          <MDBIcon icon="hammer" size="5x"/>
        </span>
        
      </MDBContainer>
    );
  }
}

export default HomeScreen;
