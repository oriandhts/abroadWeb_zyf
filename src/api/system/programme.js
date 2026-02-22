import axios from 'axios'
import service from '../../utils/request/request.js'
axios.defaults.headers.common['Cache-Control'] = null
axios.defaults.headers.common['Pragma'] = null

/**
 * 获取程序列表
 * @param {Object} params - 查询参数（可选，用于搜索）
 * @returns {Promise} 返回程序列表数据
 */
export const getProgramList = async () => {
  try {
    const data = await service.get('/program/list')
    return data
  } catch (error) {
    console.error('获取程序列表失败:', error)
    throw error
  }
}

/**
 * 根据条件获取程序列表（POST 请求）
 * @param {Object} params - 查询条件参数
 * @param {string[]} [params.region] - 项目区域
 * @param {string[]} [params.program_type] - 项目类型
 * @param {string[]} [params.tuition_fee] - 学费范围
 * @param {string[]} [params.duration] - 学制年限
 * @param {string[]} [params.special] - 入学时间
 * @param {string} [params.keyword] - 搜索关键词
 * @returns {Promise} 返回程序列表数据
 */
export const getProgramByCon = async (params = {}) => {
  try {
    // 处理参数，确保格式正确
    const requestData = {
      region: params.region || [],
      program_type: params.program_type || [],
      tuition_fee: params.tuition_fee || [],
      duration: params.duration || [],
      special: params.special || [],
    }

    // 如果有搜索关键词，添加到请求数据中
    if (params.keyword) {
      requestData.keyword = params.keyword
    }

    console.log('发送给后端的请求数据:', requestData)

    const data = await service.post('/program/con', requestData)
    return data
  } catch (error) {
    console.error('根据条件获取程序列表失败:', error)
    throw error
  }
}
