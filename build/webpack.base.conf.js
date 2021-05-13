const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const pkgPath = path.join(__dirname, '../package.json');
const pkgData = JSON.parse(fs.readFileSync(pkgPath));

module.exports = {
  entry: path.resolve(__dirname, '../src/main.js'),
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': path.resolve(__dirname, '../src'),
      components: path.resolve(__dirname, '../src/components'),
      constants: path.resolve(__dirname, '../src/constants'),
      services: path.resolve(__dirname, '../src/services'),
      views: path.resolve(__dirname, '../src/views'),
      router: path.resolve(__dirname, '../src/router'),
      store: path.resolve(__dirname, '../src/store'),
      assets: path.resolve(__dirname, '../src/assets'),
      filters: path.resolve(__dirname, '../src/filters'),
      directives: path.resolve(__dirname, '../src/directives'),
      utils: path.resolve(__dirname, '../src/utils'),
      vue: path.resolve(__dirname, '../node_modules/vue/dist/vue.min.js')
    },
    // 指明第三方模块的绝对路径, 减少路径查找
    modules: [path.resolve(__dirname, '../node_modules')]
  },
  externals: {
    vue: 'Vue',
    vuex: 'Vuex',
    'vue-router': 'VueRouter',
    vant: 'vant',
    axios: 'axios',
    VConsole: 'VConsole'
  },
  module: {
    // 忽略对没采用模块化的模块进行递归解析
    noParse: [/vue\.min\.js/],
    rules: [
      // 处理js
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        include: path.resolve(__dirname, '../src'), // 缩小命中范围
        use: [
          {
            loader: 'babel-loader?cacheDirectory', // 通过cacheDirectory选项开启支持缓存
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-transform-runtime', '@babel/plugin-transform-regenerator', '@babel/plugin-transform-object-assign']
            }
          },
          {
            loader: 'eslint-loader',
            options: {
              fix: true
            }
          }
        ]
      },
      // 处理字体
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          // 文件大小小于limit参数，url-loader将会把文件转为base64 URL
          limit: 10000,
          name: 'fonts/[name]-[hash:5].[ext]',
          // outputPath: 'fonts/'
          publicPath: '../' // 多用于CDN
        }
      },
      // 处理图像
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: [
          // 转base64
          {
            loader: 'url-loader',
            options: {
              // 具体配置见插件官网
              limit: 10000,
              name: 'img/[name]-[hash:5].[ext]',
              // outputPath: 'img/', // outputPath所设置的路径，是相对于 webpack 的输出目录。
              // publicPath: '../', // 多用于CDN
              esModule: false
            }
          }
          // {
          //   loader: 'image-webpack-loader', // 压缩图像
          //   options: {
          //     mozjpeg: {
          //       progressive: true,
          //       quality: 65
          //     },
          //     // optipng.enabled: false will disable optipng
          //     optipng: {
          //       enabled: false
          //     },
          //     pngquant: {
          //       quality: '65-90',
          //       speed: 4
          //     },
          //     gifsicle: {
          //       interlaced: false
          //     },
          //     // the webp option will enable WEBP
          //     webp: {
          //       quality: 75
          //     }
          //   }
          // }
        ]
      },
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'vue-loader',
            options: {
              loaders: {
                sass: ['style-loader', 'css-loader', 'sass-loader', 'postcss-loader']
              }
            }
          }
        ]
      }
    ]
  },
  plugins: [
    // 清空目录
    new CleanWebpackPlugin(),
    new VueLoaderPlugin(),
    // 读取package.json信息
    new webpack.DefinePlugin({
      'process.env.PROJECT_DATA': {
        PROJECT_NAME: JSON.stringify(pkgData.name),
        PROJECT_APPNAME: JSON.stringify(pkgData.appName),
        PROJECT_VERSION: JSON.stringify(pkgData.version),
        PROJECT_DEPENDENCIES: JSON.stringify(pkgData.projectDependencies)
      }
    }),
    // 打包生成html
    new HtmlWebpackPlugin({
      inject: true,
      hash: true,
      cache: true,
      chunksSortMode: 'none',
      title: '', // 可以由外面传入
      filename: 'index.html', // 默认index.html
      template: path.resolve(__dirname, '../public/index.html'),
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true
      }
    })
  ]
};
