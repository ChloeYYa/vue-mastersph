import axios from 'axios'
// 引入进度条及进度条样式
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const requests = axios.create({
  // 基础路径
  baseURL: '/mock',
  // 请求不能超过5S
  timeout: 5000
})

// 添加请求拦截器
requests.interceptors.request.use((config) => {
  NProgress.start()
  return config
})

// 添加响应拦截器
requests.interceptors.response.use(
  (res) => {
    NProgress.done()
    return res.data
  },
  () => {
    return alert('服务器响应数据失败')
  }
)

export default requests
