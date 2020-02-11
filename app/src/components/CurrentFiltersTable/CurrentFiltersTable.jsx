import React from 'react';
import {
  MDBContainer,
} from 'mdbreact';
import Table from './table';
import {useSelector} from 'react-redux';


const CurrentFiltersTable = props => {
  const settings = useSelector(state => state.settings);
  if ( settings.filters.length === 0 ) {
    return (
        <MDBContainer id="current-filters-table">
          <h2>No filters found</h2>
        </MDBContainer>
    );
  } else {
    return (
        <MDBContainer id="current-filters-table">
          <h2>Current Filters</h2>
          <Table/>
        </MDBContainer>
    );
  }
};

export default CurrentFiltersTable;

