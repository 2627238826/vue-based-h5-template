import Vue from 'vue';
import App from './App.vue';
import '@/assets/styles/index.scss';
import 'directives';
import router from 'router';
import store from 'store';
import vant from 'vant';
import vueWechatTitle from 'vue-wechat-title';

Vue.use(vant);
Vue.use(vueWechatTitle);

const isDev = process.env.NODE_ENV === 'development';
Vue.config.productionTip = false;
Vue.config.performance = isDev;

// 正式环境去除调试
if (location.origin.search(/(\/xg|\/api|\/app)/g) == -1) {
  const VConsole = require('VConsole');
  window.vconsole = new VConsole();
}

window.App = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
