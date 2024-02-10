<script setup>
import { ref, onMounted } from 'vue'
// 导入面包屑导航分类接口
import { getCategoryAPI } from '@/apis/category'

// 导入路由模块
import { useRoute, onBeforeRouteUpdate } from 'vue-router'

// 从 @/apis/home 文件中导入 getBannerAPI 方法
import { getBannerAPI } from '@/apis/home'

import GoodsItem from '../Home/components/GoodsItem.vue'

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

// 获取banner数据
const BannerList = ref([])
// 声明一个函数getBanner，用于获取banner列表
const getBanner = async () => {
  // 调用getBannerAPI接口，获取banner列表
  const res = await getBannerAPI({
    distributionSite: '2'
  })
  // 将获取到的banner列表赋值给BannerList
  BannerList.value = res.result
}
// 当组件加载完毕时，调用getBanner函数
onMounted(() => getBanner())
</script>

<template>
  <div class="top-category">
    <div class="container m-top-20">
      <!-- 面包屑 -->
      <div class="bread-container">
        <el-breadcrumb separator=">">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{ categoryData.name }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- 轮播图 -->
      <div class="home-banner">
        <el-carousel height="500px">
          <el-carousel-item v-for="item in BannerList" :key="item.id">
            <img :src="item.imgUrl" alt="" />
          </el-carousel-item>
        </el-carousel>
      </div>
      <!-- 一级分类>所有分类 -->
      <div class="sub-list">
        <h3>全部分类</h3>
        <ul>
          <li v-for="i in categoryData.children" :key="i.id">
            <RouterLink to="/">
              <img :src="i.picture" />
              <p>{{ i.name }}</p>
            </RouterLink>
          </li>
        </ul>
      </div>
      <!-- 居家生活用品 -->
      <div
        class="ref-goods"
        v-for="item in categoryData.children"
        :key="item.id"
      >
        <div class="head">
          <h3>- {{ item.name }}-</h3>
        </div>
        <div class="body">
          <GoodsItem v-for="good in item.goods" :goods="good" :key="good.id" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.top-category {
  h3 {
    font-size: 28px;
    color: #666;
    font-weight: normal;
    text-align: center;
    line-height: 100px;
  }

  .sub-list {
    margin-top: 20px;
    background-color: #fff;

    ul {
      display: flex;
      padding: 0 32px;
      flex-wrap: wrap;

      li {
        width: 168px;
        height: 160px;

        a {
          text-align: center;
          display: block;
          font-size: 16px;

          img {
            width: 100px;
            height: 100px;
          }

          p {
            line-height: 40px;
          }

          &:hover {
            color: $xtxColor;
          }
        }
      }
    }
  }

  .ref-goods {
    background-color: #fff;
    margin-top: 20px;
    position: relative;

    .head {
      .xtx-more {
        position: absolute;
        top: 20px;
        right: 20px;
      }

      .tag {
        text-align: center;
        color: #999;
        font-size: 20px;
        position: relative;
        top: -20px;
      }
    }

    .body {
      display: flex;
      justify-content: space-around;
      padding: 0 40px 30px;
    }
  }

  .bread-container {
    padding: 25px 0;
  }
}

.home-banner {
  width: 1240px;
  height: 500px;
  margin: 0 auto;

  img {
    width: 100%;
    height: 500px;
  }
}
</style>
