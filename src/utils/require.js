// 导入axios
import axios from 'axios'

// 创建axios实例
const instance = axios.create({
  // baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net', //请求地址

  baseURL: 'https://apipc-xiaotuxian-front.itheima.net', //请求地址
  timeout: 5000 // 请求超时时间
})

// 添加请求拦截器
instance.interceptors.request.use(
  (config) => {
    return config
  },
  (e) => Promise.reject(e)
)

// axios响应式拦截器
instance.interceptors.response.use(
  (res) => res.data,
  (e) => {
    return Promise.reject(e)
  }
)

// 导出实例
export default instance
