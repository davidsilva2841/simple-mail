import React from 'react';
import { MDBCol, MDBListGroup, MDBRow } from "mdbreact";
import InputAddress from "./inputAddress";
import InputRemoveLabel from "./inputRemoveLabel";
import InputAddLabel from "./inputAddLabel";


const renderInput = filter => {
  if ( filter.type === 'address' ) {
    return (
      <InputAddress index={ filter.index }/>
    )
  } else if ( filter.type === 'addLabel' ) {
    return (
      <InputAddLabel index={ filter.index }/>
    );
  } else if ( filter.type === 'removeLabel' ) {
    return (
      <InputRemoveLabel index={ filter.index }/>
    )
  }
};


const InputColumn = props => {
  return (
    <MDBCol>
      {renderInput(props.filter)}
    </MDBCol>
  );
};

export default InputColumn;
