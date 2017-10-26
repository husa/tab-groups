
import uuid from 'uuid/v4';

import storage from '../utils/storage';
import {isEmpty} from '../utils';

const USER_ID_KEY = 'user';

class User {
  ensureId () {
    return storage.get(USER_ID_KEY).then(id => {
      if (isEmpty(id)) return this.generateId();
      return id;
    });
  }

  generateId () {
    return uuid();
  }
}

const user = new User;

export default user;
