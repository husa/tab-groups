import './main.scss';

import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';

import createStore from './store';
import groups from './services/groups';
import user from './services/user';
import App from './layout/App/App';

const start = performance.now();

Promise.all([
  groups.getAll(),
  user.ensureId()
  // load saved data
]).then(([groups, userId]) => {
  const initialState = {
    user: {id: userId},
    groups
  };
  console.log(groups);
  return createStore(initialState);
}).then(store => Promise.all([
  store
  // dispatch initial actions
])).then(([store]) => {
  const rootEl = document.querySelector('#root');
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
