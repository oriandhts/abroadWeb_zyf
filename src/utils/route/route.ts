import router from '@/router/index'

export const routerTo = (parameter: string) => {
  router.push(`/${parameter}`)
}

// 带参数的 router
export const routerToParam = (page: string, parameter: string) => {
  router.push({ name: page, params: { country: parameter } })

  // 测试一个接口
  fetch('/ProInfo')
    .then((response) => response.json())
    .then((data) => console.log(data, '测一下接口'))
    .catch((error) => console.error('请求失败:', error))
}

export const routerToByName = (page: string) => {
  router.push({ name: page })
}
