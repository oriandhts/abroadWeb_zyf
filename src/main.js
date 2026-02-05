import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './assets/style/index.scss'
import App from './App.vue'
import router from './router'
// main.ts

// elementPlus-import
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ElementPlus)
// 注册组件

app.mount('#app')

document.addEventListener('scroll', (e) => {
  e.preventDefault()
  console.log(e)
})
