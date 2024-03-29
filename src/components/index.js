// 把components中的所有组件进行全局化注册
// 通过插件的方式
import ImageView from '@/components/ImageView/index.vue'
import Sku from '@/components/XtxSku/index.vue'

export const componentPlugin = {
  install(app) {
    // 注册组件
    app.component('XtxImageView', ImageView)
    app.component('XtxSku', Sku)
  }
}
