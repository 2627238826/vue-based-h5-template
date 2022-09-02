const path = require('path');
const config = require('./index');

const port = 8081;

module.exports = {
  packageVersionVerify: [], // 检测本地安装的和package.json版本对比是否一致
  devServer: {
    clientLogLevel: 'warning', // 输出日志级别
    hot: true, // 启用热更新
    contentBase: path.resolve(__dirname, './dist'), // 告诉服务器从哪里提供内容
    publicPath: '/', // 此路径下的打包文件可在浏览器下访问
    compress: false, // gzip压缩
    port: port,
    // host: '192.168.x.x', // 导致 localhost 和 127.0.0.1 无法访问页面，必须使用局域网ip访问
    host: '0.0.0.0', // 兼容localhost 和 127.0.0.1、内网ip多种访问方式
    open: false, // 自动打开浏览器，请设置false，使用OpenBrowserPlugin体验更好
    // openPage: 'http://127.0.0.1:' + port,
    useLocalIp: true, // 会打开 192.168 这种局域网地址
    https: false,
    overlay: {
      // 出现错误或者警告时候是否覆盖页面线上错误信息
      warnings: true,
      errors: true
    },
    quiet: true,
    proxy: {
      // 设置代理
      '/esy': {
        target: `http://${config.domain.branch}`,
        changeOrigin: true,
        pathRewrite: { '^/esy': '' }
      },
      '/test': {
        target: `http://${config.domain.test}`,
        changeOrigin: true,
        pathRewrite: { '^/test': '' }
      },
      '/pre': {
        target: `http://${config.domain.pre}`,
        changeOrigin: true,
        pathRewrite: { '^/pre': '' }
      },
      '/xg': {
        target: `http://${config.domain.xg}`,
        changeOrigin: true,
        pathRewrite: { '^/xg': '' }
      }
    },
    // stats: 'verbose',
    watchOptions: {
      // 监控文件相关配置
      poll: 1000,
      ignored: /node_modules/, // 忽略监控的文件夹, 正则
      aggregateTimeout: 300 // 默认值, 当你连续改动时候, webpack可以设置构建延迟时间(防抖)
    }
  }
};
