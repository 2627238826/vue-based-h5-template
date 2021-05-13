const path = require('path');
const os = require('os');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssertsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const config = require('../config/dev.env');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf.js');
const devMode = process.env.NODE_ENV !== 'production';

// 检查包文件版本
const packList = config.packageVersionVerify || [];
const check = require('./check-versions.js');
new check(packList).init();

module.exports = merge(baseWebpackConfig, {
  mode: 'production',
  output: {
    filename: 'js/[name].[hash:8].js',
    path: path.resolve(__dirname, '../dist')
  },
  module: {
    rules: [
      // 处理css/scss/sass
      {
        test: /\.(sc|sa|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // 这里可以指定一个 publicPath
              // 默认使用 webpackOptions.output中的publicPath
              publicPath: '../'
            }
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader'
          },
          {
            loader: 'sass-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    // 提取CSS
    new MiniCssExtractPlugin({
      filename: devMode ? 'css/[name].css' : 'css/[name].[hash:5].css', // 设置输出的文件名
      chunkFilename: devMode ? 'css/[name].css' : 'css/[name].[hash:5].css'
    })
  ],
  optimization: {
    splitChunks: {
      chunks: 'async',
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          name: 'vendor'
        }
      }
    },
    minimizer: [
      // 压缩JS
      new TerserPlugin({
        cache: true,
        parallel: os.cpus().length,
        sourceMap: true,
        terserOptions: {
          output: {
            comments: false
          }
        }
        // 等等详细配置见官网
      }),
      // 压缩CSS
      new OptimizeCSSAssertsPlugin({})
    ]
  }
});
