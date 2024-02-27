// 封装购物车模块

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

export const useCartStore = defineStore(
  'cart',
  () => {
    // 1. 定义state - cartList
    const cartList = ref([])
    // 2. 定义action - addCart
    const addCart = (goods) => {
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
    // 删除购物车
    const delCart = async (skuId) => {
      // 找到要删除项的下标值
      const idx = cartList.value.findIndex((item) => skuId === item.skuId)

      // 弹出确认框
      ElMessageBox.confirm('确定删除该商品吗?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        draggable: true // 是否可以拖拽
      })
        .then(() => {
          // 用户点击确定时执行删除商品的逻辑
          cartList.value.splice(idx, 1)

          ElMessage({
            type: 'success',
            message: '删除商品成功'
          })
        })
        .catch(() => {
          // 用户点击取消时，不执行删除商品的逻辑
          ElMessage({
            type: 'info',
            message: '取消删除商品'
          })
        })
    }
    // 计算属性
    const allCount = computed(() =>
      cartList.value.reduce((p, c) => p + c.count, 0)
    )
    const allPrice = computed(() =>
      cartList.value.reduce((p, c) => p + c.count * c.price, 0)
    )
    return {
      cartList,
      addCart,
      delCart,
      allCount,
      allPrice
    }
  },
  {
    persist: true
  }
)
