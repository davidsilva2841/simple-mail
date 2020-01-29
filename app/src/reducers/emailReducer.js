import * as types from '../constants/ActionTypes';


const initialState = {
  emails: [],
  labels: [],
  filters: []
};

export default (state=initialState, action) => {
  switch (action.type) {
    case types.GET_LABELS:
      return {...state, labels: action.payload};
    default:
      return state;
  }
  
};
