import router from '@/router/index'

export const routerTo = (parameter) => {
  router.push(`/${parameter}`)
}

// 带参数的 router（用 query 传 region，避免 Vue Router 4 丢弃未在 path 中声明的 params）
export const routerToParam = (page, parameter) => {
  // todo:
}

export const routerToByName = (page) => {
  router.push({ name: page })
}
