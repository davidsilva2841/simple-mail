import {createSlice} from '@reduxjs/toolkit';

import * as notifications from '../../services/notifications.js';
import {isBusy, resetStatus} from '../status/statusSlice.js';

// --------------------------------------------------------------------------------------------------
// Slice

const filters = require('./filters.js');

const initialState = {
  isOpen: false,
  
  originalFilterId: '',
  filters: filters,
};

const filtersModalSlice = createSlice({
  name: 'filtersModal',
  initialState: {...initialState},
  reducers: {
    
    
    /**
     * Toggle visibility of modal
     * @param state
     * @param action
     */
    toggle(state, action) {
      state.isOpen = !state.isOpen;
    },
    
    
    /**
     * Add filter condition
     * @param state
     * @param action
     */
    handleAddFilterCondition(state, action) {
      const {index, value} = action.payload;
      const filter = state.filters[ index ];
      if ( !filter.multipleValues ) {
        filter.values = [value];
      } else {
        let values = filter.values.map(value => value.toUpperCase());
        if ( values.indexOf(value.toUpperCase()) === -1 ) {
          filter.values.push(value);
        }
      }
    },
    
    
    /**
     * Remove filter condition
     * @param state
     * @param action
     */
    handleRemoveFilterCondition(state, action) {
      state.filters[ action.payload.index ].values =
          state.filters[ action.payload.index ].values.filter(
              val => val !== action.payload.value);
      
      if ( state.originalFilterId ) {
        const isEditing = (filters) => {
          for (let filter of filters) {
            if ( filter.values.length > 0 ) return true;
          }
          return false;
        };
        if ( !isEditing(state.filters) ) state.originalFilterId = '';
      }
    },
    
    
    /**
     * Reset filters
     * @param state
     * @param action
     */
    handleResetFiltersModal(state, action) {
      return {...initialState, isOpen: state.isOpen};
    },
    
    
    /**
     * Populates modal with existing filter settings
     * @param state
     * @param action
     */
    populateFilter(state, action) {
      state.isOpen = true;
      state.originalFilterId = action.payload.id;
      const getLabels = labels => {
        if ( labels.length > 0 ) {
          return labels.map(label => label.name);
        } else {
          return [];
        }
      };
      
      state.filters[ 0 ].values = [...action.payload.sentToAddress];
      state.filters[ 1 ].values = [...action.payload.fromAddress];
      state.filters[ 2 ].values = getLabels(action.payload.addLabels);
      state.filters[ 3 ].values = getLabels(action.payload.removeLabels);
    },
    
  },
});


export const {populateFilter, toggle} = filtersModalSlice.actions;
export default filtersModalSlice.reducer;


// --------------------------------------------------------------------------------------------------
// Functions


/**
 * Reset filters modal
 * @returns {function(...[*]=)}
 */
export function resetFiltersModal() {
  return async (dispatch, getState) => {
    if ( await dispatch(isBusy()) ) return;
    const {handleResetFiltersModal} = filtersModalSlice.actions;
    dispatch(handleResetFiltersModal());
    dispatch(resetStatus());
  };
}


/**
 * Add filter condition
 * @param action
 * @returns {function(...[*]=)}
 */
export function addFilterCondition(action) {
  return async (dispatch, getState) => {
    if ( await dispatch(isBusy()) ) return;
    const {handleAddFilterCondition} = filtersModalSlice.actions;
    dispatch(resetStatus());
    dispatch(handleAddFilterCondition(action));
  };
}


/**
 * Remove filter condition
 * @param action
 * @returns {function(...[*]=)}
 */
export function removeFilterCondition(action) {
  return async (dispatch, getState) => {
    if ( await dispatch(isBusy()) ) return;
    const {handleRemoveFilterCondition} = filtersModalSlice.actions;
    dispatch(resetStatus());
    dispatch(handleRemoveFilterCondition(action));
  };
}




