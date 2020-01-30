import React from 'react';
import { MDBBtn, MDBPopover, MDBPopoverBody, MDBPopoverHeader } from "mdbreact";



const FilterAddressButton = props => {
  return(
    <MDBPopover
      placement="right"
      popover
      clickable
    >
      <MDBBtn color="light-blue" size="sm">{props.display}</MDBBtn>
      <div>
        <MDBPopoverHeader>Settings</MDBPopoverHeader>
        <MDBPopoverBody>
          <MDBBtn color='' size="sm">Edit</MDBBtn>
          <MDBBtn color='danger' size="sm">Delete</MDBBtn>
        </MDBPopoverBody>
      </div>
    </MDBPopover>
  )
};

export default FilterAddressButton;
