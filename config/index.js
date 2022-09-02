require('dotenv').config();

module.exports = {
  env: process.env.VUE_APP_ENV || 'test',
  domain: {
    branch: process.env.VUE_APP_DOMAIN_BRANCH || 'test-esy.xgjktech.com.cn',
    test: process.env.VUE_APP_DOMAIN_TEST || 'test.xgjktech.com.cn',
    pre: process.env.VUE_APP_DOMAIN_PRE || 'pre.mediportal.com.cn',
    xg: process.env.VUE_APP_DOMAIN_XG || 'xg.mediportal.com.cn'
  }
};
