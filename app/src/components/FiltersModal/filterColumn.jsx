import React from 'react';
import { MDBCol } from "mdbreact";
import InputAddress from "./inputAddress";
import InputRemoveLabel from "./inputRemoveLabel";
import InputAddLabel from "./inputAddLabel";
import { useSelector } from 'react-redux';
import FilterConditionLabel from "./conditionLabel";


const renderInput = (filter) => {
  if ( filter.type === 'address' ) {
    return (
      <InputAddress index={ filter.index }/>
    )
  } else if ( filter.type === 'addLabel' ) {
    return (
      <InputAddLabel index={ filter.index }/>
    );
  } else if ( filter.type === 'removeLabel' ) {
    return (
      <InputRemoveLabel index={ filter.index }/>
    )
  }
};


const FilterColumn = props => {
  const { index } = props;
  const filters = useSelector(state => state.filters);
  let filter = filters.newFilters[ index ];
  return (
    <MDBCol>
      <MDBCol><h5>{ filter.title }</h5></MDBCol>
      
      { filter.values.map((value, key) => <FilterConditionLabel index={ index } value={ value } key={ key }/>) }
      { renderInput(filter) }
    </MDBCol>
  );
};

export default FilterColumn;



