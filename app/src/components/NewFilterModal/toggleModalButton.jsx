import React, { Component } from 'react';
import { MDBBtn, MDBIcon } from "mdbreact";
import Modal from "./modal";

class ToggleModalButton extends Component {
  constructor (props) {
    super(props);
    this.state = {
      show: true
    };
  }
  
  toggle = () => {
    this.setState({ show: !this.state.show });
  };
  
  render () {
    return(
      <React.Fragment>
        <MDBBtn
          color="default"
          onClick={() => this.toggle()}
          style={{marginLeft: 0}}
        >
          <MDBIcon icon="edit" />
          New Filter
        </MDBBtn>
        
        <Modal
          modal={this.state.show}
          toggle={this.toggle}
        />

      </React.Fragment>
    )
  }
}

export default ToggleModalButton;



