// createRouter：创建router实例对象
// createWebHistory：创建History模式路由
import { createRouter, createWebHistory } from 'vue-router'
import Category from '@/views/Category/index.vue'
import Home from '@/views/Home/index.vue'
import Layout from '@/views/Layout/index.vue'
import Login from '@/views/Login/index.vue'
import SubCategory from '@/views/SubCategory/index.vue'

// 创建一个路由实例
const router = createRouter({
  // 创建一个web历史记录
  history: createWebHistory(import.meta.env.BASE_URL),
  // 路由配置
  routes: [
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '',
          component: Home
        },
        {
          path: 'category/:id',
          component: Category
        },
        {
          path: 'category/sub/:id',
          component: SubCategory
        }
      ]
    },
    {
      path: '/Login',
      component: Login
    }
  ],
  // 路由滚动行为
  scrollBehavior() {
    // return 期望滚动到哪个的位置
    return { top: 0 }
  }
})

// 导出路由实例
export default router
