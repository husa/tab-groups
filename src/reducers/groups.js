import {
  CREATE_NEW_GROUP,
  ADD_TAB_TO_GROUP,
  DELETE_TAB
} from '../actions/groups';


const getInitialState = () => ({});

const groups = (state = getInitialState(), action) => {
  switch (action.type) {
    case CREATE_NEW_GROUP: {
      const {group} = action.payload;
      return {
        ...state,
        [group.id]: group
      };
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
