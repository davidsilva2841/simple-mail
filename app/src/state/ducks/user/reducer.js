import * as types from '../../../constants/ActionTypes.js';


const initialState = {
  isLoggedIn: false,
  fetchedLabelsFilters: false,
  emails: [],
  labels: [],
  filters: [],
};

export default (state = {...initialState}, action) => {
  switch ( action.type ) {
    case types.SET_LOGIN:
      return {...state, isLoggedIn: action.payload};
    case types.RESET_STATE:
      return initialState;
    case types.GET_LABELS_FILTERS:
      return {
        ...state,
        filters: action.payload.filters,
        labels: action.payload.labels,
        fetchedLabelsFilters: true,
      };
    case types.GET_EMAILS:
      return {...state, emails: action.payload};
    default:
      return state;
  }
};

