const base = require('./webpack.base');
const {loaders, plugins} = require('./common');

module.exports = Object.assign(base, {
  module: {
    rules: [loaders.babel, loaders.scss.development]
  },
  plugins: [plugins.html.development, plugins.define.development],
  cache: true,
  devtool: 'cheap-module-source-map'
});
