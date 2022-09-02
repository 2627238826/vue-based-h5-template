const path = require('path');
const merge = require('webpack-merge');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const OpenBrowserPlugin = require('webpack-open-browser-plugin');
const baseWebpackConfig = require('./webpack.base.conf.js');
const webpack = require('webpack');
const config = require('../config/dev.env');

const devConfigJs = {
  mode: 'development',
  output: {
    filename: 'js/[name].[hash:8].js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      // 处理css/scss/sass
      {
        test: /\.(sc|sa|c)ss$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader'
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(), // HMR
    new FriendlyErrorsPlugin({
      // 运行成功
      compilationSuccessInfo: {
        messages: [`The application is now running on: http://localhost:${config.devServer.port}`],
        notes: [`Your network is runing here: http://${config.devServer.host}:${config.devServer.port}`]
      }
    }),
    // devServer自带的打开浏览器体验很差, webpack-open-browser-plugin 的体验更好
    new OpenBrowserPlugin({
      url: 'http://localhost:' + config.devServer.port
    })
  ],
  devServer: config.devServer
};

module.exports = merge(baseWebpackConfig, devConfigJs);
