// @flow

class Lang {
  t (key: string, ...args: Array<string>): string {

    // disable flow check for now
    // contribute to https://github.com/Shraymonks/flow-interfaces-chrome
    // to include chrome.i18n type annotations
    // $FlowFixMe
    return chrome.i18n.getMessage(key, ...args);
  }
}

const lang = new Lang;

export default lang;
