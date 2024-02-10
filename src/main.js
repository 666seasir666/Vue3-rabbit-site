import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import 'element-plus/theme-chalk/dark/css-vars.css'
import './styles/dark/css-vars.css'

// 引入初始化样式文件
import '@/styles/common.scss'

// 引入懒加载指令插件并注册
import { lazyPlugin } from '@/directives'

const app = createApp(App)

// import VueLazyload from 'vue-lazyload'

// 创建Pinia实例
app.use(createPinia())
// 添加路由
app.use(router)
// 添加lazyPlugin
// app.use(VueLazyload)
// 添加图片懒加载
app.use(lazyPlugin)
// 挂载到#app
app.mount('#app')
