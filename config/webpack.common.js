const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const webpack = require('webpack');
const fs = require('fs');
const chalk = require('chalk');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const { setEntry, setHtmlPlugin } = require('./utils.js');

const devMode = process.env.NODE_ENV !== 'production';

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

module.exports = {
  entry: setEntry(),
  output: {
    publicPath: '/',
    filename: '[name]/index.js',
    path: resolveApp('dist'),
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'resolve-url-loader',
          'sass-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg|ico)(\?.*)?$/,
        loader: 'url-loader',
        type: 'javascript/auto',
        options: {
          esModule: false,
          limit: 1000,
          name: 'static/img/[name].[hash:7].[ext]',
        },
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'static/media/[name].[hash:7].[ext]',
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'static/fonts/[name].[hash:7].[ext]',
        },
      },
    ]
  },
  plugins: [
    ...setHtmlPlugin(),
    new MiniCssExtractPlugin({
      filename: devMode ? '[name].css' : '[name]/index.css',
      chunkFilename: devMode ? '[name].css' : '[name]/index.css',
    }),
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true
      }
    }),
    /**
     * 配置环境全局变量
     */
    new webpack.DefinePlugin({
      ENV_CONFIG: JSON.stringify(process.env)
    }),
    /**
     * 编译进度条
     */
    new ProgressBarPlugin({
      format: '  build [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds)',
    })
  ],
  resolve: {
    alias: {
      '@': resolveApp('src'),
      components: resolveApp('src/components')
    },
    extensions: ['.wasm', '.mjs', '.js', '.json', '.jsx'],
    modules: ['node_modules'],
  }
}