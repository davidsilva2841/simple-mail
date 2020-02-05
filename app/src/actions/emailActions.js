import * as types from '../constants/ActionTypes.js';
const api = require('../api/api.js');
// --------------------------------------------------------------------------------------------------

/**
 * Get labels and filters
 * @returns {function(...[*]=)}
 */
export const getLabelsFilters = () => {
  return async (dispatch, getState) => {
    api.getLabelFilters()
      .then(result => {
        dispatch({
          type: types.GET_LABELS_FILTERS,
          payload: result.data
        })
      })
      .catch(error => {
        console.error(`FILE: emailActions.js | ERROR: \n`, error);
      });
  }
};


/**
 * Get emails
 * @returns {function(...[*]=)}
 */
export const getEmails = () => {
  return async (dispatch, getState) => {
    api.getEmails()
      .then(result => {
        dispatch({
          type: types.GET_EMAILS,
          payload: result.data
        })
      })
      .catch(error => {
        console.error(`FILE: emailActions.js getEmails()| ERROR: \n`, error);
      });
  }
};




