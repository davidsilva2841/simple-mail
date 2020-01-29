import React, { Component } from 'react';
import {MDBContainer} from "mdbreact";
import axios from 'axios';

import simpleMail from "../api/simpleMail";

class HomeScreen extends Component {
  
  getLabels = () => {
    simpleMail.get('/test/gmail/labels1')
      .then(result => {
        console.log(`FILE: emailActions.js | result: \n`, result);
      })
      .catch(error => {
        console.error(`FILE: emailActions.js | ERROR: \n`, error);
      });
    
  };
  
  
  render () {
    return (
      <MDBContainer fluid>
        <h1>Home Screen2</h1>
        <button
          onClick={() => this.getLabels()}
        >
          Click me
        </button>
      </MDBContainer>
    );
  }
}

export default HomeScreen;
