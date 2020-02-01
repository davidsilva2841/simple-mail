import * as types from '../constants/ActionTypes';


const initialState = {
  newFilters: [
    { index: 0, title: 'Sent to', name: 'to', values: [], value: '', type: 'address' },
    { index: 1, title: 'From', name: 'from', values: [], value: '', type: 'address' },
    { index: 2, title: 'Add Label', name: 'addLabelIds', values: [], value: '', type: 'addLabel' },
    { index: 3, title: 'Remove Label', name: 'removeLabelIds', values: [], value: '', type: 'removeLabel' }
  ],
  status: {
    error: false,
    message: ''
  }

  
};


const addFilterCondition = ({ newFilters }, { index, value, oneAllowed }) => {
  if ( oneAllowed ) {
    newFilters[ index ].values = [value]
  } else {
    if ( newFilters[ index ].values.indexOf(value) === -1 ) {
      newFilters[ index ].values.push(value);
    }
  }
  return newFilters;
};

const removeFilterCondition = ({ newFilters }, { index, value }) => {
  newFilters[ index ].values = newFilters[ index ].values.filter(val => val !== value);
  return newFilters;
};

const resetFilters = ({ newFilters }) => {
  for (let filter of newFilters) {
    filter.values = [];
  }
  return newFilters;
};



export default (state = initialState, action) => {
  switch ( action.type ) {
    case types.ADD_FILTER_CONDITION: {
      let newFilters = addFilterCondition(state, action.payload);
      return { ...state, newFilters, status: initialState.status };
    }
    case types.REMOVE_FILTER_CONDITION: {
      let newFilters = removeFilterCondition(state, action.payload);
      return { ...state, newFilters, status: initialState.status };
    }
    case types.RESET_FILTER: {
      let newFilters = resetFilters(state);
      return { ...state, newFilters, status: initialState.status };
    }
    case types.CREATE_FILTER: {
      return { ...state, status: action.payload };
    }
    default:
      return state;
  }
};
