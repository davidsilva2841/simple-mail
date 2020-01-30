import React, { Component } from 'react';
import { MDBBox, MDBContainer } from "mdbreact";
import CurrentLabels from "../components/currentLabels";
import CurrentFilters from "../components/currentFilters";


class MailScreen extends Component {
  
  render () {
    return (
        <MDBContainer fluid id="mail-screen">
          <CurrentLabels/>
          <CurrentFilters/>
        </MDBContainer>

    );
  }
}

export default MailScreen;
