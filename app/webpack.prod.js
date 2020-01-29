const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const OUTPUT_FILE_NAME = 'bundle.js';
const PUBLIC_PATH = path.join(__dirname, "../server/public/");

module.exports = merge(common, {
  output: {
    publicPath: "/",
    filename: OUTPUT_FILE_NAME,
    path: PUBLIC_PATH,
  },
  mode: 'production',
  devtool: 'source-map',
});
