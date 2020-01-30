import React, { Component } from 'react';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';

class NewFilterModal extends Component {
  constructor (props) {
    super(props);
  }
  
  // state = {
  //   modal: true
  // };
  //
  
  // toggle = () => {
  //   this.setState({
  //     modal: !this.state.modal
  //   });
  // };
  
  render() {
    console.log(`FILE: newFilterModal.jsx render()`);
    return (
      <MDBContainer>
        {/*<MDBBtn onClick={this.toggle}>Modal</MDBBtn>*/}
        <MDBModal isOpen={this.props.modal} toggle={() => this.props.toggle()} >
          <MDBModalHeader
            toggle={() => this.props.toggle()}
          >
            New Filter
          </MDBModalHeader>
          <MDBModalBody>
            
          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn
              color="danger"
              onClick={() => this.props.toggle()}
              size="sm"
            >
              Close
            </MDBBtn>
            <MDBBtn
              color="default"
              size="sm"
            >
              Submit
            </MDBBtn>
          </MDBModalFooter>
        </MDBModal>
      </MDBContainer>
    );
  }
}

export default NewFilterModal;
