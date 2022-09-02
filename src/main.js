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

// 为什么写 if (window.console) 是为了避免 drop_console 开启后，把输出打包信息console删掉
// if (PROD && window.console) window.console.warn(JSON.stringify(buildInfo, null, '  '));

Vue.config.productionTip = false;
Vue.config.performance = DEV;

window.App = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
