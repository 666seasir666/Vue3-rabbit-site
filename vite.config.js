// 引入 Node.js 模块，用于处理文件路径和 URL
import { fileURLToPath, URL } from 'node:url'

// 引入 Vite 的配置函数和 Vue 插件
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// 引入自动导入插件和 Vue 组件插件
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// 引入 Element Plus 插件
import ElementPlus from 'unplugin-element-plus/vite'

// Vite 配置
export default defineConfig({
  base: './',
  plugins: [
    // 使用 Vue 插件
    vue(),

    // 使用自动导入插件，配置 Element Plus 解析器
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),

    // 使用 Vue 组件插件，配置 Element Plus 解析器和导入样式为 Sass
    Components({
      resolvers: [ElementPlusResolver({ importStyle: 'sass' })]
    }),

    // 使用 Element Plus 插件，设置使用源码
    ElementPlus({
      useSource: true
    })
  ],

  // 配置解析选项，设置别名 '@' 指向 'src' 目录
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },

  // 配置 CSS 选项，设置预处理器选项为 SCSS，引入额外的 SCSS 数据
  css: {
    preprocessorOptions: {
      scss: {
        // ~/styles/element/index.scss需要改成相对路径的 @
        additionalData: `
        @use "@/styles/element/index.scss" as *;
        @use "@/styles/var.scss" as *;`
      }
    }
  }
})
