// @flow

import storage from '../utils/storage';
import {isEmpty} from '../utils';
import type {Group, GroupId} from '../types';

const GROUPS_KEY = 'groupIds';

// 123 -> group-123
const toGroupId = (id: string): string => `group-${id}`;

// group-123 -> 123
const fromGroupID = (str: string): string => str.replace('group-', '');

class Groups {
  getAll (): Promise<{ids: Array<GroupId>, [id: string]: Group}> {
    return storage.get(GROUPS_KEY).then(res => {
      const groupIds = res[GROUPS_KEY];
      if (!groupIds || isEmpty(groupIds)) return {ids: []};

      return storage
        .get(groupIds.map(toGroupId))
        .then(groups =>
          Object.keys(groups).reduce(
            (acc, id) => ({
              ...acc,
              [fromGroupID(id)]: groups[id]
            }),
            {}
          )
        )
        .then(groups => ({
          ...groups,
          ids: groupIds
        }));
    });
  }

  saveGroup (group: Group): Promise<void> {
    return storage.set(toGroupId(group.id), group);
  }

  saveGroupIds (ids: Array<GroupId>): Promise<void> {
    return storage.set(GROUPS_KEY, ids);
  }

  removeGroup (id: string): Promise<void> {
    return storage.remove(toGroupId(id));
  }
}

const groups = new Groups();

export default groups;
