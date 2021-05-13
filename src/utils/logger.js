/**
 * 埋点初始化（dc-framework初始化实例变量必须为framework并挂载在window全局）
 * @param {*} type //埋点类型*必传（default: 日志埋点；event: 事件埋点；business: 业务埋点；performance: 性能埋点；默认为日志埋点）
 * @param {*} appName //业务包名*必传（埋点文档管理系统查找对应的业务包名，名称规则是h5-xxx）
 */
export function initLog(type, appName) {
  if (!window.framework) {
    window.App.$toast.fail('window对象里没有framework实例！');
    return;
  }
  if (!type || !appName) {
    window.App.$toast.fail('埋点初始化缺少必要参数！');
    return;
  }
  window.logger = window.framework.logger.init({
    type: type,
    appName: appName
  });
  // 添加处理器（根据实际需求定义，默认是server处理器）
  let ServerHandler = window.framework.logger.ServerHandler;
  window.logger.pushHandler(new ServerHandler());
}

/**
 * 设置用户信息
 * @param {*} userId
 * @param {*} token
 */
export function setUserInfo(userId, token) {
  window.framework.context.setUser({
    userId: userId
  });
  window.framework.context.setToken(token);
}

/**
 * 事件埋点写入数据
 * @param {*} page //页面名称*必传（埋点文档管理系统查找）
 * @param {*} event //事件名称（埋点文档管理系统查找）
 * @param {*} content //扩展参数（具体要埋点的数据）
 */
export function addEventLog(page, event, content = {}) {
  if (!page || !event) {
    window.App.$toast.fail('写入埋点数据缺少必要参数！');
    return;
  }
  window.logger.log({
    page: page,
    event: event,
    content: content
  });
}

/**
 * 业务埋点写入数据
 * @param {*} moduleName //模块名称*必传（埋点文档管理系统查找）
 * @param {*} content //扩展参数（具体要埋点的数据）
 */
export function addBusinessLog(moduleName, content = {}) {
  if (!moduleName) {
    window.App.$toast.fail('写入埋点数据缺少必要参数！');
    return;
  }
  window.logger.log({
    moduleName: moduleName,
    content: content
  });
}
