class Storage {
  save (key, val) {
    localStorage.setItem(key, JSON.stringify(val));
  }

  get (key) {
    const result = localStorage.getItem(key);
    return JSON.parse(result);
  }
}

const storage = new Storage;

export default storage;
