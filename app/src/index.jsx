// Sentry logger service
require('./services/logger.js');

// MDBReact
import '../node_modules/@fortawesome/fontawesome-free/css/all.min.css';
import './assets/vendors/bootstrap.min.css';
import './assets/vendors/mdb/scss/mdb-pro.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import './assets/styles/main.scss';

import {Provider} from 'react-redux';
import store from './store.js';

// --------------------------------------------------------------------------------------------------

const render = () => {
  const App = require('./App').default;
  
  ReactDOM.render(
      <Provider store={ store }>
        <App/>
      </Provider>,
      document.getElementById('app'),
  );
};

render();

if ( process.env.NODE_ENV === 'development' && module.hot ) {
  module.hot.accept('./App', render);
}
