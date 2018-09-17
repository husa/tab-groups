// @flow

class Storage {
  set(key: string, val: any): Promise<void> {
    return new Promise(res => {
      chrome.storage.sync.set(
        {
          [key]: val
        },
        res
      );
    });
  }

  get<T>(key: string): Promise<T> {
    return new Promise(res => {
      chrome.storage.sync.get(key, res);
    });
  }

  remove(key: string): Promise<void> {
    return new Promise(res => {
      chrome.storage.sync.remove(key, res);
    });
  }
}

const storage: Storage = new Storage();

export default storage;
