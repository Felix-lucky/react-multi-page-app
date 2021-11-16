const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  target: 'web',
  devServer: {
    static: {
      directory: path.join(__dirname, '../dist'),
    },
    //在浏览器端打印编译进度
    client: {
      progress: true,
    },
    hot: true,
    host: 'localhost',
    historyApiFallback: true,
    compress: true,
    open: true,
    port: 9000,
  },
});