import React, { Component } from 'react';
import {
  MDBDataTable,
  MDBContainer,
  MDBBtn,
  MDBIcon,
} from "mdbreact";

import { useSelector, useDispatch } from "react-redux";
import FilterLabelButton from "./filterLabelButton";
import FilterAddressButton from "./filterAddressButton";
import FilterEditButton from "./filterEditButton";
import FilterDeleteButton from "./filterDeleteButton";
import NewFilterButton from "../components/newFilterButton";

const columns = [
  {
    label: 'Sent to',
    field: 'sentToAddress',
    sort: 'asc',
    
  },
  {
    label: 'From Address',
    field: 'fromAddress',
    sort: 'asc',
    width: 300
  },
  {
    label: 'Add Labels',
    field: 'addLabels',
    sort: 'asc',
  },
  {
    label: 'Remove Labels',
    field: 'removeLabels',
    sort: 'asc',
  },
  {
    label: 'Edit',
    field: 'editFilter',
    sort: 'asc',
    width: 10
  },
  {
    label: 'Delete',
    field: 'deleteFilter',
    width: 10
  },
];

const buildRows = filters => {
	let rows = [];
  for(let filter of filters) {
    let row = {};
    
    
    row.editFilter = <FilterEditButton filter={filter}/>;
    row.deleteFilter = <FilterDeleteButton filter={filter}/>;
    
    row.sentToAddress = filter.sentToAddress.map((sentTo, key) =>
      <FilterAddressButton
        type='sentToAddress'
        id={filter.id}
        data={sentTo}
        display={sentTo}
        key={key}
      />
    );
    
		row.fromAddress = filter.fromAddress.map((fromAddress, key) =>
      <FilterAddressButton
        type='fromAddress'
        id={filter.id}
        data={fromAddress}
        display={fromAddress}
        key={key}
      />
		);
		
		row.addLabels = filter.addLabels.map((addLabel, key) =>
      <FilterLabelButton
        type='addLabel'
        id={filter.id}
        data={addLabel}
        display={addLabel.name}
        key={key}
      />
    );
		
		row.removeLabels = filter.removeLabels.map((removeLabel, key) =>
      <FilterLabelButton
        type='removeLabel'
        id={filter.id}
        data={removeLabel}
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
    <div id="current-filters" className='module'>
      <h2>Current Filters</h2>
      <NewFilterButton />
      <MDBDataTable
        striped
        bordered
        hover
        btn
        autoWidth
        sortable={false}
        searching={false}
        noBottomColumns={true}
        displayEntries={ false }
        info={ false }
        data={ data }
      />
    </div>
  );
};

export default CurrentFilters;



