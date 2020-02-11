import * as types from '../../../constants/ActionTypes.js';
import * as api from '../../../api/api.js';


/**
 * Sets login statusTypes
 * @param status
 * @returns {{payload : *, type : string}}
 */
export function setLogin(status) {
  return {
    type: types.SET_LOGIN,
    payload: status,
  };
}


/**
 * Check if user logged in
 * @returns {{payload : boolean, type : string}}
 */
export function checkUserLoggedIn(fetchedFilters) {
  return dispatch => {
    let loggedIn = (document.cookie !== '');
    dispatch(setLogin(true));
    if ( loggedIn && !fetchedFilters ) {
      dispatch(getLabelsFilters());
    } else {
      dispatch(setLogin(false));
    }
  };
}


/**
 * Reset the state of user
 * @returns {{type : string}}
 */
export function resetState() {
  return {
    type: types.RESET_STATE,
  };
}


/**
 * Sign out a user
 * @returns {{payload : boolean, type : string}}
 */
export function signOut() {
  document.cookie = 'cookie=; Max-Age=0';
  return dispatch => {
    dispatch(resetState());
    dispatch(setLogin(document.cookie !== ''));
  };
}


/**
 * Get labels and filters
 * @returns {function(...[*]=)}
 */
export function getLabelsFilters() {
  return async (dispatch, getState) => {
    api.getLabelFilters().then(result => {
      dispatch({
        type: types.GET_LABELS_FILTERS,
        payload: result.data,
      });
    }).catch(error => {
      console.error(`FILE: emailActions.js | ERROR: \n`, error);
    });
  };
}


/**
 * Get emails
 * @returns {function(...[*]=)}
 */
export function getEmails() {
  return async (dispatch, getState) => {
    api.getEmails().then(result => {
      dispatch({
        type: types.GET_EMAILS,
        payload: result.data,
      });
    }).catch(error => {
      console.error(`FILE: emailActions.js getEmails()| ERROR: \n`, error);
    });
  };
}
