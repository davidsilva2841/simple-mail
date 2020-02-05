import React, { Component } from 'react';
import { MDBContainer } from "mdbreact";
import Notifications from "../components/notifications";


import { getLabelsFilters } from "../actions";
import { connect } from 'react-redux';


class TestingScreen extends Component {
  constructor (props) {
    super(props);
  }
  render () {
    return (
      <MDBContainer fluid>
        <h1>Testing Screen</h1>
        {/*<button*/}
        {/*  onClick={ () => {*/}
        {/*    console.log('clicked');*/}
        {/*    this.props.getLabelsFilters();*/}
        {/*  } }*/}
        {/*>*/}
        {/*  click me*/}
        {/*</button>*/}
        <Notifications/>
      </MDBContainer>
    );
  }
}

function mapStateToProps (state) {
  return {};
}


export default connect(
  mapStateToProps, { getLabelsFilters }
)(TestingScreen);
