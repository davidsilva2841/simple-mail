import React from 'react';
import {connect} from 'react-redux';
import {MDBBtn, MDBContainer, MDBIcon} from 'mdbreact';

import Modal from './modal';
import {toggle} from '../../features/filtersModal/filtersModalSlice';


const FiltersModal = props => {
  return (
      <MDBContainer id="filters-modal">
        <MDBBtn color="default" onClick={ () => props.toggle() }
                style={ {marginLeft: 0} }>
          <MDBIcon icon="edit"/>
          New Filter
        </MDBBtn>
        <Modal
            isOpen={ props.filtersModal.isOpen }
            toggle={ () => props.toggle() }
        />
      </MDBContainer>
  );
};

const mapDispatchToProps = {
  toggle,
};

const mapStateToProps = state => ({
  filtersModal: state.filtersModal,
});

export default connect(mapStateToProps, mapDispatchToProps)(FiltersModal);


