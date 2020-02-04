import React from 'react';
import { useDispatch } from 'react-redux';
import { MDBListGroupItem, MDBChip } from "mdbreact";
import {removeFilterCondition} from "../../actions";

const ConditionLabel = (props) => {
  const dispatch = useDispatch();
  const {index, value} = props;
  return (
      <MDBListGroupItem className="d-flex justify-content-between align-items-center">
        <span>{value}</span>
        <MDBChip
          style={{margin:'0'}}
          
          tag="span"
          text="white"
          bgColor="danger-color"
          onClick={() => dispatch(removeFilterCondition(index, value))}
        >Delete</MDBChip>
      </MDBListGroupItem>
  );
  
};

export default ConditionLabel;



