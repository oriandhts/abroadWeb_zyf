// src/utils/request.js
import axios from 'axios'
import { ElMessage } from 'element-plus'
// 1. 引入刚才抽离出去的业务错误处理方法
import { handleBizError } from '.././bizErrorHandler'

const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API || 'http://127.0.0.1:8000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
})

// 请求拦截器 (保持不变)
service.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    console.error('Request Error:', error)
    return Promise.reject(error)
  },
)

// 响应拦截器 (变得更加干净)
service.interceptors.response.use(
  (response) => {
    const res = response.data

    if (res.code === 200 || res.code === 0) {
      // 请求成功，直接返回核心数据
      return res.data
    }

    // 2. 调用抽离出去的业务错误处理中心
    handleBizError(res)

    // 抛出异常，阻断执行
    return Promise.reject(new Error(res.message || 'Error'))
  },
  (error) => {
    // 这里的 HTTP 网络级别错误，其实也可以用同样的方法抽离出去，比如叫 handleHttpError(error)
    console.error('HTTP Error:', error)
    let message = '网络请求失败，请稍后重试'

    if (error.response && error.response.status) {
      switch (error.response.status) {
        case 404:
          message = '请求的接口不存在'
          break
        case 500:
          message = '服务器内部错误'
          break
        case 502:
          message = '网关错误'
          break
        case 504:
          message = '网关超时'
          break
      }
    }
    ElMessage.error(message)
    return Promise.reject(error)
  },
)

export default service
