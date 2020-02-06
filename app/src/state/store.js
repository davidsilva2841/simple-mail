// Redux

import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';

// import reducers from '../reducers';
// --------------------------------------------------------------------------------------------------
import * as reducers from './ducks'
const rootReducer = combineReducers(reducers);

// --------------------------------------------------------------------------------------------------


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);


store.subscribe(() => {
  console.log('changed');
});
export default store;
