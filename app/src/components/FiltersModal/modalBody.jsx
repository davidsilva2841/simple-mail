import React from 'react';
import {useSelector} from 'react-redux';
import {MDBContainer, MDBModalBody, MDBRow} from 'mdbreact';
import FilterColumn from './filterColumn';
import InputColumn from './inputColumn';


const ModalBody = (props) => {
  const filtersModal = useSelector(state => state.filtersModal);
  return (
      <MDBModalBody>
        <MDBContainer fluid>
          <MDBRow>
            { filtersModal.filters.map((filter, index) =>
                <FilterColumn index={ index } key={ index }/>,
            ) }
          </MDBRow>
          <MDBRow id="inputs-row">
            { filtersModal.filters.map((filter, index) =>
                <InputColumn filter={ filter } key={ index }/>,
            ) }
          </MDBRow>
        </MDBContainer>
      </MDBModalBody>
  );
  
};

export default ModalBody;


