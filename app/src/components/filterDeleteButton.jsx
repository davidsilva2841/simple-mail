import React from 'react';
import { MDBBtn, MDBIcon, MDBPopover, MDBPopoverBody, MDBPopoverHeader } from "mdbreact";

const FilterDeleteButton = props => {
  return (
    <MDBPopover
      placement="right"
      popover
      clickable
    >
      <MDBBtn color="danger" size="sm" className="icon-button">
        <MDBIcon icon="minus-square" size="2x"/>
      </MDBBtn>
      <div>
        <MDBPopoverHeader>Delete this filter?</MDBPopoverHeader>
        <MDBPopoverBody>
          <MDBBtn color='danger' size="sm">Delete</MDBBtn>
        </MDBPopoverBody>
      </div>
    </MDBPopover>
  );
};

export default FilterDeleteButton;


