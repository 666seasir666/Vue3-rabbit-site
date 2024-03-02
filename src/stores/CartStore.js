// 封装购物车模块

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useUserStore } from '@/stores/UserStore.js'
import {
  insertCartAPI,
  findNewCartListAPI,
  deleteCartAPI
} from '@/apis/cart.js'
// import { useRouter } from 'vue-router'

export const useCartStore = defineStore(
  'cart',
  () => {
    // const router = useRouter() // 获取路由对象
    const userStore = useUserStore() //获取用户数据
    const isLogin = computed(() => userStore.userInfo.token) //获取用户token
    // 1. 定义state - cartList
    const cartList = ref([])

    //封装最新购物车列表函数
    const updateNewList = async () => {
      const res = await findNewCartListAPI() //获取最新购物车列表
      cartList.value = res.result //更新覆盖本地购物车列表
    }

    // 2. 定义action - addCart
    const addCart = async (goods) => {
      const { skuId, count } = goods
      if (isLogin.value) {
        // 登录之后加入购物车的逻辑
        await insertCartAPI({ skuId, count }) //加入购物车接口调用
        updateNewList()
      } else {
        // 未登录状态，跳转到登录页面
        //   ElMessageBox.confirm('您还未登录，是否前往登录页面?', '提示', {
        //     confirmButtonText: '前往登录',
        //     cancelButtonText: '取消',
        //     type: 'warning',
        //     showClose: false // 隐藏关闭按钮
        //   })
        //     .then(() => {
        //       // 用户点击确认，跳转到登录页面
        //       router.push('/login')
        //     })
        //     .catch(() => {
        //       // 用户点击取消，不执行任何操作
        //     })
        // }

        // 未登录加入购物车的逻辑
        // 添加购物车操作
        // 已添加过 - count + 1
        // 没有添加过 - 直接push
        // 思路：通过匹配传递过来的商品对象中的skuId能不能在cartList中找到，找到了就是添加过

        // 在购物车列表 (cartList) 中查找具有与给定商品 (goods) 相同 skuId 的元素，并将结果存储在 item 变量中。
        // 如果找到相符的元素，item 将包含该元素的值；如果未找到，item 将为 undefined。
        const item = cartList.value.find((item) => goods.skuId === item.skuId)
        if (item) {
          // 找到了
          item.count++
        } else {
          // 没找到
          cartList.value.push(goods)
        }
      }
    }
    // 删除购物车
    const confirmDialogConfig = {
      title: '确定删除该商品吗?',
      message: '警告',
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
      draggable: true // 是否可以拖拽
    }

    const delCart = async (skuId) => {
      // 弹出确认框
      const confirmResult = await ElMessageBox.confirm(
        confirmDialogConfig.title,
        confirmDialogConfig.message,
        {
          confirmButtonText: confirmDialogConfig.confirmButtonText,
          cancelButtonText: confirmDialogConfig.cancelButtonText,
          type: confirmDialogConfig.type,
          draggable: confirmDialogConfig.draggable
        }
      )

      if (confirmResult) {
        if (isLogin.value) {
          // 在用户已登录状态下，执行删除购物车接口
          await deleteCartAPI([skuId])
          updateNewList()
        } else {
          // 在用户未登录状态下，直接删除本地购物车
          const idx = cartList.value.findIndex((item) => skuId === item.skuId)
          cartList.value.splice(idx, 1)
        }

        ElMessage({
          type: 'success',
          message: '删除商品成功'
        })
      } else {
        // 用户点击取消时，不执行删除商品的逻辑
        ElMessage({
          type: 'info',
          message: '取消删除商品'
        })
      }
    }

    // 清除登录状态购物车列表
    const clearCart = async () => {
      cartList.value = []
    }
    // 计算属性
    // 1.总的数量，所有项的count相加
    const allCount = computed(() =>
      cartList.value.reduce((p, c) => p + c.count, 0)
    )
    // 2.总价 所有项的count * price之和
    const allPrice = computed(() =>
      cartList.value.reduce((p, c) => p + c.count * c.price, 0)
    )
    // 3.已选数量
    const selectedCount = computed(() =>
      cartList.value
        .filter((item) => item.selected)
        .reduce((p, c) => p + c.count, 0)
    )
    // 4.已选择商品价格合计
    const selectedPrice = computed(() =>
      cartList.value
        .filter((item) => item.selected)
        .reduce((p, c) => p + c.count * c.price, 0)
    )
    // 购物车单选功能
    const singleCheck = (skuId, selected) => {
      // 通过skuId找到要修改的项，把selected修改为传过来的selected
      const item = cartList.value.find((item) => skuId === item.skuId)
      item.selected = selected
    }
    // 购物车全选功能
    const allCheck = (selected) => {
      cartList.value.forEach((item) => (item.selected = selected))
    }
    // 是否全选
    const isAll = computed(() => cartList.value.every((item) => item.selected))
    return {
      cartList,
      updateNewList,
      addCart,
      delCart,
      clearCart,
      allCount,
      allPrice,
      selectedCount,
      selectedPrice,
      singleCheck,
      allCheck,
      isAll
    }
  },
  {
    persist: true
  }
)
