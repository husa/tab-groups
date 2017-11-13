// @flow

import uuid from 'uuid/v4';

import type {Action, Tab, Group, GroupId, UnknownGroup} from '../types';

export const CREATE_NEW_GROUP: 'CREATE_NEW_GROUP' = 'CREATE_NEW_GROUP';
export const RENAME_GROUP: 'RENAME_GROUP' = 'RENAME_GROUP';
export const DELETE_GROUP: 'DELETE_GROUP' = 'DELETE_GROUP';
export const ADD_TAB_TO_GROUP: 'ADD_TAB_TO_GROUP' = 'ADD_TAB_TO_GROUP';
export const DELETE_TAB: 'DELETE_TAB' = 'DELETE_TAB';


export type CreateGroupAction = Action<typeof CREATE_NEW_GROUP, {
  group: Group
}>;

export const createNewGroup = (group: UnknownGroup): CreateGroupAction => {
  const id = uuid();
  const {name, tabs} = group;

  return {
    type: CREATE_NEW_GROUP,
    payload: {
      group: {id, name, tabs}
    }
  };
};

export type RenameGroupAction = Action<typeof RENAME_GROUP, {
  groupId: GroupId,
  name: string
}>;

export const renameGroup = (groupId: string, name: string): RenameGroupAction => ({
  type: RENAME_GROUP,
  payload: {
    groupId,
    name
  }
});

export type DeleteGroupAction = Action<typeof DELETE_GROUP, {
  groupId: GroupId
}>;

export const deleteGroup = (groupId: string): DeleteGroupAction => ({
  type: DELETE_GROUP,
  payload: {
    groupId
  }
});

export type AddTabToGroupAction = Action<typeof ADD_TAB_TO_GROUP, {
  groupId: GroupId,
  tab: Tab
}>;

export const addTabToGroup = (groupId: GroupId, tab: Tab): AddTabToGroupAction => ({
  type: ADD_TAB_TO_GROUP,
  payload: {
    groupId,
    tab
  }
});

export type DeleteTabAction = Action<typeof DELETE_TAB, {
  groupId: GroupId,
  tabId: string
}>;

export const deleteTab = (groupId: string, tabId: string): DeleteTabAction => ({
  type: DELETE_TAB,
  payload: {
    groupId,
    tabId
  }
});
