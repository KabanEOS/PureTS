import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import store from './store';
import '../node_modules/bulma/css/bulma.min.css';
import LocationListProvider from './contexts/location/LocationList';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <LocationListProvider>
        <App />
      </LocationListProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
