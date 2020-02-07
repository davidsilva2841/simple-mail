import { createSlice } from "@reduxjs/toolkit";
import { getLabelsFilters, resetFiltersState } from '../settings/settingsSlice.js';

// --------------------------------------------------------------------------------------------------

const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLoggedIn: false,
  },
  reducers: {
    setLoginStatus (state, action) {
      state.isLoggedIn = action.payload;
    }
  }
});

export const { setLoginStatus } = userSlice.actions;
export default userSlice.reducer;


/**
 *Updates login status & fetches data if needed
 * @returns {function(...[*]=)}
 */
export const getLoginStatus = () => {
  return async (dispatch, getState) => {
    let { isLoggedIn: wasLoggedIn } = getState().user;
    let loggedIn = (document.cookie !== '');
    dispatch(setLoginStatus(loggedIn));
    if ( loggedIn && !wasLoggedIn ) {
      dispatch(getLabelsFilters());
    }
  }
};


/**
 * Sign out a user
 * @returns {function(...[*]=)}
 */
export const signOut = () => {
  return dispatch => {
    document.cookie = 'cookie=; Max-Age=0';
    dispatch(setLoginStatus(false));
    dispatch(resetFiltersState());
  }
};



