import http from '@/services/http';
import dcJSBridge from 'dcJSBridge';
import { setSessionStorage, getSessionStorage, removeSessionStorage } from '@/utils';

// 根store（注意：储存数据使用‘sessionStorage’）
export default {
  namespaced: false,
  state: {
    token: getSessionStorage('token'), // token
    wxAppId: getSessionStorage('wxAppId'), // 公众号appid
    unionid: getSessionStorage('unionid'), // 微信授权唯一标识
    userInfo: getSessionStorage('userInfo') // 用户信息
  },
  getters: {
    token: state => state.token,
    wxAppId: state => state.wxAppId,
    unionid: state => state.unionid,
    userInfo: state => state.userInfo
  },
  mutations: {
    SET_VALUE_BY_KEY(state, { key, value }) {
      state[key] = value;
      setSessionStorage(key, value);
    },
    REMOVE_STATE_BY_KEY(state, { key, value }) {
      state[key] = '';
      removeSessionStorage(key);
    }
  },
  actions: {
    // 根据token获取用户信息
    GetUserDetail({ commit, state }) {
      http({
        url: '/auth2/v2/getTokenInfo',
        method: 'get',
        params: {
          accessToken: state.token
        }
      }).then(({ success, data }) => {
        if (success) {
          commit('SET_VALUE_BY_KEY', { key: 'userInfo', value: data });
        }
      });
    },
    // 公司内部app获取用户信息
    GetUser({ commit, state }) {
      return new Promise((resolve, reject) => {
        dcJSBridge.getIdentity(user => {
          if (user) {
            // openId 换 token
            http({
              url: '/auth2/v2/nologin/getToken',
              method: 'get',
              params: {
                openId: user.openID
              }
            }).then(({ success, data }) => {
              if (success) {
                // 存token
                commit('SET_VALUE_BY_KEY', { key: 'token', value: data });
                this.dispatch('GetUserDetail');
              }
              resolve({
                resultMsg: data.resultMsg,
                success: success,
                data: data
              });
            });
          }
        });
      });
    },
    // code换取用户信息
    fetchWxUserInfo({ commit, state }, code) {
      return http.get(`doctor/weChat/nologin/loginInfo?code=${code}&isOpen=0`).then(({ success, data }) => {
        if (success) {
          // 用户信息
          let { token } = data.accessToken;
          commit('SET_VALUE_BY_KEY', { key: 'token', value: token });
          commit('SET_VALUE_BY_KEY', { key: 'unionid', value: data.unionid });
          commit('SET_VALUE_BY_KEY', { key: 'userInfo', value: data });
          // 重定向地址(去除携带的code，避免复制)
          const url = `${location.origin}${location.pathname}${location.hash}`;
          window.location.replace(url);
        }
      });
    }
  }
};
