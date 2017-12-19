// @flow
/* eslint no-console: 0 */
import './main.scss';

import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';

import createStore from './store';
import groupsService from './services/groups';
import platform from './services/platform';
import user from './services/user';
import App from './layout/App/App';


const start = performance.now();

Promise.all([
  groupsService.getAll(),
  user.ensureId()
  // load saved data
]).then(([groups, userId]) => {
  const initialState = {
    user: {id: userId},
    groups
  };
  return createStore(initialState);
}).then(store => Promise.all([
  store,
  // possible fix for chrome on macOS
  // https://bugs.chromium.org/p/chromium/issues/detail?id=428044
  platform.getOS().then(os => {
    if (os !== 'mac') return null;
    return new Promise(res => setTimeout(res, 150));
  })
  // dispatch initial actions
])).then(([store]) => {
  const rootEl = document.querySelector('#root');
  if (!rootEl) throw new Error('Can\'t find #root');
  return render((
    <Provider store={store}>
      <App />
    </Provider>
  ), rootEl);
}).catch(err => {
  console.error('Error!!!!');
  console.error(err);
}).then(() => {
  if (ENV === 'development') {
    console.log(`Initial render after ${(performance.now() - start).toFixed(2)}ms`);
  }
});
