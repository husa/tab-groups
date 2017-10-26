class Storage {
  set (key, val) {
    return new Promise(res => {
      chrome.storage.sync.set({
        [key]: val
      }, res);
    });
  }

  get (key) {
    return new Promise(res => {
      chrome.storage.sync.get(key, res);
    });
  }
}

const storage = new Storage;

export default storage;
