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
    url: '/admin-api/users',
    method: "get"
  })
}

export function getInfo(token) {
  return request({
    url: 'api/profile',
    method: 'get',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
}

export function logout(token) {
  return request({
    url: 'api/profile/logout',
    method: 'post',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
}
