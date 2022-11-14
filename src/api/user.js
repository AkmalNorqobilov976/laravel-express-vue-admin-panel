import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/auth/sanctum/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/user/getMe',
    method: 'get',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
}

export function logout(token) {
  return request({
    url: '/user/logout',
    method: 'post',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
}
