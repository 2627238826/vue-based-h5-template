import axios from '@/services/http';
import store from 'store';
// 微信授权功能

// 微信授权并重定向
function wx_authorize(appId) {
  if (!appId) {
    console.warn('缺少参数: appId');
    return;
  }

  // const SCOPE = 'snsapi_base';// 不需要弹框确认
  const SCOPE = 'snsapi_userinfo'; // 需要弹框确认（推荐这种）

  const STATE = '';

  if (STATE.length > 128) {
    console.warn('state 过长(只允许长度为128字节)');
    return;
  }

  const REDIRECT_URI = encodeURIComponent(window.location.href);
  window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=${SCOPE}&state=${STATE}#wechat_redirect`;
}

// 获取微信AppId
export function getWxAppId(type) {
  // 建议使用通用接口：wx/common/nologin/getConfig
  axios.get(`doctor/weChat/nologin/getAppId?companyType=1`).then(({ success, data }) => {
    if (success) {
      // 存储微信appId
      store.commit('SET_VALUE_BY_KEY', { key: 'wxAppId', value: data });
      wx_authorize(data);
    }
  });
}
