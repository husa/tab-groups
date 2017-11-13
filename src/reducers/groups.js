// @flow

import {
  CREATE_NEW_GROUP,
  RENAME_GROUP,
  DELETE_GROUP,
  ADD_TAB_TO_GROUP,
  DELETE_TAB,

  type CreateGroupAction,
  type RenameGroupAction,
  type DeleteGroupAction,
  type AddTabToGroupAction,
  type DeleteTabAction
} from '../actions/groups';

import type {Group, GroupId} from '../types';


type State = {
  +ids: Array<GroupId>,
  +[id: GroupId]: Group
};

type Actions =
  | CreateGroupAction
  | RenameGroupAction
  | DeleteGroupAction
  | AddTabToGroupAction
  | DeleteTabAction;


const getInitialState = (): State => ({
  ids: []
});

const groups = (state: State = getInitialState(), action: Actions): State => {
  switch (action.type) {
    case CREATE_NEW_GROUP: {
      const {group} = action.payload;
      return {
        ...state,
        ids: state.ids.concat([group.id]),
        [group.id]: group
      };
    }

    case RENAME_GROUP: {
      const {groupId, name} = action.payload;
      return {
        ...state,
        [groupId]: {
          ...state[groupId],
          name
        }
      };
    }

    case DELETE_GROUP: {
      const {groupId} = action.payload;
      let newState = {
        ...state,
        ids: state.ids.filter(id => id !== groupId)
      };
      delete newState[groupId];
      return newState;
    }

    case ADD_TAB_TO_GROUP: {
      const {groupId, tab} = action.payload;
      return {
        ...state,
        [groupId]: {
          ...state[groupId],
          tabs: state[groupId].tabs.concat([tab])
        }
      };
    }

    case DELETE_TAB: {
      const {groupId, tabId} = action.payload;
      return {
        ...state,
        [groupId]: {
          ...state[groupId],
          tabs: state[groupId].tabs.filter(({id}) => id !== tabId)
        }
      };
    }

    default: {
      return state;
    }
  }
};

export default groups;
