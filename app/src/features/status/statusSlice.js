import {createSlice} from '@reduxjs/toolkit';
import * as notifications from '../../services/notifications.js';

// --------------------------------------------------------------------------------------------------
// Slice

const statusTypes = require('./types.js');

const initialState = {
  busy: false,
  message: '',
  type: {},
  display: {
    filtersModal: false
  }
};

const statusSlice = createSlice({
  name: 'status',
  initialState: {...initialState},
  reducers: {
    

    handleSetStatus (state, action) {
      console.log(`FILE: statusSlice.js handleSetStatus() | action:`, action);
      console.log(`FILE: statusSlice.js handleSetStatus() | action.payload:`, action.payload);
      return {...action.payload};
    },
    /**
     * Reset status
     * @returns {{busy : boolean, message : string, type : {}}}
     */
    resetStatus() {
      return {...initialState};
    },
  },
});

export default statusSlice.reducer;
export const {resetStatus} = statusSlice.actions;


// --------------------------------------------------------------------------------------------------
// Functions


/**
 * Checks if busy, if it is then sends notification
 * @returns {boolean}
 */
export function isBusy() {
  return async (dispatch, getState) => {
    if ( getState().status.busy ) {
      notifications.handleBusy();
      return true;
    } else {
      return false;
    }
  };
}


/**
 * Handle error status updates
 * @param error {error}
 * @param busy {boolean}
 * @returns {function(...[*]=)}
 */
export function handleError(error, busy = false) {
  return async (dispatch, getState) => {
    try {
      console.error(error);
      if ( error.response && error.response.data ) {
        dispatch(setStatus(busy, error.response.data || 'Error', statusTypes.error));
      }
    } catch (err) {
      dispatch(setStatus(busy, 'An unknown error occured', statusTypes.error));
      throw err;
    }
  };
}



export function setStatus (busy, message, statusType) {
  return async (dispatch, getState) => {
    let display = {
      filtersModal: getState().filtersModal.isOpen
    };
    const {handleSetStatus} = statusSlice.actions;
    dispatch(handleSetStatus({busy, message, type: statusType, display}))
  }
}



