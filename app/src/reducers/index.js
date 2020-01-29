import { combineReducers } from 'redux';
import emailReducer from "./emailReducer";

const rootReducer = combineReducers({
  email: emailReducer
});

export default rootReducer;
