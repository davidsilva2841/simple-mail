import { combineReducers } from 'redux';
import emailReducer from "./emailReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
  email: emailReducer,
  user: userReducer
});

export default rootReducer;
