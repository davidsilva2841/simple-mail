import React from 'react';
import { useSelector } from 'react-redux';
import {
  MDBDataTable
} from "mdbreact";


const columns = require('./columns.js');
import getRows from './rows.jsx';


const Table = props => {
  const email = useSelector(state => state.email);
  let rows = getRows(email.filters);
  let data = {
    columns,
    rows
  };
  return (
    <MDBDataTable
      striped
      bordered
      hover
      btn
      autoWidth={false}
      sortable={false}
      searching={false}
      noBottomColumns={true}
      displayEntries={ false }
      info={ false }
      data={ data }
    />
  );
  
};

export default Table;


