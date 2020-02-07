import { combineReducers } from "@reduxjs/toolkit";

import userReducer from './features/user/userSlice.js';
import settingsReducers from './features/settings/settingsSlice.js';


const rootReducer = combineReducers({
  user: userReducer,
  settings: settingsReducers
});

export default rootReducer;
