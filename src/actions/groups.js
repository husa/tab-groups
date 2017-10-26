import uuid from 'uuid/v4';

import groupService from '../services/groups';


export const CREATE_NEW_GROUP = 'CREATE_NEW_GROUP';
export const RENAME_GROUP = 'RENAME_GROUP';
export const DELETE_GROUP = 'DELETE_GROUP';
export const ADD_TAB_TO_GROUP = 'ADD_TAB_TO_GROUP';
export const DELETE_TAB = 'DELETE_TAB';

export const createNewGroup = group => {
  const id = uuid();
  const {name} = group;
  const tabs = group.tabs.map(tab => ({
    ...tab,
    id: uuid()
  }));

  const groupObj = {id, name, tabs};

  groupService.saveGroup(groupObj);

  return {
    type: CREATE_NEW_GROUP,
    payload: {
      group: groupObj
    }
  };
};

export const renameGroup = (id, name) => ({
  type: RENAME_GROUP,
  payload: {
    id,
    name
  }
});

export const deleteGroup = id => ({
  type: DELETE_GROUP,
  payload: {
    id
  }
});

export const addTabToGroup = (groupId, tab) => ({
  type: ADD_TAB_TO_GROUP,
  payload: {
    groupId,
    tab
  }
});

export const deleteTab = (groupId, tabId) => ({
  type: DELETE_TAB,
  payload: {
    groupId,
    tabId
  }
});
