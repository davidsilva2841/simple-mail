import React from 'react';
import {
  MDBDataTable, MDBContainer
} from "mdbreact";
import Table from "./table";

const CurrentFiltersTable = props => {
  return (
    <MDBContainer id="current-filters-table">
      <h2>Current Filters</h2>
      <Table/>
    </MDBContainer>
  );
};

export default CurrentFiltersTable;
