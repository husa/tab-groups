// @flow

type OS = 'mac' | 'win' | 'android' | 'cros' | 'linux' | 'openbsd';

class Platform {
  getOS(): Promise<OS> {
    return new Promise(resolve => {
      chrome.runtime.getPlatformInfo(platformInfo => {
        resolve(platformInfo.os);
      });
    });
  }
}

const platform = new Platform();

export default platform;
