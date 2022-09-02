/**
 * meta部分参数说明
 * @param {Boolean} needWxAuthorize 页面是否在微信要授权
 */

export const constantRouterMap = [
  {
    path: '/',
    component: {
      template: '<router-view></router-view>'
    },
    redirect: '/home',
    children: [
      {
        name: 'home',
        path: 'home',
        component: () => import(/* webpackChunkName: "home" */ '@/views/home/home.vue'),
        meta: {
          title: '首页',
          needWxAuthorize: false
        }
      }
    ]
  }
];

export default constantRouterMap;
