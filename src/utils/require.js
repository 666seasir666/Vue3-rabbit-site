// 导入axios
import axios from 'axios'
import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css'
import { useUserStore } from '@/stores/UserStore.js'
import router from '@/router'

// 创建axios实例
const instance = axios.create({
  baseURL: 'https://pcapi-xiaotuxian-front-devtest.itheima.net', //请求地址

  // baseURL: 'https://apipc-xiaotuxian-front.itheima.net', //线上请求地址

  timeout: 5000 // 请求超时时间
})

// 添加请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 1.从pinia中获取用户信息
    const userStore = useUserStore()
    // 2.从用户信息中获取token
    const token = userStore.userInfo.token
    if (token) {
      // config.headers 表示 HTTP 请求的头部信息。无论是 HTTP 还是 HTTPS，代码都是一样的。
      // Authorization 是 HTTP 头部的一个字段，用于携带身份验证信息。
      // Bearer ${ token } 是一种身份验证方案，其中 ${ token } 是用户的令牌（或称为 Token）。
      // 在 Bearer 身份验证中，Token 会以 "Bearer " 开头，然后是实际的令牌
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (e) => Promise.reject(e)
)

// axios响应式拦截器
instance.interceptors.response.use(
  (res) => res.data,
  (e) => {
    const userStore = useUserStore()
    // 统一错误提示
    ElMessage({
      type: 'warning',
      message: e.response.data.message
    })

    // 401 token失效处理
    // 1.清除本地用户登录数据
    if (e.response && e.response.status === 401) {
      userStore.clearUserInfo()
      router.push('/login')
      ElMessage.warning('token校验失败')
    }
    return Promise.reject(e)
  }
)

// 导出实例
export default instance
