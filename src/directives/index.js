// 定义懒加载插件
import { useIntersectionObserver } from '@vueuse/core'

// 导出一个lazyPlugin对象
export const lazyPlugin = {
  // 安装插件
  install(app) {
    // 懒加载指令逻辑
    app.directive('img-lazy', {
      // 指令挂载完成时
      mounted(el, binding) {
        // 使用 intersectionObserver 监听元素进入视口区域
        const { stop } = useIntersectionObserver(el, ([{ isIntersecting }]) => {
          // 如果元素进入视口区域，则设置图片地址，并停止监听
          if (isIntersecting) {
            // 进入视口区域
            el.src = binding.value
            stop() // 停止监听
          }
        })
      }
    })
  }
}
