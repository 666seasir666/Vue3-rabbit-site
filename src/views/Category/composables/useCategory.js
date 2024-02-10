import { ref, onMounted } from 'vue'

// 导入面包屑导航分类接口
import { getCategoryAPI } from '@/apis/category'

// 导入路由模块
import { useRoute, onBeforeRouteUpdate } from 'vue-router'

export function useCategory() {
  // 声明一个变量用于存储分类数据
  const categoryData = ref({})
  // 获取当前路由对象
  const route = useRoute()
  // 调用接口异步获取分类类别数据的函数数据
  const getCategory = async (id = route.params.id) => {
    // 调用getCategoryAPI函数，传入id参数，获取分类信息
    const res = await getCategoryAPI(id)
    // 将获取到的面包屑导航分类数据存储到categoryData中
    categoryData.value = res.result
  }
  // 当组件加载完成时调用getCategory函数
  onMounted(() => getCategory())

  onBeforeRouteUpdate((to) => {
    // 根据to参数的id获取分类信息
    getCategory(to.params.id)
  })
  return {
    categoryData
  }
}
