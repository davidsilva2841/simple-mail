import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MDBBtn, MDBContainer, MDBIcon } from "mdbreact";
import Modal from "./modal";
import { toggleFilterModal } from "../../state/ducks/filters/actions.js";

const FiltersModal = props => {
  const dispatch = useDispatch();
  const filters = useSelector(state => state.filters);
  return (
    <MDBContainer id="filters-modal">
      <MDBBtn color="default" onClick={ () => dispatch(toggleFilterModal()) } style={ { marginLeft: 0 } }>
        <MDBIcon icon="edit"/>
        New Filter
      </MDBBtn>
      <Modal
        isOpen={ filters.isOpen }
        toggle={ () => dispatch(toggleFilterModal()) }
      />
    </MDBContainer>
  );
};

export default FiltersModal;


