const find = require('find-process');
const config = require('../config/dev.env');

let port = config.devServer.port;

find('port', port).then(function(list) {
  if (list.length) {
    let name = list[0].name;
    let msg = 'error: ' + port + '端口已被 [' + name + '] 占用，请先关闭程序释放端口之后再启动本项目';
    console.error(msg);
    // throw new Error(msg);
    process.exit(1);
  }
});
