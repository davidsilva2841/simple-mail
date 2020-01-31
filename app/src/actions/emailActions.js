import * as types from '../constants/ActionTypes';
import simpleMail from "../api/simpleMail";

// --------------------------------------------------------------------------------------------------

/**
 * Get labels and filters
 * @returns {function(...[*]=)}
 */
export const getLabelsFilters = () => {
  return async (dispatch, getState) => {
    simpleMail.get('/testing/gmail/labels-filters0')
    // simpleMail.get('/gmail/labels-filters')
      .then(result => {
        dispatch({
          type: types.GET_LABELS_FILTERS,
          payload: result.data
        })
      })
      .catch(error => {
        console.error(`FILE: emailActions.js getFilters()| ERROR: \n`, error);
      });
  }
};


/**
 * Get emails
 * @returns {function(...[*]=)}
 */
export const getEmails = () => {
  return async (dispatch, getState) => {
    simpleMail.get('/testing/gmail/emails0')
    // simpleMail.get('/gmail/email')
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




