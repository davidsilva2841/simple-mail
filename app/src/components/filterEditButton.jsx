import React from 'react';
import { MDBBtn, MDBIcon } from "mdbreact";

const FilterEditButton = props => {
  return (
    <MDBBtn color="elegant"  size="sm" className="icon-button">
      <MDBIcon icon="edit" size="2x"/>
    </MDBBtn>
  );
};

export default FilterEditButton;
