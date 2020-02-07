import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  hidden: true,
  filters: [
    { index: 0, title: 'Sent to', name: 'to', values: [], value: '', type: 'address' },
    { index: 1, title: 'From', name: 'from', values: [], value: '', type: 'address' },
    { index: 2, title: 'Add Label', name: 'addLabelIds', values: [], value: '', type: 'addLabel' },
    { index: 3, title: 'Remove Labels', name: 'removeLabelIds', values: [], value: '', type: 'removeLabel' }
  ]
};

const filtersModalSlice = createSlice({
  name: 'filtersModal',
  initialState,
  reducers: {
    toggle (state, action) {
      state.hidden = !state.hidden;
    }
  }
});


export const { toggle } = filtersModalSlice.actions;
export default filtersModalSlice;







