import React from 'react';
import { MDBCol } from "mdbreact";
import InputAddress from "./inputAddress";
import InputLabel from "./inputLabel";
import { useSelector } from 'react-redux';
import FilterConditionLabel from "./conditionLabel";

const FilterColumn = props => {
  const { index } = props;
  const filters = useSelector(state => state.filters);
  let filter = filters.newFilters[ index ];
  return (
    <MDBCol>
      <MDBCol><h5>{ filter.title }</h5></MDBCol>
      
      { filter.values.map((value, key) => <FilterConditionLabel index={index} value={ value } key={ key }/>) }
      { (filter.type === 'label') ? <InputLabel index={ filter.index }/> : <InputAddress index={ filter.index }/> }
    </MDBCol>
  );
};

export default FilterColumn;



