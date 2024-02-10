<script setup>
import { ref, onMounted } from 'vue'
// 引入homePanel组件
import HomePanel from './HomePanel.vue'

// 引入getHotAPI函数
import { getHotAPI } from '@/apis/home'

const hotList = ref([])

// 异步获取人气推荐列表
const getHotList = async () => {
  // 调用接口获取人气推荐列表
  const res = await getHotAPI()
  // 将获取到的人气推荐赋值给hotList
  hotList.value = res.result
}

// 组件加载完成时调用getHotList函数获取热门列表
onMounted(() => getHotList())
</script>

<template>
  <HomePanel Title="人气推荐" SubTitle="人气爆款 不容错过">
    <ul class="goods-list">
      <li v-for="item in hotList" :key="item.id">
        <RouterLink to="/">
          <!-- 【人气爆款 不容错过】列表图片懒加载 -->
          <img v-img-lazy="item.picture" alt="#" />
          <!-- <img :src="item.picture" alt="" /> -->
          <p class="name">{{ item.title }}</p>
          <p class="desc">{{ item.alt }}</p>
        </RouterLink>
      </li>
    </ul>
  </HomePanel>
</template>

<style scoped lang="scss">
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 426px;

  li {
    width: 306px;
    height: 406px;
    transition: all 0.5s;

    &:hover {
      transform: translate3d(0, -3px, 0);
      box-shadow: 0 3px 8px rgb(0 0 0 / 20%);
    }

    img {
      width: 306px;
      height: 306px;
    }

    p {
      font-size: 22px;
      padding-top: 12px;
      text-align: center;
    }

    .desc {
      color: #999;
      font-size: 18px;
    }
  }
}
</style>
