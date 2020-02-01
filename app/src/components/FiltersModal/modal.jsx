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
import {resetFilter, createFilter} from "../../actions";


class Modal extends Component {
  constructor (props) {
    super(props);
  }
  
  
  render () {
    const { isOpen, filters, email } = this.props;
    return (
      <MDBContainer id="filters-modal">
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
            <MDBBtn rounded color="danger"  onClick={ () => this.props.toggle() } >Close</MDBBtn>
            <MDBBtn rounded color="danger"  onClick={ () => this.props.resetFilter()} >Reset</MDBBtn>
            <MDBBtn rounded color="default" onClick={ () => this.props.createFilter(filters.newFilters, email.labels)}>Submit</MDBBtn>
          </MDBModalFooter>
          {/*{filters.message ? <div className={filters.error ? 'filter-message error' : 'filter-message success'}>{filters.message}</div> : null}*/}
          <FilterMessage status={filters.status}/>
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
