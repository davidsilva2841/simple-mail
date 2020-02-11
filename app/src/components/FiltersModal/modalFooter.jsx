import React from 'react';
import {connect} from 'react-redux';
import {MDBBtn, MDBModalFooter} from 'mdbreact';
import {
  toggle,
  resetFiltersModal,
} from '../../features/filtersModal/filtersModalSlice.js';
import {createFilter} from '../../features/filters/filtersSlice.js';


const ModalFooter = props => {
  const {toggle, resetFiltersModal, filtersModal, createFilter, settings} = props;
  return (
      <MDBModalFooter id="footer">
        <MDBBtn rounded color="danger" onClick={ () => toggle() }>Close</MDBBtn>
        <MDBBtn rounded color="danger"
                onClick={ () => resetFiltersModal() }>Reset</MDBBtn>
        {/*<MDBBtn rounded color="default" onClick={ () => createFilter(filters.newFilters, user.labels, filters.originalFilterId) }*/ }
        <MDBBtn rounded color="default"
                onClick={ () => createFilter(settings.labels,
                    filtersModal.filters, filtersModal.originalFilterId) }
        >Submit</MDBBtn>
      </MDBModalFooter>
  );
};

const mapStateToProps = state => ({
  filtersModal: state.filtersModal,
  settings: state.settings,
});

export default connect(mapStateToProps,
    {toggle, resetFiltersModal, createFilter})(ModalFooter);


