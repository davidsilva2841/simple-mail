import React from 'react';
import { MDBInput, MDBCol, MDBBtn, MDBIcon } from "mdbreact";


const FilterRuleLabel = props => {
  return (
    <MDBCol>
      {props.value}
    </MDBCol>
  );
};

export default FilterRuleLabel;
