import React, { Component } from 'react';
import { MDBBox, MDBContainer } from "mdbreact";
import CurrentLabels from "../components/currentLabels";
import CurrentFilters from "../components/currentFilters";


class MailScreen extends Component {
  
  render () {
    return (
      <MDBContainer fluid id="mail-screen">
        <h1>Mail Screen</h1>
        <MDBBox  display="flex" alignContent="start">
          <CurrentLabels/>
          <CurrentFilters/>
        </MDBBox>
      </MDBContainer>
    );
  }
}

export default MailScreen;
