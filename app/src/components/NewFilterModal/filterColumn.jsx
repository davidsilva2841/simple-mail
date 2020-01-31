import React from 'react';
import { MDBCol, MDBListGroup } from 'mdbreact';
import FilterAddressInput from "./filterAddressInput";
import FilterRuleLabel from "./filterRuleLabel";
import LabelInputDropDown from "./labelInputDropDown";

// --------------------------------------------------------------------------------------------------

/**
 * Renders a drop down or input field
 * @param type
 * @param index
 * @param value
 * @param onChange
 * @param onSubmit
 * @param onDropDown
 * @returns {*}
 */
const renderSelector = (type, index, value, onChange, onSubmit, onDropDown) => {
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
        onDropDown={onDropDown}
      />
    );
  }
};


/**
 * Filter column that holds entered filter params
 * @param props
 * @returns {*}
 * @constructor
 */
const FilterColumn = props => {
  const {index, title, values, value, type} = props.filter;
  const {onSubmit, onChange, onDropDown, onDeleteLabel} = props;
  return (
    <MDBCol >
      <MDBCol >
        <h5>{title}</h5>
      </MDBCol>
      <MDBListGroup>
        {values.map((value, key) =>
          <FilterRuleLabel
            index={index}
            value={value}
            key={key}
            onDeleteLabel={onDeleteLabel}
          />
        )}
      </MDBListGroup>
      {renderSelector(type, index, value, onChange, onSubmit, onDropDown)}
      
    </MDBCol>
  );
};


export default FilterColumn;
