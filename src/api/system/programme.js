import axios from 'axios'
import api from './cache'
import { ref } from 'vue'
axios.defaults.headers.common['Cache-Control'] = null
axios.defaults.headers.common['Pragma'] = null

export async function listByCountry() {
  const response = await axios.get('http://127.0.0.1:8000/', {
    withCredentials: true, // 允许跨域携带 Cookie
  })
  console.log(response.data)
}

export async function fetchData() {
  try {
    const response = await api.get('/data', {
      headers: {
        'Content-Type': 'application/json', // 明确设置请求头
      },
      withCredentials: true, // 关键配置：允许携带 Cookie 或凭证
    })
    console.log('Data:', response.data)
  } catch (error) {
    console.error('Error:', error)
  }
}

const form = ref({
  username: 'admin',
  password: 'admin',
})

export const login = async () => {
  try {
    const response = await axios.post(
      'http://127.0.0.1:8000/login',
      form.value, // 假设 form.value 是 { username: "...", password: "..." }
      {
        headers: {
          'Content-Type': 'application/json', // 明确设置请求头
        },
        withCredentials: true, // 关键配置：允许携带 Cookie 或凭证
      },
    )

    console.log('登录成功', response.data)
    // 后续请求会自动携带cookie
  } catch (error) {
    console.error('登录失败', error)
  }
}
