import React, {Component} from 'react';
import {MDBContainer} from 'mdbreact';
// import {getLabelsFilters, getEmails} from "../state/ducks/user/actions";

import {connect} from 'react-redux';


class TestingScreen extends Component {
  constructor(props) {
    super(props);
  }
  
  
  render() {
    return (
        <MDBContainer fluid>
          <button
              onClick={ () => {
                throw new Error('Testing');
              } }
          >click
          </button>
        </MDBContainer>
    );
  }
}


function mapStateToProps(state) {
  return {};
}


export default connect(
    mapStateToProps, {},
)(TestingScreen);
