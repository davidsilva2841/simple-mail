import React from 'react';
import {connect} from 'react-redux';
import {MDBListGroupItem, MDBChip} from 'mdbreact';

import {removeFilterCondition} from '../../features/filtersModal/filtersModalSlice.js';


const ConditionLabel = (props) => {
  const {index, value, removeFilterCondition} = props;
  return (
      <MDBListGroupItem
          className="d-flex justify-content-between align-items-center">
        <span>{ value }</span>
        <MDBChip
            style={ {margin: '0'} }
            
            tag="span"
            text="white"
            bgColor="danger-color"
            onClick={ () => removeFilterCondition({index, value}) }
        >Delete</MDBChip>
      </MDBListGroupItem>
  );
};

export default connect(null, {removeFilterCondition})(ConditionLabel);



