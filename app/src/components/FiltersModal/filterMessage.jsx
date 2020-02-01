import React from 'react';
import { MDBAnimation, MDBAlert } from "mdbreact";

const FilterMessage = props => {
  const {error, message} = props.status;
    // <MDBAnimation type="bounce" infinite>
    //   <div className={`message ${error ? 'error' : 'success'}`}>{message}</div>
    // </MDBAnimation>
  if (!error && !message) return null;
  return (
    <MDBAlert color={error ? 'danger' : 'success'}>
      {message}
    </MDBAlert>
  );
};

export default FilterMessage;
