// 管理用户数据
import { ref } from 'vue'
import { defineStore } from 'pinia'
import { loginAPI } from '@/apis/user.js'
import { useCartStore } from './CartStore.js'
import { mergeCartAPI } from '@/apis/Cart.js'

export const useUserStore = defineStore(
  'user',
  () => {
    const CartStore = useCartStore()
    // 1. 定义管理用户数据的state
    const userInfo = ref({})
    // 2. 定义获取接口数据的action函数
    const getUserInfo = async ({ account, password }) => {
      const res = await loginAPI({ account, password })
      userInfo.value = res.result
      // 合并购物车的操作
      await mergeCartAPI(
        CartStore.cartList.map((item) => {
          return {
            skuId: item.skuId,
            selected: item.selected,
            count: item.count
          }
        })
      )
      // 获取最新购物车列表
      CartStore.updateNewList()
    }

    // 退出时清除用户登录数据
    const clearUserInfo = () => {
      userInfo.value = {}
      CartStore.clearCart()
    }
    // 3. 以对象的格式把state和action return
    return {
      userInfo,
      getUserInfo,
      clearUserInfo
    }
  },
  {
    persist: true
  }
)
