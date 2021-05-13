/* eslint-disable no-undef */
import wx from 'weixin-js-sdk';
import http from '@/services/http';

// 微信二次分享自定义菜单功能
/**
 * 注意：自定义微信分享需要引入微信JS-SDK文件（版本1.4.0以上）
 */

// 获取二次分享配置信息（params需要自定义的内容信息）
export function wx_share(params = {}) {
  let _href = window.location.href.split('#')[0];
  http({
    // 建议使用通用接口：wx/common/nologin/getConfig
    url: '/wx/circle/nologin/getConfig?url=' + encodeURIComponent(_href),
    method: 'get'
  }).then(({ success, data }) => {
    if (success) {
      wx_init_share(data, params);
    }
  });
}

// 初始化分享
export function wx_init_share(config = {}, params = {}) {
  if (!wx) {
    console.warn('微信JS-SDK文件不存在！');
    return;
  }

  wx.config({
    debug: config.debug || false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: config.appId, // 必填，公众号的唯一标识
    timestamp: config.timestamp, // 必填，生成签名的时间戳
    nonceStr: config.nonceStr, // 必填，生成签名的随机串
    signature: config.signature, // 必填，签名，见附录1
    jsApiList: [
      // 必填，需要使用的JS接口列表
      'openEnterpriseChat',
      'openEnterpriseContact',
      'onMenuShareTimeline',
      'onMenuShareAppMessage',
      'onMenuShareQQ',
      'onMenuShareWeibo',
      'onMenuShareQZone',
      'startRecord',
      'stopRecord',
      'onVoiceRecordEnd',
      'playVoice',
      'pauseVoice',
      'stopVoice',
      'onVoicePlayEnd',
      'uploadVoice',
      'downloadVoice',
      'chooseImage',
      'previewImage',
      'uploadImage',
      'downloadImage',
      'translateVoice',
      'getNetworkType',
      'openLocation',
      'getLocation',
      'hideOptionMenu',
      'showOptionMenu',
      'hideMenuItems',
      'showMenuItems',
      'hideAllNonBaseMenuItem',
      'showAllNonBaseMenuItem',
      'closeWindow',
      'scanQRCode',
      'updateAppMessageShareData',
      'updateTimelineShareData'
    ]
  });

  wx.ready(function() {
    setTimeout(function() {
      // 初始化功能
      setAppMessageShareData(params);
      setTimelineShareData(params);
    }, 50);
  });

  wx.error(res => {
    console.warn('微信初始化失败');
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
