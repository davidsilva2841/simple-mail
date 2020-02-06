import * as types from "../../../constants/ActionTypes.js";
import * as api from '../../../api/api.js';


/**
 * Check if user logged in
 * @returns {{payload : boolean, type : string}}
 */
export function checkUserLoggedIn () {
  return {
    type: types.USER_LOGGED_IN,
    payload: (document.cookie !== '')
  }
}


/**
 * Sign out a user
 * @returns {{payload : boolean, type : string}}
 */
export function signOut () {
  document.cookie = 'cookie=; Max-Age=0';
  return {
    type: types.SIGN_OUT,
    payload: (document.cookie !== '')
  }
}


/**
 * Get labels and filters
 * @returns {function(...[*]=)}
 */
export function getLabelsFilters () {
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
}


/**
 * Get emails
 * @returns {function(...[*]=)}
 */
export function getEmails () {
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
}
