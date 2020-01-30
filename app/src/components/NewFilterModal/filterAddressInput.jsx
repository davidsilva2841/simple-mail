import React from 'react';
import { MDBInput, MDBCol, MDBBtn, MDBIcon } from "mdbreact";


const FilterAddressInput = props => {
  const {index, value, onSubmit, onChange} = props;
  return (
    <React.Fragment>
      <MDBCol >
        <form onSubmit={ e => onSubmit(e, index, value)} >
          <MDBInput
            onChange={ e => onChange(e, index, e.target.value) }
            value={value}
            size="sm"
            outline
          />
        </form>
      </MDBCol>
      <MDBCol >
        <MDBBtn
          onClick={ e => onSubmit(e, index, value) }
          size="sm"
          floating
        >
          <MDBIcon icon="plus"/>
        </MDBBtn>
      </MDBCol>
    </React.Fragment>
  );
};

export default FilterAddressInput;
