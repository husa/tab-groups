// @flow

class Analytics {
  _sendEvent(eventCategory: string, eventAction: string, eventLabel?: string): void {
    if (ENV === 'development') return;
    let opts = {eventCategory, eventAction};
    if (eventLabel) opts = {...opts, eventLabel};
    ga('send', 'event', opts);
  }

  groupOpened(newWindow: boolean = false) {
    return this._sendEvent('Open', 'Group', newWindow ? 'newWindow' : '');
  }

  tabOpened() {
    return this._sendEvent('Open', 'Tab');
  }

  groupCreated() {
    return this._sendEvent('Create', 'Group');
  }
  tabAdded() {
    return this._sendEvent('Create', 'Tab');
  }

  groupDeleted() {
    return this._sendEvent('Delete', 'Group');
  }
  tabDeleted() {
    return this._sendEvent('Delete', 'Tab');
  }

  groupRenamed() {
    return this._sendEvent('Rename', 'Group');
  }
}

const analytics = new Analytics();

export default analytics;
