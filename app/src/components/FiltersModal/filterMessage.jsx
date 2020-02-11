import React from 'react';
import {MDBAlert} from 'mdbreact';
import {useSelector} from 'react-redux';


const FilterMessage = props => {
  // const {message, type} = props.statusTypes;
  const status = useSelector(state => state.status);
  if ( !status.message ) return null;
  if ( !status.display.filtersModal) return null;
  console.log(`FILE: filterMessage.jsx FilterMessage() | status.display:`, status.display);
  return (
      <MDBAlert color={ status.type.color }>
        { status.message }
      </MDBAlert>
  );
};

export default FilterMessage;

