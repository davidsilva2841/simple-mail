import React from 'react';
import {MDBCol, MDBListGroup} from 'mdbreact';
import {useSelector} from 'react-redux';

import FilterConditionLabel from './conditionLabel';


const FilterColumn = props => {
  const {index} = props;
  const filtersModal = useSelector(state => state.filtersModal);
  let filter = filtersModal.filters[ index ];
  
  return (
      <MDBCol>
        <MDBCol><h5>{ filter.title }</h5></MDBCol>
        
        <MDBListGroup className="labels-column">
          { filter.values.map(
              (value, key) => <FilterConditionLabel index={ index }
                                                    value={ value }
                                                    key={ key }/>) }
        </MDBListGroup>
      
      </MDBCol>
  );
};

export default FilterColumn;



