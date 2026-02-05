// src/utils/api.js
import axios from 'axios'

const api = axios.create({
  withCredentials: true,
  baseURL: 'http://localhost:8000',
})

// 存储 Last-Modified 时间
let lastModified = null

// 请求拦截器：自动添加 If-Modified-Since
api.interceptors.request.use((config) => {
  if (lastModified && config.url === '/data') {
    config.headers['If-Modified-Since'] = lastModified
  }
  return config
})

// 响应拦截器：处理 304 状态码
api.interceptors.response.use(
  (response) => {
    if (response.status === 200 && response.headers['last-modified']) {
      // 更新 Last-Modified
      lastModified = response.headers['last-modified']
    }
    return response
  },
  (error) => {
    if (error.response && error.response.status === 304) {
      // 返回自定义数据表示使用缓存
      return Promise.resolve({ data: { message: 'Cached data' } })
    }
    return Promise.reject(error)
  },
)

export default api
