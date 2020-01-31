import * as types from '../constants/ActionTypes';


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



export const createFilter = () => {
  return async (dispatch, getState) => {
  
  }
};


