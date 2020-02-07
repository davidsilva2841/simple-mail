import * as types from '../../../constants/ActionTypes.js';


const initialState = {
  newFilters: [
    { index: 0, title: 'Sent to', name: 'to', values: [], value: '', type: 'address' },
    { index: 1, title: 'From', name: 'from', values: [], value: '', type: 'address' },
    { index: 2, title: 'Add Label', name: 'addLabelIds', values: [], value: '', type: 'addLabel' },
    { index: 3, title: 'Remove Labels', name: 'removeLabelIds', values: [], value: '', type: 'removeLabel' }
  ],
  isOpen: false,
};

/**
 * Add filter condition
 * @param newFilters
 * @param index
 * @param value
 * @param oneAllowed
 * @returns {*}
 */
const addFilterCondition = ({ newFilters }, { index, value, oneAllowed }) => {
  if ( oneAllowed ) {
    newFilters[ index ].values = [value]
  } else {
    let values = newFilters[ index ].values.map(value => value.toUpperCase());
    if ( values.indexOf(value.toUpperCase()) === -1 ) {
      newFilters[ index ].values.push(value);
    }
  }
  return newFilters;
};


/**
 * Remove filter condition
 * @param newFilters
 * @param index
 * @param value
 * @returns {*}
 */
const removeFilterCondition = ({ newFilters }, { index, value }) => {
  newFilters[ index ].values = newFilters[ index ].values.filter(val => val !== value);
  return newFilters;
};


/**
 * Double check to see if still editing filter
 * @param originalFilterId
 * @param newFilters
 * @returns {string|*}
 */
const checkEditingStatus = ({ originalFilterId }, newFilters) => {
  for (let filter of newFilters) {
    if ( filter.values.length > 0 ) {
      return originalFilterId;
    }
  }
  return '';
};


/**
 * Reset filters
 * @param newFilters
 * @returns {*}
 */
const resetFilters = ({ newFilters }) => {
  for (let filter of newFilters) {
    filter.values = [];
  }
  return newFilters;
};


/**
 * Populates filter with existing filter for editing
 * @param filter
 * @returns {[{values : [], name : string, index : number, title : string, type : string, value : string}, {values : [], name : string, index : number, title : string, type : string, value : string}, {values : [], name : string, index : number, title : string, type : string, value : string}, {values : [], name : string, index : number, title : string, type : string, value : string}]|({values : [], name : string, index : number, title : string, type : string, value : string}|{values : [], name : string, index : number, title : string, type : string, value : string}|{values : [], name : string, index : number, title : string, type : string, value : string}|{values : [], name : string, index : number, title : string, type : string, value : string})[]}
 */
const populateFilter = filter => {
  let { newFilters } = initialState;
  const getLabels = labels => {
    if ( labels.length > 0 ) {
      return labels.map(label => label.name);
    } else {
      return [];
    }
  };
  
  newFilters[ 0 ].values = [...filter.sentToAddress];
  newFilters[ 1 ].values = [...filter.fromAddress];
  newFilters[ 2 ].values = getLabels(filter.addLabels);
  newFilters[ 3 ].values = getLabels(filter.removeLabels);
  return newFilters;
};


/**
 * Checks if filter modal can be updated
 * @param state
 * @returns {boolean}
 */
const canUpdate = (state) => {
  if ( state.status.running ) {
    notifications.warning('Please wait for current action to complete');
    return false;
  }
  return true;
};


export default (state = { ...initialState }, action) => {
  switch ( action.type ) {
    case types.TOGGLE_FILTER_MODAL: {
      if ( !canUpdate(state) ) return { ...state };
      let newFilters = resetFilters(state);
      return {
        ...state,
        isOpen: !state.isOpen,
        newFilters,
        status: initialState.status,
        originalFilterId: action.payload
      }
    }
    case types.ADD_FILTER_CONDITION: {
      if ( !canUpdate(state) ) return { ...state };
      let newFilters = addFilterCondition(state, action.payload);
      return { ...state, newFilters, status: initialState.status };
    }
    case types.REMOVE_FILTER_CONDITION: {
      if ( !canUpdate(state) ) return { ...state };
      let newFilters = removeFilterCondition(state, action.payload);
      let originalFilterId = checkEditingStatus(state, newFilters);
      return { ...state, newFilters, originalFilterId, status: initialState.status };
    }
    case types.RESET_FILTER: {
      if ( !canUpdate(state) ) return { ...state };
      let newFilters = resetFilters(state);
      return { ...state, newFilters, status: initialState.status, originalFilterId: '' };
    }
    case types.POPULATE_FILTER: {
      if ( !canUpdate(state) ) return { ...state };
      let newFilters = populateFilter(action.payload);
      return { ...state, newFilters };
    }
    default:
      return state;
  }
};
