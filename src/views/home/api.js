import http from '@/services/http';

// 接口
export function login(data) {
  return http({
    url: '/health/user/login',
    method: 'post',
    data,
    params: data
  });
}
