/**
 *  微信二次分享自定义菜单功能
 *  注意：自定义微信分享需要引入微信JS-SDK文件（版本1.4.0以上）
 */
/* eslint-disable no-undef */
import wx from 'weixin-js-sdk';
import getWXSign from './wxSign';

// params需要自定义的内容信息
export function wx_share(params = {}) {
  getWXSign().then(() => {
    // 初始化功能
    setAppMessageShareData(params);
    setTimelineShareData(params);
  });
}

/**
 * 分享给朋友
 * @param title 标题
 * @param desc 描述
 * @param link 链接
 * @param imgUrl 图标
 */
export function setAppMessageShareData({ title = '', desc = '', link = window.location.href, imgUrl } = {}) {
  wx.updateAppMessageShareData({
    title, // 分享标题
    desc, // 分享描述
    link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
    imgUrl // 分享图标
  });
}

/**
 * 分享朋友圈
 * @param title 标题
 * @param link 链接
 * @param imgUrl 图标
 */
export function setTimelineShareData({ title = '', link = window.location.href, imgUrl } = {}) {
  wx.updateTimelineShareData({
    title, // 分享标题
    link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
    imgUrl // 分享图标
  });
}
