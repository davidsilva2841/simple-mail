import React from 'react';
import { useSelector } from 'react-redux';
import {
  MDBDataTable
} from "mdbreact";


const columns = require('./columns.js');
import getRows from './rows.jsx';


const Table = props => {
  const user = useSelector(state => state.user);
  let rows = getRows(user.filters);
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


