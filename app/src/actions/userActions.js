import * as types from '../constants/ActionTypes';


export const checkUserLoggedIn = () => {
  return {
    type: types.USER_LOGGED_IN,
    payload: (document.cookie !== '')
  }
};

export const signOut = () => {
  document.cookie = 'cookie=; Max-Age=0';
  return {
    type: types.SIGN_OUT,
    payload: (document.cookie !== '')
  }
};
