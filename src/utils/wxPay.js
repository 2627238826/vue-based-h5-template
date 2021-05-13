// 微信支付（注意这里使用doctorCircle工程的支付（公众号后台不需要另外配置安全域名））
window.dcPay = {
  goToPay: function(configData) {
    localStorage.setItem(
      'dcPay',
      JSON.stringify({
        appId: configData.appId, // 公众号名称，由商户传入
        timeStamp: configData.timeStamp, // 时间戳，自1970年以来的秒数
        nonceStr: configData.nonceStr, // 随机串
        package: configData.package,
        signType: configData.signType, // 微信签名方式
        paySign: configData.paySign, // 微信签名
        redirectUrl: configData.redirectUrl // 支付后的回调地址
      })
    );
    // console.log('微信支付订单信息签名', localStorage.getItem('dcPay'));
    // 注意这里使用doctorCircle工程的支付（公众号后台不需要另外配置安全域名）
    window.location.href = '/doctorCircle/web/wxpay.html';
  },
  checkPayResult: function(cb) {
    var res = JSON.parse(localStorage.getItem('dcPay')) || {};
    localStorage.removeItem('dcPay');

    var payRes = res ? res.result : '';
    // console.log('支付结果2', payRes);
    if (payRes === 'ok') {
      // eslint-disable-next-line standard/no-callback-literal
      cb(true, res);
    } else if (payRes === 'fail') {
      // eslint-disable-next-line standard/no-callback-literal
      cb(false, res);
    }
  }
};
