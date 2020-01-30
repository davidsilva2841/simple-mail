import React from 'react';
import {
  MDBListGroup,
  MDBListGroupItem
} from "mdbreact";

import { useSelector, useDispatch } from "react-redux";

// --------------------------------------------------------------------------------------------------

/**
 * Wrapper for getting list item
 * @param label
 * @param index
 * @returns {*}
 */
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



const CurrentLabels = props => {
  const email = useSelector(state => state.email);
  
  return (
    <div id="current-labels"  className='module'>
      <h2>Current Labels</h2>
      <div>
        <MDBListGroup style={ { width: "22rem" } }>
          { email.labels.map((label, index) => getLabel(label, index)) }
        </MDBListGroup>
      </div>
    </div>
  );
};

export default CurrentLabels;
