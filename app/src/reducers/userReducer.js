import * as types from '../constants/ActionTypes';


const initialState = {
  loggedIn: false
};

export default (state=initialState, action) => {
  switch (action.type) {
    case types.USER_LOGGED_IN:
      return {...state, loggedIn: action.payload};
    case types.SIGN_OUT:
      return {...state, loggedIn: action.payload};
    default:
      return state;
  }
};

