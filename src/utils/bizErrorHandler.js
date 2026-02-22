// src/utils/bizErrorHandler.js
import { ElMessage } from 'element-plus'
// 如果有路由跳转的需求，也可以在这里引入 router
// import router from '@/router'

/**
 * 集中处理业务级别的错误码
 * @param {Object} res 后端返回的完整数据对象
 */
export function handleBizError(res) {
  const code = res.code
  const message = res.message || '系统发生未知错误'

  switch (code) {
    case 401:
      ElMessage.warning('登录已过期，请重新登录')
      // 清理 token 并跳转到登录页的逻辑也可以写在这里
      // localStorage.removeItem('token')
      // router.push('/login')
      break
    case 403:
      ElMessage.warning('您没有权限进行此操作')
      break
    // 以后有新的业务错误码，直接在这里往下加 case 即可
    // case 10001:
    //   ElMessage.error('该项目名称已存在')
    //   break
    default:
      // 匹配不到的具体业务错误，统一弹出后端给的 message
      ElMessage.error(message)
  }
}
