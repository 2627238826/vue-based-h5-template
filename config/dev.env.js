const path = require('path');
const os = require('os');
// 获取本机IP
function findLocalIp() {
  let localhost = '';
  try {
    let ip = '',
      interfaces = os.networkInterfaces();
    const excludeIps = ['127.0.0.1'];
    for (const i of Object.values(interfaces)) {
      i.forEach(item => {
        if (ip === '' && item.family === 'IPv4' && !item.internal && !excludeIps.includes(item.address)) {
          ip = item.address;
        }
      });
    }
    localhost = ip;
  } catch (e) {
    localhost = 'localhost';
  }
  return localhost;
}

module.exports = {
  packageVersionVerify: [], // 检测本地安装的和package.json版本对比是否一致
  devServer: {
    clientLogLevel: 'warning', // 输出日志级别
    hot: true, // 启用热更新
    contentBase: path.resolve(__dirname, './dist'), // 告诉服务器从哪里提供内容
    publicPath: '/', // 此路径下的打包文件可在浏览器下访问
    compress: true, // 启用gzip压缩
    host: findLocalIp(),
    port: 8081,
    https: false,
    open: true, // 自动打开浏览器
    overlay: {
      // 出现错误或者警告时候是否覆盖页面线上错误信息
      warnings: true,
      errors: true
    },
    quiet: true,
    proxy: {
      // 设置代理
      '/dev': {
        target: 'http://dev.mediportal.com.cn',
        changeOrigin: true,
        pathRewrite: {
          '^/dev': ''
        }
      },
      '/test': {
        target: 'http://test.dachentech.com.cn',
        changeOrigin: true,
        pathRewrite: {
          '^/test': ''
        }
      },
      '/pre': {
        target: 'http://pre.mediportal.com.cn',
        changeOrigin: true,
        pathRewrite: {
          '^/pre': ''
        }
      },
      '/xg': {
        target: 'http://xg.mediportal.com.cn',
        changeOrigin: true,
        pathRewrite: {
          '^/xg': ''
        }
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
