// Redux

// import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';

// import reducers from '../reducers';
// --------------------------------------------------------------------------------------------------
// import * as reducers from './state/ducks'
// const rootReducer = combineReducers(reducers);

// --------------------------------------------------------------------------------------------------
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const store = createStore(
//   rootReducer,
//   composeEnhancers(applyMiddleware(thunk))
// );

import {configureStore} from '@reduxjs/toolkit';
import rootReducer from './rootReducer';


const store = configureStore({
  reducer: rootReducer,
});

// ***
if ( process.env.NODE_ENV === 'development' && module.hot ) {
  module.hot.accept('./rootReducer', () => {
    const newRootReducer = require('./rootReducer').default;
    // const newRootReducer = require('./rootReducer');
    store.replaceReducer(newRootReducer);
  });
}

export default store;
