import React from 'react';
import { MDBBtn, MDBPopover, MDBPopoverBody, MDBPopoverHeader } from "mdbreact";



const FilterLabelButton = props => {
  return(
    <MDBPopover
      placement="right"
      popover
      clickable
    >
      <MDBBtn color="light-blue" className="filter-button" size="sm">{props.display}</MDBBtn>
      <div>
        <MDBPopoverHeader>Settings</MDBPopoverHeader>
        <MDBPopoverBody>
          <MDBBtn color='danger' size="sm">Delete</MDBBtn>
        </MDBPopoverBody>
      </div>
    </MDBPopover>
  )
};

export default FilterLabelButton;
