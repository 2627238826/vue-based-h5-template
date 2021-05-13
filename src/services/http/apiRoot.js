let domain = window.location.origin + '/';

// 本地环境
if (process.env.NODE_ENV === 'development') {
  domain = domain + 'test/';
}

export default domain;
