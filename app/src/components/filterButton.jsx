import React from 'react';
import { MDBBtn, MDBPopover, MDBPopoverBody, MDBPopoverHeader } from "mdbreact";



const FilterButton = props => {
  return(
    <MDBPopover
      placement="right"
      popover
      clickable
    >
      <MDBBtn>{props.display}</MDBBtn>
      <div>
        <MDBPopoverHeader>Settings</MDBPopoverHeader>
        <MDBPopoverBody>
          <MDBBtn color=''>Edit</MDBBtn>
          <MDBBtn color='danger'>Delete</MDBBtn>
        </MDBPopoverBody>
      </div>
    </MDBPopover>
  )
};

export default FilterButton;
