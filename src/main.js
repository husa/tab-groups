// @flow
/* eslint no-console: 0 */
import './main.scss';

import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';

import createStore from './store';
import groupsService from './services/groups';
import platformService from './services/platform';
import user from './services/user';
import App from './layout/App/App';


const start = performance.now();

Promise.all([
  groupsService.getAll(),
  user.ensureId(),
  platformService.getOS().then(os => {
    if (document.body) {
      document.body.classList.add(`platform-${os}`);
    }
  })
  // load saved data
]).then(([groups, userId]) => {
  const initialState = {
    user: {id: userId},
    groups
  };
  return createStore(initialState);
}).then(store => Promise.all([
  store,
  // possible fix for chrome
  // https://bugs.chromium.org/p/chromium/issues/detail?id=428044
  new Promise(res => setTimeout(res, 150))
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
