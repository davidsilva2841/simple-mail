import React from 'react';
import { MDBCol } from 'mdbreact';
import FilterAddressInput from "./filterAddressInput";
import FilterRuleLabel from "./filterRuleLabel";
import LabelInputDropDown from "./labelInputDropDown";

const renderSelector = (type, index, value, onChange, onSubmit) => {
  if (type === 'address') {
    return (
      <FilterAddressInput
        index={index}
        value={value}
        onChange={onChange}
        onSubmit={onSubmit}
      />
    );
  } else {
    return (
      <LabelInputDropDown
        index={index}
        value={value}
        onChange={onChange}
        onSubmit={onSubmit}
      />
    );
  }
};


const FilterColumn = props => {
  const {index, title, values, value, type} = props.filter;
  const {onSubmit, onChange} = props;
  return (
    <MDBCol >
      <MDBCol >
        <h5>{title}</h5>
      </MDBCol>
      {values.map((value, key) => <FilterRuleLabel value={value} key={key}/>)}
      {renderSelector(type, index, value, onChange, onSubmit)}
      
    </MDBCol>
  );
};

export default FilterColumn;
