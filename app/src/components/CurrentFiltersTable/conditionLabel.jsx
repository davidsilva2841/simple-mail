import React from 'react';
import { MDBBtn } from "mdbreact";

const ConditionLabel = props => {
  return (
      <MDBBtn color="light-blue" size="sm" className="label">{props.display}</MDBBtn>
  );
};

export default ConditionLabel;
