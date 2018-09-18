const base = require('./webpack.base');
const {loaders, plugins} = require('./common');

module.exports = Object.assign(base, {
  module: {
    rules: [loaders.babel, loaders.scss.production]
  },
  plugins: [
    plugins.options,
    plugins.html.production,
    plugins.css,
    plugins.define.production,
    plugins.concatModules
  ]
});
