const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const Dotenv = require('dotenv-webpack');
const pkgPath = path.join(__dirname, '../package.json');
const pkgData = JSON.parse(fs.readFileSync(pkgPath));

const DEV = process.env.NODE_ENV === 'development';
const PROD = !DEV;

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
        test: /\.js/,
        include: [
          path.resolve(__dirname, '../src'), // 加上这个babel才会处理src下的js
          path.resolve(__dirname, '../node_modules/dotenv')
        ],
        use: [
          {
            loader: 'thread-loader'
          },
          {
            loader: 'cache-loader'
          },
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              sourceType: 'unambiguous',
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
          limit: 4 * 1024,
          name: 'fonts/[name]-[contenthash:5].[ext]',
          // outputPath: 'fonts/'
          publicPath: '../' // 多用于CDN
        }
      },
      // 处理图像
      {
        test: /\.(png|jpe?g|gif)(\?.*)?$/,
        use: [
          // 转base64
          {
            loader: 'url-loader',
            options: {
              // 具体配置见插件官网
              limit: 4 * 1024,
              name: 'img/[name]-[contenthash:5].[ext]',
              // outputPath: 'img/', // outputPath所设置的路径，是相对于 webpack 的输出目录。
              // publicPath: '../', // 多用于CDN
              esModule: false
            }
          }
        ]
      },
      {
        test: /\.svg$/i,
        use: [
          {
            loader: 'svg-url-loader',
            options: {
              // 文件大小小于limit参数，url-loader将会把文件转为base64 URL，值设置太大,会导致 主文件（mian.js）体积过大
              limit: 4 * 1024,
              name: 'img/[name]-[contenthash:5].[ext]',
              noquotes: true,
              esModule: false
            }
          }
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
      // DEV: 是不是开发中环境，方便本地开发写一些自测，打包后自测代码会自动删除
      // 示例: if (DEV) form.phone = 'mock130' // 开发中使用假数据、自动填个账号
      DEV: DEV,
      // PROD: 是不是打包后的环境，虽然if (!DEV) 也能表达，但是可读性不如 if (PROD)
      PROD: PROD,
      'process.env.PROJECT_DATA': {
        PROJECT_NAME: JSON.stringify(pkgData.name),
        PROJECT_APPNAME: JSON.stringify(pkgData.appName),
        PROJECT_VERSION: JSON.stringify(pkgData.version),
        PROJECT_DEPENDENCIES: JSON.stringify(pkgData.projectDependencies)
      }
    }),
    // 支持 dotenv 和其他环境变量
    new Dotenv(),
    // 将根目录的静态资源拷贝到打包出来的dist文件夹
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '../static'),
          to: 'static' // 打包后，文件会放在 /dist/static/ 下面
        }
      ]
    }),
    // 打包生成html
    new HtmlWebpackPlugin({
      inject: true,
      hash: true,
      cache: false,
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
  ],
  node: {
    fs: 'empty'
  }
};
