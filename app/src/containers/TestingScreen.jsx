import React, { Component } from 'react';
import {MDBContainer} from "mdbreact";

// import CurrentFiltersTable from "../components/CurrentFiltersTable/CurrentFiltersTable";
import Notifications from "../components/notifications";

class TestingScreen extends Component {
  render () {
    return (
      <MDBContainer fluid>
        <h1>Testing Screen</h1>
        {/*<CurrentFiltersTable/>*/}
        <Notifications/>
      </MDBContainer>
    );
  }
}

export default TestingScreen;
