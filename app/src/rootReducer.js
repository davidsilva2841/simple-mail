import {combineReducers} from '@reduxjs/toolkit';

import userReducer from './features/user/userSlice.js';
import settingsReducer from './features/settings/settingsSlice.js';
import filtersModalReducer from './features/filtersModal/filtersModalSlice.js';
import filtersReducer from './features/filters/filtersSlice.js';
import statusReducer from './features/status/statusSlice.js';


const rootReducer = combineReducers({
  user: userReducer,
  settings: settingsReducer,
  filtersModal: filtersModalReducer,
  filters: filtersReducer,
  status: statusReducer,
});

export default rootReducer;
