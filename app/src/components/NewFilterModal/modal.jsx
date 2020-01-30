import React, { Component } from 'react';
import {
  MDBContainer,
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter,
  MDBRow,
} from 'mdbreact';
import FilterColumn from "./filterColumn";
import {connect} from "react-redux";

class Modal extends Component {
  constructor (props) {
    super(props);
    this.state = {
      filters: [
        { index: 0, title: 'Sent to', name: 'to', values: [], value: '', type: 'address' },
        { index: 1, title: 'From', name: 'from', values: [], value: '', type: 'address' },
        { index: 2, title: 'Add Label', name: '', values: [], value: '', type: 'label' },
        { index: 3, title: 'Remove Label',name: '', values: [], value: '', type: 'label' }
      ]
    };
    
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  // --------------------------------------------------------------------------------------------------
  handleChange (e, index, value) {
    e.preventDefault();
    const {filters} = this.state;
    filters[index].value = value;
    this.setState({filters});
  }
  
  handleSubmit (e, index, value) {
    e.preventDefault();
    if (value) {
      const {filters} = this.state;
      filters[index].values.push(value);
      filters[index].value = '';
      this.setState({filters});
    }
  }
  
  // --------------------------------------------------------------------------------------------------
  
  
  render () {
    const { filters } = this.state;
    
    
    return (
      <MDBContainer id="new-filter-modal">
        <MDBModal size="fluid" isOpen={ this.props.modal } toggle={ () => this.props.toggle() }>
          <MDBModalHeader toggle={ () => this.props.toggle() }>New Filter</MDBModalHeader>
          <MDBModalBody>
            
            <MDBContainer fluid>
              <MDBRow>
                { filters.map((filter, key) =>
                  <FilterColumn
                    filter={ filter }
                    onSubmit={this.handleSubmit}
                    onChange={this.handleChange}
                    key={key}
                  />)
                }
              </MDBRow>
            
            </MDBContainer>
          </MDBModalBody>
          
          {/* Close and submit button */ }
          <MDBModalFooter>
            <MDBBtn color="danger" onClick={ () => this.props.toggle() } size="sm">Close</MDBBtn>
            <MDBBtn color="default" size="sm">Submit</MDBBtn>
          </MDBModalFooter>
        </MDBModal>
      </MDBContainer>
    );
  }
}



export default Modal;

