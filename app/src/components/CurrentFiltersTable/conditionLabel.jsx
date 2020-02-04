import React from 'react';
import { MDBBtn, MDBPopover, MDBPopoverBody, MDBPopoverHeader } from "mdbreact";


const ConditionLabel = props => {
  return (

      <MDBBtn color="light-blue" size="sm" className="label">{props.display}</MDBBtn>

  );
};

export default ConditionLabel;


// TODO: Allow editing of labels inline
//    <MDBPopover
//       placement="right"
//       popover
//       clickable
//     >
//       <MDBBtn color="light-blue" size="sm" className="label">{props.display}</MDBBtn>
//       <div>
//         <MDBPopoverBody>
//           <MDBBtn color='' size="sm">Edit</MDBBtn>
//           <MDBBtn color='danger' size="sm">Delete</MDBBtn>
//         </MDBPopoverBody>
//       </div>
//     </MDBPopover>
