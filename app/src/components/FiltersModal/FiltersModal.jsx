import React, { Component } from 'react';
import { MDBBtn, MDBIcon } from "mdbreact";
import Modal from "./modal";


class FiltersModal extends Component {
  constructor (props) {
    super(props);
    this.state = {
      isOpen: true
    };
    this.toggle = this.toggle.bind();
  }

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };
  
  render () {
    const {isOpen} = this.state;
    
    return(
      <React.Fragment>
        <MDBBtn color="default" onClick={() => this.toggle()} style={{marginLeft: 0}}>
          <MDBIcon icon="edit" />
          Filter
        </MDBBtn>
        <Modal
          isOpen={isOpen}
          toggle={this.toggle}
        />

        
      </React.Fragment>
    )
  }
}

export default FiltersModal;
