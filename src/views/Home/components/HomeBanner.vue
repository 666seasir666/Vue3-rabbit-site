<script setup>
// 从 Vue.js 中导入 ref 和 onMounted 方法。用于创建一个响应式的变量
import { ref, onMounted } from 'vue'

// 从 @/apis/home 文件中导入 getBannerAPI 方法
import { getBannerAPI } from '@/apis/home'

// 声明一个变量BannerList，并将其赋值为一个ref对象
const BannerList = ref([])
// 声明一个函数getBanner，用于获取banner列表
const getBanner = async () => {
  // 调用getBannerAPI接口，获取banner列表
  const res = await getBannerAPI()
  // 将获取到的banner列表赋值给BannerList
  BannerList.value = res.result
}

// 当组件加载完毕时，调用getBanner函数
onMounted(() => getBanner())
</script>

<template>
  <div class="home-banner">
    <el-carousel height="500px">
      <el-carousel-item v-for="item in BannerList" :key="item.id">
        <img :src="item.imgUrl" alt="" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<style scoped lang="scss">
.home-banner {
  width: 1240px;
  height: 500px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 98;

  img {
    width: 100%;
    height: 500px;
  }
}

::v-deep .el-carousel__arrow--left {
  left: calc(250px + 16px);
}
</style>
