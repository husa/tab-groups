import {createStore, combineReducers, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';

import reducers from '../reducers';
import storageMiddleware from './storageMiddleware';

const middleware = [thunk, storageMiddleware];

const logger = createLogger({
  duration: true,
  collapsed: true
});

if (ENV === 'development') middleware.push(logger);

const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore);

const reducer = combineReducers({
  ...reducers
});

const createAppStore = (initialState = {}) => createStoreWithMiddleware(reducer, initialState);

export default createAppStore;
