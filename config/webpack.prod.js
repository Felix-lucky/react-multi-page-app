const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const CompressionPlugin = require('compression-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  target: 'browserslist',
  plugins: [new CompressionPlugin()],
  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: 4,
        terserOptions: {
          parse: {
            ecma: 8,
          },
          compress: {
            ecma: 5,
            warnings: false,
            comparisons: false,
            inline: 2,
            drop_console: true,
            drop_debugger: true,
          },
          mangle: {
            safari10: true,
          },
          output: {
            ecma: 5,
            comments: false,
            ascii_only: true,
          },
        },
      })
    ],
    splitChunks: {
      chunks: 'all',
      name: 'vendor',
      cacheGroups: {
        'echarts.vendor': {
          name: 'echarts.vendor',
          priority: 40,
          test: /[\\/]node_modules[\\/](echarts|zrender)[\\/]/,
          chunks: 'all',
        },
        lodash: {
          name: 'lodash',
          chunks: 'async',
          test: /[\\/]node_modules[\\/]lodash[\\/]/,
          priority: 40,
        },
        'async-common': {
          chunks: 'async',
          minChunks: 2,
          name: 'async-commons',
          priority: 30,
        },
        commons: {
          name: 'commons',
          chunks: 'all',
          minChunks: 2,
          priority: 20,
        },
      },
    },
  },
  /**
   * 调试源代码精确错误位置
   * 生产环境 source-map 调试友好 cheap-module-source-map
   * 开发环境 eval-source-map
   */
  // devtool: 'source-map',
});