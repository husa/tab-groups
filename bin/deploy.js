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

wsClient.uploadExisting(packageZip).then(res => {
  if (
    res.uploadState === 'FAILURE'
    || res.uploadState === 'NOT_FOUND'
    || (res.itemError && res.itemError.length > 0)
  ) {
    console.log('Package upload failed');
    console.log(res);
    process.exit(1);
  }
  console.log(res);
});
