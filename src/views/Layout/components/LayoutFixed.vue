<script setup>
// 从 @vueuse/core 库中导入 useScroll 函数
import { useScroll } from '@vueuse/core'

// 从 '@/stores/category' 中导入名为 useCategoryStore 的状态仓库
import { useCategoryStore } from '@/stores/categoryStore'

// 使用useScroll函数获取y轴滚动位置
const { y } = useScroll(window)

// 创建名为 categoryStore 的状态仓库实例
const categoryStore = useCategoryStore()
</script>

<template>
  <!-- 根据滚动距离判断当前show类名是否显示，大于78显示，小于78，不显示 -->
  <div class="app-header-sticky" :class="{ show: y > 78 }">
    <div class="container">
      <RouterLink class="logo" to="/" />
      <!-- 导航区域 -->
      <ul class="app-header-nav">
        <!--  v-for 来遍历名为 categoryList 的数组，并为每个 item 设置了唯一的键（key）值 -->
        <li
          class="home"
          v-for="item in categoryStore.categoryList"
          :key="item.id"
        >
          <RouterLink :to="`/category/${item.id}`">{{ item.name }}</RouterLink>
        </li>
      </ul>

      <div class="right">
        <RouterLink to="/">品牌</RouterLink>
        <RouterLink to="/">专题</RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.app-header-sticky {
  width: 100%;
  height: 80px;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  background-color: #fff;
  // 此处为关键样式!!!
  // 状态一：往上平移自身高度 + 完全透明
  transform: translateY(-100%);
  opacity: 0;

  // 状态二：移除平移 + 完全不透明
  &.show {
    transition: all 0.3s linear;
    transform: none;
    opacity: 1;
    background: rgba(255, 255, 255, 0.24);
    backdrop-filter: blur(20px);
  }

  .container {
    display: flex;
    align-items: center;
  }

  .logo {
    width: 200px;
    height: 80px;
    background: url('./assets/images/logo.png') no-repeat right 2px;
    background-size: 160px auto;
  }

  .right {
    width: 220px;
    display: flex;
    text-align: center;
    padding-left: 40px;
    border-left: 2px solid $xtxColor;

    a {
      width: 38px;
      margin-right: 40px;
      font-size: 16px;
      line-height: 1;

      &:hover {
        color: $xtxColor;
      }
    }
  }
}

.app-header-nav {
  width: 820px;
  display: flex;
  padding-left: 40px;
  position: relative;
  z-index: 998;

  li {
    margin-right: 40px;
    width: 38px;
    text-align: center;

    a {
      font-size: 16px;
      line-height: 32px;
      height: 32px;
      display: inline-block;

      &:hover {
        color: $xtxColor;
        border-bottom: 1px solid $xtxColor;
      }
    }

    .active {
      color: $xtxColor;
      border-bottom: 1px solid $xtxColor;
    }
  }
}
</style>
@/stores/categoryStore
