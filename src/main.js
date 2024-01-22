import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import 'element-plus/theme-chalk/dark/css-vars.css'
import './styles/dark/css-vars.css'

// 引入初始化样式文件
import '@/styles/common.scss'

// 测试axios发起请求
import { getCategoryAPI } from '@/apis/test'
getCategoryAPI().then((res) => {
  console.log(res)
})
const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
