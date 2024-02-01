// 导入 Vue 3 的 ref 函数用于创建响应式引用
import { ref } from 'vue'

// 导入 Pinia 的 defineStore 函数用于定义状态仓库
import { defineStore } from 'pinia'

// 导入获取分类列表数据的 API 函数
import { getCategoryAPI } from '@/apis/layout'

// 使用 defineStore 创建名为 'category' 的状态仓库
export const useCategoryStore = defineStore('category', () => {
  // 声明一个响应式引用 categoryList，用于存储导航列表数据
  const categoryList = ref([])

  // 声明一个异步函数 getCategory，用于获取分类列表
  const getCategory = async () => {
    try {
      // 调用 getCategoryAPI 函数，发起网络请求获取分类列表
      const res = await getCategoryAPI()

      // 将获取到的分类列表赋值给 categoryList
      categoryList.value = res.result
    } catch (error) {
      // 处理错误，例如记录错误日志或显示错误信息给用户
      console.error('Failed to fetch category data', error)
    }
  }

  // 返回 categoryList 和 getCategory，使其可在组件中使用
  return {
    categoryList,
    getCategory
  }
})
