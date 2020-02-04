import * as types from '../constants/ActionTypes';
import simpleMail from "../api/simpleMail";
const status = require('../constants/StatusTypes');


// --------------------------------------------------------------------------------------------------

/**
 * Toggle display of the filter modal
 * @param originalFilterId {string} - If editing existing filter, include this id
 * @returns {{payload : boolean, type : string}}
 */
export const toggleFilterModal = (originalFilterId = '') => {
  return {
    type: types.TOGGLE_FILTER_MODAL,
    payload: originalFilterId
  }
};


/**
 * Adds a new filter condition
 * @param index
 * @param value
 * @param oneAllowed {boolean} - If only one item is allowed to be selected at once
 * @returns {{payload : {index : *, value : *}, type : string}}
 */
export const addFilterCondition = (index, value, oneAllowed = false) => {
  return {
    type: types.ADD_FILTER_CONDITION,
    payload: {
      index, value, oneAllowed
    }
  };
};


/**
 * Removes a filter condition
 * @param index
 * @param value
 * @returns {{payload : {index : *, value : *}, type : string}}
 */
export const removeFilterCondition = (index, value) => {
  return {
    type: types.REMOVE_FILTER_CONDITION,
    payload: {
      index, value
    }
  };
};


/**
 * Resets current filter settings
 * @returns {{type : string}}
 */
export const resetFilter = () => {
  return {
    type: types.RESET_FILTER
  }
};


/**
 * Delete a filter
 * @param filterId
 * @returns {function(...[*]=)}
 */
export const deleteFilter = filterId => {
  return async (dispatch, getState) => {
    dispatch(updateStatus('Deleting filter', status.inProgress, true));
    simpleMail.delete('/gmail/filter', { params: { filterId } })
      .then(result => {
        dispatch(updateStatus('Deleted filter', status.complete, false));
        console.log(`FILE: emailActions.js | result: \n`, result);
      })
      .catch(error => {
        dispatch(updateStatus('Error deleting filter', status.error, false));
        console.error(`FILE: emailActions.js | ERROR: \n`, error);
      });
  }
};


// --------------------------------------------------------------------------------------------------
// Creating a filter

/**
 * Gets post body for creating a new filter
 * @param newFilters
 * @param labels
 * @returns {{criteria : {from : string, to : string}, action : {addLabelIds : *, removeLabelIds : *}}}
 */
const getPostBody = (newFilters, labels) => {
  const getLabelIds = (array, labels) => {
    return labels
      .filter(label => array.indexOf(label.name) !== -1)
      .map(item => item.id)
  };
  
  const getCriteria = (array) => {
    return (array.length) ? `(${ array.join(',') })` : '';
  };
  
  return {
    criteria: {
      to: getCriteria(newFilters[ 0 ].values),
      'from': getCriteria(newFilters[ 1 ].values),
    },
    action: {
      addLabelIds: getLabelIds(newFilters[ 2 ].values, labels),
      removeLabelIds: getLabelIds(newFilters[ 3 ].values, labels)
    }
  };
  
};


/**
 * Updates status of filter modal
 * @param message
 * @param type
 * @param running {boolean}
 * @returns {{payload : {message : string, type : *}, type : string}}
 */
export const updateStatus = (message = '', type, running) => {
  return {
    type: types.UPDATE_STATUS,
    payload: {
      running,
      message,
      type
    }
  }
};


/**
 * Create a new filter
 * @param newFilters {array}
 * @param labels {array} - List of all labels
 * @param originalFilterId {string}
 * @returns {function(...[*]=)}
 */
export const createFilter = (newFilters, labels, originalFilterId) => {
  return async (dispatch, getState) => {
    let { filters } = getState();
    if ( filters.status.running ) return;
    
    dispatch(updateStatus('Creating filter...', status.inProgress, true));
    
    simpleMail.post('/gmail/filter', getPostBody(newFilters, labels))
      .then(() => {
        dispatch(updateStatus('Created filter', status.complete, false));
        if ( originalFilterId ) dispatch(deleteFilter(originalFilterId));
      })
      .catch(error => {
        let message = 'Error while creating filter';
        try {
          message = error.response.data[ 0 ].message;
        } catch (err) {
          console.error(`FILE: filtersActions.js () | err: \n`, err);
          console.error(`FILE: filtersActions.js () | ERROR: \n`, error);
        }
        
        dispatch(updateStatus(`Error while creating filter: ${ message }`, status.error, false))
      });
    
  }
};


// --------------------------------------------------------------------------------------------------

export const populateFilter = filter => {
  return {
    type: types.POPULATE_FILTER,
    payload: filter
  };
};

