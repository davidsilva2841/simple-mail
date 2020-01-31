import { combineReducers } from 'redux';
import emailReducer from "./emailReducer";
import userReducer from "./userReducer";
import filtersReducer from "./filtersReducer";

const rootReducer = combineReducers({
  email: emailReducer,
  user: userReducer,
  filters: filtersReducer
});

export default rootReducer;
