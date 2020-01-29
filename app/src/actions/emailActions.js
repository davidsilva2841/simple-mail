import * as types from '../constants/ActionTypes';
import simpleMail from "../api/simpleMail";

// --------------------------------------------------------------------------------------------------

/**
 * Get labels under users email
 * @returns {function(...[*]=)}
 */
export const getLabels = () => {
  return async (dispatch, getState) => {
    simpleMail.get('/testing/gmail/labels0')
      .then(result => {
        console.log(`FILE: emailActions.js getLabels()| result: \n`, result);
        dispatch({
          type: types.GET_LABELS,
          payload: result.data
        })
      })
      .catch(error => {
        console.error(`FILE: emailActions.js getLabels()| ERROR: \n`, error);
      });
  }
};


/**
 * Get filters under users emails
 * @returns {function(...[*]=)}
 */
export const getFilters = () => {
  return async (dispatch, getState) => {
    simpleMail.get('/testing/gmail/filters0')
      .then(result => {
        dispatch({
          type: types.GET_FILTERS,
          payload: result.data
        })
      })
      .catch(error => {
        console.error(`FILE: emailActions.js getFilters()| ERROR: \n`, error);
      });
  }
};

export const getLabelsFilters = () => {
  return async (dispatch, getState) => {
    simpleMail.get('/testing/gmail/labels-filters0')
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




export const getEmails = () => {
  return async (dispatch, getState) => {
    simpleMail.get('/testing/gmail/emails0')
      .then(result => {
        console.log(`FILE: emailActions.js getEmails()| result: \n`, result);
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

