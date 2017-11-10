// @flow

import uuid from 'uuid/v4';

import type {Tab} from '../types';


const toPureTab = (tab: chrome$Tab): Tab => {
  const {title = '', url = '', favIconUrl = '', pinned = false} = tab;
  const id = uuid();
  return {id, title, url, favIconUrl, pinned};
};

class Tabs {
  getAll (): Promise<Array<Tab>> {
    return new Promise(res => {
      chrome.tabs.query({
        currentWindow: true
      }, (tabs: Array<chrome$Tab>) => res(tabs.map(toPureTab)));
    });
  }

  getCurrent (): Promise<Tab> {
    return new Promise(res => {
      chrome.tabs.query({
        active: true,
        currentWindow: true
      }, ([tab]) => res(toPureTab(tab)));
    });
  }

  open (tabs: Array<Tab>, {newWindow = false}: {newWindow: boolean} = {}): Promise<*> {
    return new Promise(resolve => {
      if (newWindow) {
        chrome.windows.create({}, (chromeWindow: ?chrome$Window) => {
          if (chromeWindow != null) {
            resolve(chromeWindow.id);
          } else {
            resolve(chrome.windows.WINDOW_ID_CURRENT);
          }
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
