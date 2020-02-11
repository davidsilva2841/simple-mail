import React from 'react';
import {connect} from 'react-redux';
import {
  MDBContainer,
  MDBModal,
  MDBModalHeader,
} from 'mdbreact';

import ModalBody from './modalBody.jsx';
import ModalFooter from './modalFooter.jsx';
import FilterMessage from './filterMessage';
import {
  toggle,
} from '../../features/filtersModal/filtersModalSlice';


const Modal = props => {
  const {filtersModal, toggle} = props;
  
  return (
      <MDBContainer id="modal">
        <MDBModal size="fluid" isOpen={ filtersModal.isOpen }
                  toggle={ () => toggle() }>
          
          {/* Title */ }
          <MDBModalHeader>{ filtersModal.originalFilterId ?
              'Edit Filter' :
              'New Filter' }</MDBModalHeader>
          
          <ModalBody/>
          <ModalFooter/>
          <FilterMessage/>
        
        </MDBModal>
      </MDBContainer>
  );
  
};

const mapDispatchToProps = {
  toggle,
};

const mapStateToProps = state => {
  return {
    filtersModal: state.filtersModal,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);



