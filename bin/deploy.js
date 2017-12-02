const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const webStore = require('chrome-webstore-upload');

dotenv.config();

const chromeCredentials = {
  extensionId: process.env.EXTENSION_ID,
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  refreshToken: process.env.REFRESH_TOKEN
};

const wsClient = webStore(chromeCredentials);

const packageZip = fs.createReadStream(path.resolve('./build.zip'));

(async () => {
  try {
    const token = await wsClient.fetchToken();
    const upload = await wsClient.uploadExisting(packageZip, token);
    if (
      upload.uploadState === 'FAILURE'
      || upload.uploadState === 'NOT_FOUND'
      || (upload.itemError && upload.itemError.length)
    ) {
      throw upload;
    }
    const publish = await wsClient.publish('default', token);
    console.log(publish);
    // 'NOT_AUTHORIZED'
    // 'INVALID_DEVELOPER'
    // 'DEVELOPER_NO_OWNERSHIP'
    // 'DEVELOPER_SUSPENDED'
    // 'ITEM_NOT_FOUND'
    // 'ITEM_PENDING_REVIEW'
    // 'ITEM_TAKEN_DOWN'
    // 'PUBLISHER_SUSPENDED'
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
})();
