import request from '@/utils/request/request.js'

export function getName(name) {
  return request({
    url: '/hello/' + name,
    method: 'get',
  })
}

// 第一次登录
export const loginCheck = (form_data) => {
  return request({
    url: '/token',
    method: 'post',
    data: form_data,
  })
}

// 之后登录
export const laterLogin = () => {
  return request({
    url: '/users/me',
    method: 'get',
  })
}
