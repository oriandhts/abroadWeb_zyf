import { ElNotification, ElMessage } from 'element-plus'
import axios from 'axios'

// 服务端的ip地址
const BASE_API = 'http://127.0.0.1:3000'

//明确发送的数据类型
axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'

// 创建axios实例
const request = axios.create({
  baseURL: BASE_API,
  // 超时
  timeout: 10000,
})

// request拦截器
request.interceptors.request.use(
  (config) => {
    //检测是否有token
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }

    //序列化为 JSON 字符串
    if (config.method === 'post' || config.method === 'put') {
      config.data = typeof config.data === 'object' ? JSON.stringify(config.data) : config.data
    }
    return config
  },
  (error) => {
    console.log(error)
  },
)

const errorCode = {
  401: '认证失败，无法访问系统资源',
  403: '当前操作没有权限',
  404: '访问资源不存在',
  default: '系统未知错误，请反馈给管理员',
}

// 响应拦截器
request.interceptors.response.use(
  (res) => {
    // 未设置状态码则默认成功状态
    const code = res.data.code || 200
    // 获取错误信息
    const myCode = code.toString()
    const msg = errorCode[myCode] || res.data.msg || errorCode['default']
    // 二进制数据则直接返回
    if (res.request.responseType === 'blob' || res.request.responseType === 'arraybuffer') {
      return res.data
    }
    if (code === 401) {
      console.log('detail', res.data.detail)
      return Promise.reject('无效的会话，或者会话已过期，请重新登录。')
    } else if (code === 500) {
      ElMessage({ message: msg, type: 'error' })
      return Promise.reject(new Error(msg))
    } else if (code === 601) {
      ElMessage({ message: msg, type: 'warning' })
      return Promise.reject(new Error(msg))
    } else if (code !== 200) {
      ElNotification.error({ title: msg })
      return Promise.reject('error')
    } else {
      return res
    }
  },
  (error) => {
    console.dir(error)
    const { message, response } = error
    const { data } = response
    const { detail } = data
    // if (message == 'Network Error') {
    //   message = '后端接口连接异常'
    // } else if (message.includes('timeout')) {
    //   message = '系统接口请求超时'
    // } else if (message.includes('Request failed with status code')) {
    //   message = '系统接口' + message.substr(message.length - 3) + '异常'
    // }
    ElMessage({ message: message + detail, type: 'error', duration: 5 * 1000 })
    return Promise.reject(error)
  },
)

export default request
