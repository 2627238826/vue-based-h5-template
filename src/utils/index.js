// DOM操作工具函数
export { hasClass, addClass, removeClass, toggleClass, scrollTo } from './dom';

// 校验工具函数
export {
  isValueNull,
  validateInteger,
  validLowerCase,
  validUpperCase,
  validAlphabets,
  isValidString,
  isIncludeFullChar,
  isIncludeChinese,
  validPhone,
  validEmail,
  validURL
} from './validate';

// 存储工具函数
export {
  setLocalStorage,
  getLocalStorage,
  removeLocalStorage,
  setSessionStorage,
  getSessionStorage,
  removeSessionStorage,
  setCookie,
  getCookie,
  removeCookie
} from './storage';

// 格式化工具函数
export { queryString, dateFormat, bytes, currency, toThousand } from './format';

// 字符串类工具
export { trim, trimLeft, trimRight } from './string';

// 数组类工具
export { unique, sortByProps } from './arrary';

// 对象类工具函数
export { getQueryObject } from './object';

// 埋点工具
export { initLog, setUserInfo, addEventLog, addBusinessLog } from './logger';

/**
 * 防抖
 * @param {*} fn
 * @param {*} delay
 *
 * 场景：
 */
export function debounce(fn, delay = 500) {
  let timer;
  return function() {
    let args = arguments;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      timer = null;
      fn.apply(this, args);
    }, delay);
  };
}

/**
 * 节流
 * @param {*} fn
 * @param {*} delay
 *
 * 场景：
 */
export function throttle(fn, delay = 500) {
  let last;
  let timer;
  let interval = delay;
  return function() {
    let args = arguments;
    let now = +new Date();
    if (last && now - last < interval) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        last = now;
        fn.apply(this, args);
      }, interval);
    } else {
      last = now;
      fn.apply(this, args);
    }
  };
}

/**
 * 倒计时
 * @param {*} options
 */
export function countDown(options) {
  if (!options) return;
  let { startVal, endVal, step, runCallback, endCallback } = options;
  let timeInterval = setInterval(() => {
    startVal--;
    runCallback(startVal);

    if (startVal === endVal) {
      clearInterval(timeInterval);
      timeInterval = null;
      endCallback();
    }
  }, step);
}

/**
 * 是否是开发模式
 * @param {*} options
 */
export function isDevMode() {
  // console.log('当前环境', process.env.NODE_ENV);
  return process.env.NODE_ENV === 'development' ? true : false;
}

/**
 * 获取url参数
 * @param {*} options
 */
export function getParmas(url) {
  let theRequest = {};
  let strs;
  if (url.indexOf('?') !== -1) {
    var str = url.split('?')[1];
    strs = str.split('&');
    for (var i = strs.length - 1; i >= 0; i--) {
      theRequest[strs[i].split('=')[0]] = strs[i].split('=')[1];
    }
  }
  return theRequest;
}

/**
 * 对象转url参数
 * @param {*} data
 * @param {*} isPrefix
 */
export function queryParams(data, isPrefix) {
  isPrefix = isPrefix ? isPrefix : false;
  let prefix = isPrefix ? '?' : '';
  let _result = [];
  for (let key in data) {
    let value = data[key];
    // 去掉为空的参数
    if (['', undefined, null].includes(value)) {
      continue;
    }
    if (value.constructor === Array) {
      value.forEach(_value => {
        _result.push(encodeURIComponent(key) + '[]=' + encodeURIComponent(_value));
      });
    } else {
      _result.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
    }
  }

  return _result.length ? prefix + _result.join('&') : '';
}

/**
 * 判断设备
 * @param {*} options
 */
