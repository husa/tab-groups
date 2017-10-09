import './main.scss';

import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';

import createStore from './store';
import storage from './services/storage';
import App from './layout/App/App';

const start = performance.now();

Promise.all([
  storage.get('groups')
  // load saved data
]).then(([groups]) => {
  groups = groups || {};

  const initialState = {
    groups
  };

  console.log(initialState)

  return createStore(initialState);
}).then(store => Promise.all([
  store
  // dispatch initial actions
])).then(([store]) => {
  const rootEl = document.querySelector('#root');
  console.log('going to render')
  return render((
    <Provider store={store}>
      <App />
    </Provider>
  ), rootEl);
}).then(() => {
  if (ENV === 'development') {
    console.log(`Initial render after ${(performance.now() - start).toFixed(2)}ms`);
  }
})
