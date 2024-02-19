<script setup>
import { ref, onMounted } from 'vue'
import { getCategoryFilterAPI, getSubCategoryAPI } from '@/apis/category'
import { useRoute } from 'vue-router'
import GoodsItem from '@/views/Home/components/GoodsItem.vue'

// 获取面包屑导航数据
const categoryData = ref({})
const route = useRoute()
const getCategoryData = async () => {
  const res = await getCategoryFilterAPI(route.params.id)
  categoryData.value = res.result
}
onMounted(() => getCategoryData())

// 获取基础列表数据渲染
const goodList = ref([]) // 用于存储商品列表的响应式变量
const reqData = ref({
  categoryId: route.params.id, // 请求参数，通常是从路由参数中获取
  page: 1, // 当前页码
  pageSize: 20, // 每页显示数量
  sortField: 'publishTime' //按照时间排序
})

// 异步函数：获取商品列表数据
const getgoodList = async () => {
  const res = await getSubCategoryAPI(reqData.value)
  goodList.value = res.result.items // 更新商品列表
}
onMounted(() => getgoodList()) // 组件挂载时触发获取商品列表数据

// tab切换数据筛选
const tabChange = () => {
  reqData.value.paye = 1 //初始化当前页数为第一页
  getgoodList() // 重新获取商品列表数据
}

// 定义禁止加载
const disabled = ref(false)
// 限滚动加载更多数据
const load = async () => {
  reqData.value.page++ // 获取下一页数据
  const res = await getSubCategoryAPI(reqData.value)
  goodList.value = [...goodList.value, ...res.result.items] // 合并新数据到原数组中
  // 判断是否还有下一页数据，如果没有禁止加载数据
  if (res.result.items.length === 0) {
    disabled.value = true
  }
}
</script>

<template>
  <div class="container">
    <!-- 面包屑 -->
    <div class="bread-container">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: `/category/${categoryData.parentId}` }"
          >{{ categoryData.parentName }}
        </el-breadcrumb-item>
        <el-breadcrumb-item>{{ categoryData.name }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="sub-container">
      <el-tabs v-model="reqData.sortField" @tab-change="tabChange">
        <!-- 注意！ -->
        <!-- name="publishTime"  name="orderNum"  name="evaluateNum"  按照接口文档来写！ -->
        <el-tab-pane label="最新商品" name="publishTime"></el-tab-pane>
        <el-tab-pane label="最高人气" name="orderNum"></el-tab-pane>
        <el-tab-pane label="评论最多" name="evaluateNum"></el-tab-pane>
      </el-tabs>
      <!-- Infinite Scroll 无限滚动 -->
      <div
        class="body"
        v-infinite-scroll="load"
        :infinite-scroll-disabled="disabled"
      >
        <!-- 商品列表-->
        <GoodsItem v-for="goods in goodList" :goods="goods" :key="goods.id" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.bread-container {
  padding: 25px 0;
  color: #666;
}

.sub-container {
  padding: 20px 10px;
  background-color: #fff;

  .body {
    display: flex;
    flex-wrap: wrap;
    padding: 0 10px;
  }

  .goods-item {
    display: block;
    width: 220px;
    margin-right: 20px;
    padding: 20px 30px;
    text-align: center;

    img {
      width: 160px;
      height: 160px;
    }

    p {
      padding-top: 10px;
    }

    .name {
      font-size: 16px;
    }

    .desc {
      color: #999;
      height: 29px;
    }

    .price {
      color: $priceColor;
      font-size: 20px;
    }
  }

  .pagination-container {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }
}
</style>
