import axios from 'axios'
import store from '@/store'
// 引入进度条及进度条样式
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const requests = axios.create({
  // 基础路径
  baseURL: '/api',
  // 请求不能超过5S
  timeout: 5000
})

// 添加请求拦截器
requests.interceptors.request.use(
  (config) => {
    if (store.state.detail.uuid_token) {
      // 请求头添加一个字段(userTempId):和后台老师商量好了
      config.headers.userTempId = store.state.detail.uuid_token;
    }
    // 需要携带token带给服务器
    if (store.state.user.token) {
      config.headers.token = store.state.user.token;
    }

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
