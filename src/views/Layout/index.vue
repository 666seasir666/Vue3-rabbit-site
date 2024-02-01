<script setup>
// 导入四个布局组件
import LayoutNav from './components/LayoutNav.vue'
import LayoutHeader from './components/LayoutHeader.vue'
import LayoutFooter from './components/LayoutFooter.vue'
import LayoutFixed from './components/LayoutFixed.vue'

// 导入用于获取导航列表数据的状态仓库
import { useCategoryStore } from '@/stores/category'

// 导入 Vue 3 的 onMounted 函数
import { onMounted } from 'vue'

// 创建并获取名为 'category' 的状态仓库实例
const categoryStore = useCategoryStore()

// 在组件挂载时触发的生命周期钩子
onMounted(() => {
  // 调用状态仓库的 getCategory 函数，获取导航列表数据
  categoryStore.getCategory()
})
</script>

<template>
  <LayoutNav />
  <LayoutHeader />
  <LayoutFooter />
  <LayoutFixed />

  <!-- 路由出口 -->
  <RouterView />
</template>

<style lang="scss" scoped></style>
