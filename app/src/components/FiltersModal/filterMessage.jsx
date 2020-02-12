import React from 'react';
import {MDBAlert} from 'mdbreact';
import {useSelector} from 'react-redux';


const FilterMessage = props => {
  const status = useSelector(state => state.status);
  if ( !status.message ) return null;
  if ( !status.display.filtersModal ) return null;
  return (
      <MDBAlert color={ status.type.color }>
        { status.message }
      </MDBAlert>
  );
};

export default FilterMessage;

