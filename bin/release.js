const path = require('path');
const fs = require('fs');
const git = require('simple-git/promise')();

const manifestPath = path.resolve('./src/manifest.json');

const versionRegEx = /^(\d+\.){2}\d+$/; // only numeric versions
const version = process.argv.pop();

const invalidVersionMessage = `
Version parameter is either missing or invalid

Example usage:
  node bin/release.js 1.2.3
`

const updateManifest = version => new Promise((resolve, reject) => {
  fs.readFile(manifestPath, 'utf-8', (err, json) => {
    if (err) return reject(err)
    const manifest = JSON.parse(json);
    manifest.version = version;
    fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2), (err, res) => {
      if (err) return reject(err);
      resolve(manifest);
    })
  })
});

(async () => {
  if (!versionRegEx.test(version)) {
    console.log(invalidVersionMessage);
    return;
  }

  try {
    // update version in ./src/manifest.json
    await updateManifest(version);
    // git add ./src/manifest.json
    await git.add(manifestPath);
    // git commit -m "Version v#.#.#"
    await git.commit(`Version v${version}`);
    // git tag -a v#.#.# -m "Version #.#.#"
    await git.tag(['-a', `v${version}`, '-m', `Version v${version}`]);
  } catch (err) {
    console.log('SHIT!!! Something bad happened');
    console.log(err);
  }
})();
