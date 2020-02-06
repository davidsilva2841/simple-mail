import * as types from '../../../constants/ActionTypes.js';


const initialState = {
  isLoggedIn: false,
  emails: [],
  labels: [],
  filters: []
};


export default (state=initialState, action) => {
  switch (action.type) {
    case types.USER_LOGGED_IN:
      
      return {...state, loggedIn: action.payload};
    case types.SIGN_OUT:
      return {...state, loggedIn: action.payload};
      
    case types.GET_LABELS_FILTERS:
      return {...state, filters: action.payload.filters, labels: action.payload.labels};
    case types.GET_EMAILS:
      return {...state, emails: action.payload};
    default:
      return state;
  }
};