export function getDevice() {
  var agent = navigator.userAgent.toLowerCase();
  var device = {};
  if (agent.includes('micromessenger')) {
    device.app = 'weixin'; // 在微信中打开
  } else if (agent.match(/QQ\//i) === 'qq/') {
    device.app = 'qq'; // 在QQ打开
  } else if (agent.match(/WeiBo/i) === 'weibo') {
    device.app = 'weibo'; // 在新浪微博客户端打开
  }

  if (agent.indexOf('android') !== -1) {
    device.platform = 'Android';
  } else if (agent.indexOf('iphone') !== -1) {
    device.platform = 'iOS';
  }
  return device;
}

/**
 * 判断平台（mobile：移动端、pc：电脑端）
 * @param {*} options
 */
export function getplatform() {
  if (/Android|webOS|iPhone|iPod|iPad|BlackBerry/i.test(navigator.userAgent)) {
    if (/TmallGenieCC/i.test(navigator.userAgent)) {
      // 天猫精灵
      return 'pc';
    }
    return 'mobile';
  } else {
    return 'pc';
  }
}

/**
 * 判断当前浏览类型
 * @param {*} options
 */
export function browserType() {
  if (!!window.ActiveXObject || 'ActiveXObject' in window) {
    return 'IE';
  }
  if (navigator.userAgent.indexOf('Firefox') != -1) {
    return 'Firefox';
  }
  if (navigator.userAgent.indexOf('Chrome') != -1) {
    return 'Chrome';
  }
  if (navigator.userAgent.indexOf('Safari') != -1) {
    return 'Safari';
  }
}

/**
 * ajax请求
 * @param {*} options
 */
export const ajax = function(options) {
  let { method, url, data, params, async, success, headers } = options;
  // init options
  method = method || 'GET';
  async = async !== false;
  if (params) {
    const query = Object.keys(params)
      .map(key => +params[key])
      .join('&');
    url = `${url}?${query}`;
  }

  // get xhr
  let xhr = window.XMLHttpRequest && new XMLHttpRequest();

  if (!xhr) {
    const getActiveXObject = () => {
      const version = ['MSXML2.XMLHttp.6.0', 'MSXML2.XMLHttp.3.0', 'MSXML2.XMLHttp'];
      for (let i = 0; version.length; i++) {
        try {
          // eslint-disable-next-line no-undef
          return new ActiveXObject(version[i]);
        } catch (e) {
          throw Error('Not support ActiveXObject');
        }
      }
    };
    xhr = getActiveXObject();
  }

  const codeMessage = {
    200: '服务器成功返回请求的数据。',
    201: '新建或修改数据成功。',
    202: '一个请求已经进入后台排队（异步任务）。',
    204: '删除数据成功。',
    400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
    401: '用户没有权限（令牌、用户名、密码错误）。',
    403: '用户得到授权，但是访问是被禁止的。',
    404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
    406: '请求的格式不可得。',
    410: '请求的资源被永久删除，且不会再得到的。',
    422: '当创建一个对象时，发生一个验证错误。',
    500: '服务器发生错误，请检查服务器。',
    502: '网关错误。',
    503: '服务不可用，服务器暂时过载或维护。',
    504: '网关超时。'
  };

  // request success callback
  xhr.onreadystatechange = function() {
    if ((xhr.readyState === 4 && xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
      success && success(xhr.responseText);
    } else {
      // eslint-disable-next-line no-undef
      throw new Errow({
        message: `请求错误 ${xhr.status}: ${url || null}`,
        description: codeMessage[xhr.status] || xhr.statusText
      });
    }
  };

  /*
  	// 请求成功回调2
    // 注意：status===200是有坑的，因为协商缓存返回的状态码是304，请求也是成功的请求，所以下面的判断更完善
    xhr.onload = function() {
      if((xhr.status>=200 && xhr.status < 300) || xhr.status === 304) {
          // do successCallback
      }
    }
	*/

  // create request
  xhr.open(method, url, async);

  // extends headers
  if (headers) {
    Object.keys(headers).map(key => xhr.setRequestHeader(key, headers[key]));
  }

  // send request
  method.toLowerCase() === 'get' ? xhr.send() : xhr.send(data);
};
