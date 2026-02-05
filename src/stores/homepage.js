import { defineStore } from 'pinia'
import { getHomepageInfo } from '../api/homepage'
import { ElMessage } from 'element-plus' // 导入消息提示组件，根据你使用的UI库调整
export const useHomepageStore = defineStore('homepage', {
  state: () => ({
    token: '',
  }),
  getters: {},
  actions: {
    async getHomepageInfo() {
      try {
        const data = await getHomepageInfo()
        ElMessage.error(data.message || `操作失败（错误码：${data.code}）`)
        return data
      } catch (error) {
        console.error('获取用户信息失败：', error.message)
      }
    },
  },
})
