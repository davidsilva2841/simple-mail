import React, { Component } from 'react';
import { MDBContainer } from "mdbreact";
import Notifications from "../components/notifications";
import {getLabelsFilters, getEmails} from "../state/ducks/user/actions";


import { connect } from 'react-redux';


class TestingScreen extends Component {
  constructor (props) {
    super(props);
  }
  render () {
    return (
      <MDBContainer fluid>
        <h1>Testing Screen</h1>
        
        <button
        onClick={() => {
          // this.props.getLabelsFilters();
          // this.props.getEmails();
        }}>
          click
        </button>
        
      </MDBContainer>
    );
  }
}

function mapStateToProps (state) {
  return {};
}


export default connect(
  mapStateToProps, { getLabelsFilters, getEmails }
)(TestingScreen);
