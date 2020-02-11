import {createSlice} from '@reduxjs/toolkit';
import * as simpleMail from '../../services/simpleMailAPI.js';

// --------------------------------------------------------------------------------------------------
const initialState = {
  filters: [],
  labels: [],
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    resetFiltersState(state, action) {
      return {...initialState};
    },
    setFilters(state, action) {
      state.filters = action.payload;
    },
    setLabels(state, action) {
      state.labels = action.payload;
    },
  },
});

export const {resetFiltersState, setFilters, setLabels} = settingsSlice.actions;

export default settingsSlice.reducer;


export function getLabelsFilters() {
  return async (dispatch, getState) => {
    simpleMail.getLabelFilters().then(result => {
      dispatch(setFilters(result.data.filters));
      dispatch(setLabels(result.data.labels));
    }).catch(error => {
      throw error;
    });
  };
}






