import * as types from '../constants/ActionTypes';


const initialState = {
  loggedIn: false
};

export default (state=initialState, action) => {
  switch (action.type) {
    case types.USER_LOGGED_IN:
      console.log(`FILE: userReducer.js loggedin?() | action.payload: \n`, action.payload);
      return {...state, loggedIn: action.payload};
    case types.SIGN_OUT:
      return {...state, loggedIn: action.payload};
    default:
      return state;
  }
};

