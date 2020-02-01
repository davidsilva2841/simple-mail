import React from 'react';
import { useDispatch } from 'react-redux';
import { MDBBadge, MDBCol, MDBIcon, MDBListGroupItem, MDBChip } from "mdbreact";
import {removeFilterCondition} from "../../actions";

const ConditionLabel = (props) => {
  const dispatch = useDispatch();
  const {index, value} = props;
  return (
    <MDBCol>
      <MDBListGroupItem className="d-flex justify-content-between align-items-center">
        {value}
        <MDBChip
          style={{margin:'0'}}
          
          tag="span"
          text="white"
          bgColor="danger-color"
          onClick={() => dispatch(removeFilterCondition(index, value))}
          handleClose={() => dispatch(removeFilterCondition(index, value))}
        >Delete</MDBChip>
      </MDBListGroupItem>
    </MDBCol>
  );
  
};

export default ConditionLabel;


//        <MDBBadge
//           color="danger"
//           className="list-btn"
//           onClick={() => dispatch(removeFilterCondition(index, value))}
//           pill
//         >
//           <MDBIcon icon="minus-circle" size="2x"/>
//         </MDBBadge>
