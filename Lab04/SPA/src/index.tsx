/* eslint-disable react/jsx-max-depth */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from 'redux/store';

import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, 
  document.getElementById('root')
);

serviceWorker.unregister();

// expose store when run in Cypress
// @ts-ignore
if (window.Cypress) window.store = store;