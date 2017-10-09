import uuid from 'uuid/v4';

export const CREATE_NEW_GROUP = 'CREATE_NEW_GROUP';
export const RENAME_GROUP = 'RENAME_GROUP';
export const DELETE_GROUP = 'DELETE_GROUP';
export const DELETE_TAB = 'DELETE_TAB';

export const createNewGroup = group => {
  const id = uuid();
  const {name} = group;
  const tabs = group.tabs.map(tab => ({
    ...tab,
    id: uuid()
  }));

  return {
    type: CREATE_NEW_GROUP,
    payload: {
      group: {
        id,
        name,
        tabs
      }
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

export const deleteTab = (groupId, tabId) => ({
  type: DELETE_TAB,
  payload: {
    groupId,
    tabId
  }
});