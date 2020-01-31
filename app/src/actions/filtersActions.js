import * as types from '../constants/ActionTypes';
import simpleMail from "../api/simpleMail";


/**
 * Adds a new filter condition
 * @param index
 * @param value
 * @returns {{payload : {index : *, value : *}, type : string}}
 */
export const addFilterCondition = (index, value) => {
  return {
    type: types.ADD_FILTER_CONDITION,
    payload: {
      index, value
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




const getPostBody = (newFilters, labels) => {
  const getLabelIds = (array, labels) => {
    return labels
      .filter(label => array.indexOf(label.name) !== -1)
      .map(item => item.id)
  };
  
  const getCriteria = (array) => {
    return (array.length) ? `(${array.join(',')})` : '';
  };
  
	return {
	  criteria: {
	    to: getCriteria(newFilters[0].values),
      'from': getCriteria(newFilters[1].values),
    },
    action: {
	    addLabelIds: getLabelIds(newFilters[2].values, labels),
      removeLabelIds: getLabelIds(newFilters[3].values, labels)
    }
  };
  
};


export const createFilter = (newFilters, labels) => {
  return async (dispatch, getState) => {
    console.log(`FILE: filtersActions.js ()`);
    let postBody = getPostBody(newFilters, labels);
    console.log(`FILE: filtersActions.js () | postBody: \n`, postBody);
    simpleMail.post('/gmail/filter', postBody)
    .then(result => {
    	console.log(`FILE: filtersActions.js | result: \n`, result);
      return dispatch({
        type: types.CREATE_FILTER
      })
    })
    .catch(error => {
    	console.error(`FILE: filtersActions.js | ERROR: \n`, error);
    	console.error(`FILE: filtersActions.js | ERROR: \n`, error.response);
    });

  }
};


export const deleteFilter = filterId => {
  return async (dispatch, getState) => {
    simpleMail.delete('/gmail/filter', { params: { filterId } })
      .then(result => {
        console.log(`FILE: emailActions.js | result: \n`, result);
      })
      .catch(error => {
        console.error(`FILE: emailActions.js | ERROR: \n`, error);
      });
  }
};


