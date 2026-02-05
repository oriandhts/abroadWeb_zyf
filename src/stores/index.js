import { useHomepageStore } from './homepage'
import { useGlobalStore } from './global'

// 正确声明并导出
const rootStore = {
  get homepage() {
    return useHomepageStore()
  },
  get global() {
    return useGlobalStore()
  },
}

export default rootStore
