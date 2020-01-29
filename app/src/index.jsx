// MDBReact
import '../node_modules/@fortawesome/fontawesome-free/css/all.min.css';
import './assets/vendors/bootstrap.min.css';
import '../node_modules/mdbreact/dist/css/mdb.css';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './assets/styles/main.scss';


import { Provider } from 'react-redux';
import store from './store/configureStore.js'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
