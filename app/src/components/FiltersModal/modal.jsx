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
import FilterMessage from "./filterMessage";
// import {resetFilter, createFilter} from "../../state/ducks/filters/actions.js";
import {createFilter} from "../../state/ducks/filters/actions.js";
import InputColumn from "./inputColumn";

class Modal extends Component {
  constructor (props) {
    super(props);
  }
  
  
  render () {
    const { isOpen, filters, user } = this.props;
    return (
      <MDBContainer id="modal">
        <MDBModal size="fluid" isOpen={ isOpen } toggle={() => this.props.toggle()}>
          <MDBModalHeader>{filters.originalFilterId ? 'Edit Filter' : 'New Filter'}</MDBModalHeader>
          
          <MDBModalBody>
            <MDBContainer fluid>
              <MDBRow>
                { filters.newFilters.map((filter, index) =>
                  <FilterColumn index={ index } key={ index }/>
                ) }
              </MDBRow>
              
              <MDBRow id="inputs-row">
                { filters.newFilters.map((filter, index) =>
                  <InputColumn filter={ filter } key={ index }/>
                ) }
              </MDBRow>
            </MDBContainer>

          </MDBModalBody>
  
  
          <MDBModalFooter id="footer">
            <MDBBtn rounded color="danger"  onClick={ () => this.props.toggle() } >Close</MDBBtn>
            <MDBBtn rounded color="danger"  onClick={ () => this.props.resetFilter()} >Reset</MDBBtn>
            <MDBBtn rounded color="default" onClick={ () => this.props.createFilter(filters.newFilters, user.labels, filters.originalFilterId) }
            >Submit</MDBBtn>
            
            
          </MDBModalFooter>
          
          <FilterMessage status={filters.status}/>
          
        </MDBModal>
      </MDBContainer>
    );
  }
}

function mapStateToProps (state) {
  return {
    filters: state.filters,
    user: state.user
  };
}

export default connect(mapStateToProps, {resetFilter, createFilter})(Modal);
