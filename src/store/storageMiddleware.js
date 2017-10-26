import groupService from '../services/groups';

import {
  CREATE_NEW_GROUP
} from '../actions/groups';
import {
  selectGroupIds
} from '../selectors';


const actions = [
  CREATE_NEW_GROUP
];

const storageMiddleware = store => next => action => {
  const result = next(action);
  if (!actions.includes(action.type)) return result;
  const state = store.getState();
  const groupIds = selectGroupIds(state);
  groupService.saveGroupIds(groupIds);
  return result;
};

export default storageMiddleware;
