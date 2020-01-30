import * as types from '../constants/ActionTypes';


const initialState = {
  emails: [],
  labels: [],
  filters: []
};

export default (state=initialState, action) => {
  switch (action.type) {
    case types.GET_LABELS_FILTERS:
      return {...state, filters: action.payload.filters, labels: action.payload.labels};
    case types.GET_EMAILS:
      return {...state, emails: action.payload};
    default:
      return state;
  }
  
};
