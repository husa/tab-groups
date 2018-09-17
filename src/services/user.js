// @flow

import uuid from 'uuid/v4';

import storage from '../utils/storage';
import {isEmpty} from '../utils';

const USER_ID_KEY = 'user';

type ID = string;

type UserInfo = {
  id: ID
};

class User {
  ensureId (): Promise<string> {
    return storage.get(USER_ID_KEY).then((user: UserInfo) => {
      if (!isEmpty(user)) return user.id;
      const id: ID = this.generateId();
      return storage.set(USER_ID_KEY, id).then(() => id);
    });
  }

  generateId (): ID {
    return uuid();
  }
}

const user: User = new User();

export default user;
