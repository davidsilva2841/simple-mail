import {createSlice} from '@reduxjs/toolkit';

import * as simpleMail from '../../services/simpleMailAPI.js';
import {setStatus, handleError, isBusy} from '../status/statusSlice';
import {getLabelsFilters} from '../settings/settingsSlice.js';


// const statusTypes = require('../../constants/StatusTypes.js');
const statusTypes = require('../status/types.js');

// --------------------------------------------------------------------------------------------------

const filtersSlice = createSlice({
  name: 'filters',
  initialState: {},
  reducers: {},
});

// export const {  } = filtersSlice.actions;
export default filtersSlice.reducer;


/**
 * Delete a filter
 * @param filterId {string}
 * @param busy {boolean}
 * @param refreshLabelsFilters {boolean}
 * @returns {function(...[*]=)}
 */
export function deleteFilter(filterId, busy = false, refreshLabelsFilters = true) {
  return async (dispatch, getState) => {
    try {
      dispatch(setStatus(true, 'Deleting filter.', statusTypes.inProgress));
      await simpleMail.deleteFilter(filterId);
      if (refreshLabelsFilters) dispatch(getLabelsFilters());
      
      dispatch(setStatus(
          busy,
          'Finished deleting filter',
          busy ? statusTypes.inProgress : statusTypes.complete,
      ));
      
    } catch (error) {
      dispatch(handleError(error, busy));
    }
  };
}


/**
 * Create a filter
 * @param labels
 * @param filters
 * @param originalFilterId
 * @returns {function(...[*]=)}
 */
export function createFilter(labels, filters, originalFilterId) {
  /**
   * Creates post body for creating filter
   * @param labels
   * @param filters
   * @returns {{criteria : {from : string, to : string}, action : {addLabelIds : *, removeLabelIds : *}}}
   */
  const getPostBody = (labels, filters) => {
    const getLabelIds = (array, labels) => {
      return labels.filter(label => array.indexOf(label.name) !== -1).
          map(item => item.id);
    };
    
    const getCriteria = (array) => {
      return (array.length) ? `(${ array.join(',') })` : '';
    };
    
    return {
      criteria: {
        to: getCriteria(filters[ 0 ].values),
        'from': getCriteria(filters[ 1 ].values),
      },
      action: {
        addLabelIds: getLabelIds(filters[ 2 ].values, labels),
        removeLabelIds: getLabelIds(filters[ 3 ].values, labels),
      },
    };
  };
  
  return async (dispatch, getState) => {
    if ( await dispatch(isBusy()) ) return;
    
    try {
      dispatch(setStatus(true, 'Creating filter', statusTypes.inProgress));
      
      await simpleMail.createFilter(getPostBody(labels, filters));
      if ( originalFilterId ) await dispatch(deleteFilter(originalFilterId, true, false));
  
      dispatch(getLabelsFilters());
      dispatch(setStatus(false, 'Success', statusTypes.complete));
    } catch (error) {
      dispatch(handleError(error, false));
    }
  };
}



