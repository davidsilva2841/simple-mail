const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  optimization: {
    usedExports: true,
  },
  devServer: {
    historyApiFallback: true,
    contentBase: common.output.path,
    inline:true,
    // hot: true,
    disableHostCheck: true,
    port: 9000
  },
});
