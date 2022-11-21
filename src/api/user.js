import request from '@/utils/request'

export function login(data) {
  return request({
    url: 'api/auth/sanctum/login',
    method: 'post',
    data
  })
}


export function getUsers(){
  return request({
    url: '/api/user',
    method: "get"
  })
}

export function getInfo(token) {
  return request({
    url: 'api/user/getMe',
    method: 'get',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
}

export function logout(token) {
  return request({
    url: 'api/user/logout',
    method: 'post',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
}
