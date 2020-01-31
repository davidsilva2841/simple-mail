import React from 'react';
import { MDBBadge, MDBIcon, MDBListGroupItem } from "mdbreact";



const FilterRuleLabel = props => {
  const {onDeleteLabel, value, index} = props;
  return (
    
      <MDBListGroupItem className="d-flex justify-content-between align-items-center">
        {value}
        <MDBBadge
          color="danger"
          className="list-btn"
          onClick={() => onDeleteLabel(index, value)}
          pill
        >
          <MDBIcon icon="minus-circle" />
        </MDBBadge>
      </MDBListGroupItem>
  );
};

export default FilterRuleLabel;
