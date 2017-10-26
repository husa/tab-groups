import groupService from '../services/groups';

import {
  selectGroupIds,
  selectGroup
} from '../selectors';

import {
  CREATE_NEW_GROUP,
  ADD_TAB_TO_GROUP,
  DELETE_TAB
} from '../actions/groups';


const syncGroupIdsActions = [
  CREATE_NEW_GROUP
];

const syncGroupIds = state => {
  const groupIds = selectGroupIds(state);
  return groupService.saveGroupIds(groupIds);
};

const syncGroup = (state, id) => {
  const group = selectGroup(state, id);
  return groupService.saveGroup(group);
};

const storageMiddleware = store => next => action => {
  const result = next(action);

  const state = store.getState();

  // create new group - save new group
  if (action.type === CREATE_NEW_GROUP) {
    const id = action.payload.group.id;
    syncGroup(state, id);
  }

  if (action.type === ADD_TAB_TO_GROUP || action.type === DELETE_TAB) {
    const id = action.payload.groupId;
    syncGroup(state, id);
  }

  if (syncGroupIdsActions.includes(action.type)) {
    syncGroupIds(state);
  }

  return result;
};

export default storageMiddleware;
