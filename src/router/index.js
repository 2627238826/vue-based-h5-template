import Vue from 'vue';
import Router from 'vue-router';
import store from 'store';
import { getDevice, getParmas } from '@/utils/index.js';
import { getWxAppId } from '@/utils/wxAuthorize.js';
import constantRouterMap from './routes.js';

Vue.use(Router);

const router = new Router({
  routes: constantRouterMap,
  scrollBehavior: () => ({ y: 0 })
});

router.beforeEach((to, from, next) => {
  // 统一路由拦截处
  console.log(`路由拦截开始`);
  const Device = getDevice(); // 识别环境
  let unionid = store.getters.unionid; // 获取了微信信息
  if (Device.app === 'weixin' && to.meta.needWxAuthorize) {
    if (!unionid) {
      const params = getParmas(location.search || location.hash); // 授权后url携带code
      if (params.code) {
        // 获取用户信息
        console.log('获取用户信息');
        store.dispatch('fetchWxUserInfo', params.code);
      } else {
        console.log('去授权');
        // 获取appid并授权拿到code
        getWxAppId();
      }
    } else {
      // 已经有用户信息不授权
      next();
    }
  } else {
    // 非微信环境，或微信环境不需要授权情况
    next();
  }
});

export default router;
