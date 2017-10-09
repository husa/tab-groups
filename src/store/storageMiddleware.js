import storage from '../services/storage';

import {CREATE_NEW_GROUP} from '../actions/groups';
import {selectGroups} from '../selectors';


const actions = [
  CREATE_NEW_GROUP
];

const storageMiddleware = store => next => action => {
  const result = next(action);
  if (!actions.includes(action.type)) return result;
  const state = store.getState();
  const groups = selectGroups(state);
  storage.save('groups', groups);
  return result;
};

export default storageMiddleware;
