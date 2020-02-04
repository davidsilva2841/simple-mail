import React from 'react';
import { MDBAnimation, MDBAlert } from "mdbreact";


const FilterMessage = props => {
  const {message, type} = props.status;

  if (!message) return null;
  return (
    <MDBAlert color={type.color}>
      {message}
    </MDBAlert>
  );
};

export default FilterMessage;

