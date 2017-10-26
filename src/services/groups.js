import storage from '../utils/storage';
import {isEmpty} from '../utils';

const GROUPS_KEY = 'groupIds';

const toGroupId = id => `group-${id}`;
const fromGroupID = str => str.replace('group-', '');

class Groups {
  getAll () {
    return storage.get(GROUPS_KEY).then(res => {
      const groupIds = res[GROUPS_KEY];
      if (!groupIds || isEmpty(groupIds)) return {ids: []};

      return storage.get(groupIds.map(toGroupId))
        .then(groups => Object.keys(groups).reduce((acc, id) => ({
          ...acc,
          [fromGroupID(id)]: groups[id]
        }), {}))
        .then(groups => ({
          ...groups,
          ids: groupIds
        }));
    });
  }

  saveGroup (group) {
    return storage.set(toGroupId(group.id), group);
  }

  saveGroupIds (ids) {
    return storage.set(GROUPS_KEY, ids);
  }
}

const groups = new Groups;

export default groups;
