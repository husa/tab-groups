class Tabs {
  getAll () {
    return new Promise(res => {
      chrome.tabs.query({
        currentWindow: true
      }, res);
    });
  }

  open (tabs, {newWindow = false} = {}) {
    return new Promise(resolve => {
      if (newWindow) {
        chrome.windows.create({}, ({id}) => {
          resolve(id);
        });
      } else {
        resolve(chrome.windows.WINDOW_ID_CURRENT);
      }
    }).then(windowId => {
      tabs.forEach(tab => {
        chrome.tabs.create({
          windowId,
          url: tab.url,
          pinned: tab.pinned
        });
      });
    });
  }
}

const tabs = new Tabs;

export default tabs;
