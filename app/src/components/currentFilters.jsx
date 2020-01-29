import React, { Component } from 'react';
import {
  MDBDataTable,
  MDBContainer,
  MDBBtn,
  MDBIcon,
} from "mdbreact";

import { useSelector, useDispatch } from "react-redux";
import FilterButton from "./filterButton";

const columns = [
  {
    label: 'Sent to',
    field: 'sentToAddress',
    sort: 'asc',
    width: 150
  },
  {
    label: 'From Address',
    field: 'fromAddress',
    sort: 'asc',
    width: 150
  },
  {
    label: 'Add Labels',
    field: 'addLabels',
    sort: 'asc',
    width: 150
  },
  {
    label: 'Remove Labels',
    field: 'removeLabels',
    sort: 'asc',
    width: 150
  },
];

const buildRows = filters => {
	let rows = [];
  for(let filter of filters) {
    let row = {};
    row.sentToAddress = filter.sentToAddress.map((sentTo, key) =>
      <FilterButton
        id={filter.id}
        display={sentTo}
        key={key}
      />
    );
		row.fromAddress = filter.fromAddress.map((fromAddress, key) =>
      <FilterButton
        id={filter.id}
        display={fromAddress}
        key={key}
      />
		);
		row.addLabels = filter.addLabels.map((addLabel, key) =>
      <FilterButton
        id={filter.id}
        display={addLabel.name}
        key={key}
      />
    );
		
		row.removeLabels = filter.removeLabels.map((removeLabel, key) =>
      <FilterButton
        id={filter.id}
        display={removeLabel.name}
        key={key}
      />
    );
		
		rows.push(row);
	}
  console.log(rows);
  return rows;
};


const CurrentFilters = props => {
  const email = useSelector(state => state.email);
  let rows = buildRows(email.filters);
  let data = {
    columns,
    rows
  };
  return (
    <MDBContainer id="current-filters">
      <h2>Current Filters</h2>
      <MDBDataTable
        striped
        bordered
        hover
        noBottomColumns={true}
        displayEntries={ false }
        info={ false }
        data={ data }
      />
    </MDBContainer>
  );
};

export default CurrentFilters;




