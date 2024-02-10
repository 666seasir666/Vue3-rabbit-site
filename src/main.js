import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import 'element-plus/theme-chalk/dark/css-vars.css'
import './styles/dark/css-vars.css'

import { useIntersectionObserver } from '@vueuse/core'

// 引入初始化样式文件
import '@/styles/common.scss'

// 引入懒加载指令插件并注册
// import { lazyPlugin } from '@/directives'

const app = createApp(App)

// import VueLazyload from 'vue-lazyload'

app.use(createPinia())
app.use(router)
// app.use(VueLazyload)
// app.use(lazyPlugin)
app.mount('#app')

// 定义全局指令
app.directive('img-lazy', {
  mounted(el, binding) {
    console.log(el, binding.value)
    useIntersectionObserver(el, ([{ isIntersecting }]) => {
      console.log(isIntersecting)

      if (isIntersecting) {
        // 进入视口区域
        el.src = binding.value
      }
    })
  }
})
