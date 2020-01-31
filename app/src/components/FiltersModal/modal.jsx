import React, { Component } from 'react';
import { connect } from 'react-redux';
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
import {resetFilter, createFilter} from "../../actions";


class Modal extends Component {
  constructor (props) {
    super(props);
  }
  
  
  render () {
    const { isOpen, filters, email } = this.props;
    return (
      <MDBContainer id="new-filter-modal">
        <MDBModal size="fluid" isOpen={ isOpen } toggle={() => this.props.toggle()}>
          <MDBModalHeader>New Filter</MDBModalHeader>
          
          <MDBModalBody>
            <MDBContainer fluid>
              <MDBRow>
                { filters.newFilters.map((filter, index) =>
                  <FilterColumn index={ index } key={ index }/>
                ) }
              </MDBRow>
            </MDBContainer>
          </MDBModalBody>
  
  
          <MDBModalFooter>
            <MDBBtn color="danger"  onClick={ () => this.props.toggle() } >Close</MDBBtn>
            <MDBBtn color="danger"  onClick={ () => this.props.resetFilter()} >Reset</MDBBtn>
            <MDBBtn color="default" onClick={ () => this.props.createFilter(filters.newFilters, email.labels)}>Submit</MDBBtn>
          </MDBModalFooter>
          
        </MDBModal>
      </MDBContainer>
    );
  }
}

function mapStateToProps (state) {
  return {
    filters: state.filters,
    email: state.email
  };
}

export default connect(mapStateToProps, {resetFilter, createFilter})(Modal);
