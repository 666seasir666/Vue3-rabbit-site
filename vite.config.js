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
  },

  build: {
    // 配置构建选项
    rollupOptions: {
      // 输出选项
      output: {
        // 指定 chunks 的入口文件模式
        entryFileNames: 'js/[name]-[hash].js',
        // 对代码分割中产生的 chunk 自定义命名
        chunkFileNames: 'js/[name]-[hash].js',
        // 对静态资源（如图片、字体等）进行自定义命名
        assetFileNames(assetInfo) {
          if (assetInfo.name.endsWith('.css')) {
            return 'css/[name]-[hash].css'
          }
          // 判断资源是否为图片或svg格式
          const imaExts = ['jpg', 'jpeg', 'png', 'svg', 'gif']
          if (imaExts.some((ext) => assetInfo.name.endsWith(ext))) {
            return 'image/[name]-[hash].[ext]'
          }
          // 其他资源使用默认命名
          return 'assets/[name]-[hash].[ext]'
        }
      },
      // 分包配置
      manualChunks(id) {
        console.log(id)
        // 如果 id 中包含 node_modules，则将其归入 vendor 分包
        if (id.includes('node_modules')) {
          return 'vendor'
        }
      }
    }
  }
})
