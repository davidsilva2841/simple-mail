import React from 'react';
import { useDispatch } from 'react-redux';
import { MDBBadge, MDBIcon, MDBListGroupItem } from "mdbreact";
import {removeFilterCondition} from "../../actions";

const ConditionLabel = (props) => {
  const dispatch = useDispatch();
  const {index, value} = props;
  return (
    <MDBListGroupItem className="d-flex justify-content-between align-items-center">
      {value}
      
      <MDBBadge
        color="danger"
        className="list-btn"
        onClick={() => dispatch(removeFilterCondition(index, value))}
        pill
      >
        <MDBIcon icon="minus-circle" />
      </MDBBadge>
    </MDBListGroupItem>
  );
  
};

export default ConditionLabel;


