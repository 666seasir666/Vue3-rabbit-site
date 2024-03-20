// createRouter：创建router实例对象
// createWebHistory：创建History模式路由
import { createRouter, createWebHistory } from 'vue-router'
import Category from '@/views/Category/index.vue'
import Home from '@/views/Home/index.vue'
import Layout from '@/views/Layout/index.vue'
import Login from '@/views/Login/index.vue'
import SubCategory from '@/views/SubCategory/index.vue'
import Detail from '@/views/Detail/index.vue'
import Cart from '@/views/Cart/index.vue'
import Checkout from '@/views/Checkout/index.vue'
import Pay from '@/views/Pay/index.vue'
import PayBack from '@/views/Pay/PayBack.vue'
import Member from '@/views/Member/index.vue'
import UserInfo from '@/views/Member/components/UserInfo.vue'
import UserOrder from '@/views/Member/components/UserOrder.vue'

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
        },
        {
          path: 'detail/:id',
          component: Detail
        },
        {
          path: '/Cart',
          component: Cart
        },
        {
          path: '/Checkout',
          component: Checkout
        },
        {
          path: '/Pay',
          component: Pay
        },
        {
          path: '/paycallback',
          component: PayBack
        },
        {
          path: '/member',
          component: Member,
          children: [
            {
              path: '',
              component: UserInfo
            },
            {
              path: 'order',
              component: UserOrder
            }
          ]
        }
      ]
    },
    {
      path: '/Login',
      component: Login
    }
  ],
  // 路由滚动行为
  // https://router.vuejs.org/zh/guide/advanced/scroll-behavior.html
  scrollBehavior() {
    // return 期望滚动到哪个的位置
    return { top: 0 }
  }
})

// 导出路由实例
export default router
