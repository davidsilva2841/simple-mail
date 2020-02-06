import React from 'react';
import { useDispatch } from 'react-redux';
import { MDBBtn, MDBIcon } from "mdbreact";
import {toggleFilterModal, populateFilter} from "../../state/ducks/filters/actions.js";

const FilterEditButton = (props) => {
  const dispatch = useDispatch();
  return (
    <MDBBtn
      onClick={() => {
        dispatch(toggleFilterModal(props.filter.id));
        dispatch(populateFilter(props.filter));
      }}
      color="elegant"
      size="sm"
      className="icon-button"
    >
      <MDBIcon icon="edit" size="2x"/>
    </MDBBtn>
  );
  
};

export default FilterEditButton;
