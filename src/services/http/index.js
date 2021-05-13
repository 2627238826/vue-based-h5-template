import axios from 'axios';
import store from 'store';
import baseUrl from '@/services/http/apiRoot.js';
import { queryString } from '@/utils';

// 实例化
const myAxios = axios.create({
  baseURL: baseUrl,
  timeout: 50000
});

// 添加请求拦截器
myAxios.interceptors.request.use(config => {
  config.headers['access-token'] = config.headers['access-token'] ? config.headers['access-token'] : store.getters.token;

  // 添加鉴权令牌
  if (config.isAgent) {
    config.headers['Web-Agent'] = '0/0/101/web';
  }
  // 参数体处理
  if (config.isJson) {
    // json提交
    config.headers['Content-Type'] = 'application/json;charset=utf-8';
  } else if (config.isForm) {
    // 表单提交
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    config.data = queryString(config.data);
  }

  config.isShowError = config.isShowError === false ? false : true;
  // 是否显示lodding
  if (config.isShowLoading && window.App) {
    window.App.$toast.loading({
      mask: true,
      duration: 0,
      message: '加载中...'
    });
  }

  return config;
}, error);

// 添加响应拦截器
myAxios.interceptors.response.use(response => {
  let success = true;
  let resultMsg = '';
  let data = '';
  if (response && response.status === 200) {
    if (response.data.errorCode === 100001 || response.data.resultCode === 1030102) {
      resultMsg = '请重新登录';
      success = false;
      // store.dispatch('logout');
    } else {
      if (response.data) {
        data = response.data.data;
        if (!data && typeof data !== 'boolean') {
          data = '';
        }
        resultMsg = response.data.resultMsg || '';
        if (response.data.resultCode !== 1) {
          success = false;
          resultMsg = response.data.resultMsg || '接口失败';
        }
      }
    }
  } else if (response && response.status) {
    resultMsg = `请求状态错误码：${response.status}`;
    success = false;
  }
  if (!success && window.App) {
    // 需要使用自己的toast组件
    window.App.$toast.fail(resultMsg);
  }
  return Promise.resolve({
    resultMsg,
    success,
    data
  });
}, error);

function error(error) {
  let resultMsg = `网络异常`;

  if (error.response) {
    resultMsg = `${resultMsg}：${error.response.status} ${error.response.statusText}`;
  }

  if (window.App) {
    // 业务开发自行处理
    window.App.$toast.fail(resultMsg);
  }

  return Promise.reject({
    resultMsg: resultMsg,
    success: false
  });
}
export default myAxios;
