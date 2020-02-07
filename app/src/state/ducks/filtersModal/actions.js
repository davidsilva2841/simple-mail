import * as types from "../../../constants/ActionTypes";

/**
 * Toggle display of the filter modal
 * @param originalFilterId
 * @returns {{payload : string, type : string}}
 */
export function toggleFilterModal (originalFilterId = '') {
  return {
    type: types.TOGGLE_FILTER_MODAL,
    payload: originalFilterId
  };
}


/**
 * Adds a new filter condition
 * @param index
 * @param value
 * @param oneAllowed {boolean} - If only one item is allowed to be selected at once
 * @returns {{payload : {index : *, value : *}, type : string}}
 */
export function addFilterCondition (index, value, oneAllowed = false) {
  return {
    type: types.ADD_FILTER_CONDITION,
    payload: {
      index, value, oneAllowed
    }
  };
}


/**
 * Removes a filter condition
 * @param index
 * @param value
 * @returns {{payload : {index : *, value : *}, type : string}}
 */
export function removeFilterCondition (index, value) {
  return {
    type: types.REMOVE_FILTER_CONDITION,
    payload: {
      index, value
    }
  };
}


/**
 * Resets current filter settings
 * @returns {{type : string}}
 */
export function resetFilter () {
  return {
    type: types.RESET_FILTER
  }
}


/**
 * Populate filter
 * @param filter
 * @returns {{payload : *, type : string}}
 */
export function populateFilter (filter) {
  return {
    type: types.POPULATE_FILTER,
    payload: filter
  };
}

