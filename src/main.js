import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import 'element-plus/theme-chalk/dark/css-vars.css'
import './styles/dark/css-vars.css'

// 引入初始化样式文件
import '@/styles/common.scss'

// 全局指令注册
// import { directivePlugin } from '@/directives'
// app.use(directivePlugin)
// // 定义懒加载插件

import { useIntersectionObserver } from '@vueuse/core'

const app = createApp(App)

import VueLazyload from 'vue-lazyload'

app.use(createPinia())
app.use(router)
app.use(VueLazyload)
app.mount('#app')

// 懒加载指令逻辑
app.directive('img-lazy', {
  mounted(el, binding) {
    // el: 指令绑定的那个元素 img
    // binding: binding.value  指令等于号后面绑定的表达式的值  图片url
    console.log(el, binding.value)
    useIntersectionObserver(el, ([{ isIntersecting }]) => {
      console.log(isIntersecting)
      if (isIntersecting) {
        //  进入视口区域
        el.scr = binding.value
      }
    })
  }
})
