import React from 'react';
import {
  MDBBox,
  MDBListGroup,
  MDBListGroupItem,
  MDBContainer,
  MDBBtn,
  MDBIcon,
  MDBPopover,
  MDBPopoverBody,
  MDBPopoverHeader
} from "mdbreact";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const getLabel = (label, index) => {

  return (
    <MDBListGroupItem
      key={ index }
      className="d-flex justify-content-between align-items-center"
      style={{
        backgroundColor: label.color.backgroundColor || '',
        color: label.color.textColor || ''
      }}
    >
      { label.name }
      
    </MDBListGroupItem>
  );

};

const getLabelStructure = (labels) => {
  let labelStructure = {};
  
  const addLabel = () => {
  
  };
  
  for(let label of labels) {
  
  }
};


const CurrentLabels = props => {
  const email = useSelector(state => state.email);
  
  return (
    <MDBContainer id="current-labels">
      <h2>Current Labels</h2>
      <MDBContainer>
        <MDBListGroup style={ { width: "22rem" } }>
          { email.labels.map((label, index) => getLabel(label, index)) }
        </MDBListGroup>
      </MDBContainer>
    </MDBContainer>
  );
};

export default CurrentLabels;

   // <div id="current-labels">
   //    <h2>Current Labels</h2>
   //    <MDBContainer>
   //      <MDBListGroup style={ { width: "22rem" } }>
   //        { email.labels.map((label, index) => getLabel(label, index)) }
   //      </MDBListGroup>
   //    </MDBContainer>
   //  </div>
