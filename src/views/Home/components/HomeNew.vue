<script setup>
import { ref, onMounted } from 'vue'
// 引入homePanel组件
import HomePanel from './HomePanel.vue'

// 引入getFloorAPI函数
import { getFloorAPI } from '@/apis/home'

const newList = ref([])

// 异步获取新鲜好物列表
const getNewList = async () => {
  // 调用接口获取新鲜好物列表
  const res = await getFloorAPI()
  // 将新鲜好物列表赋值给newList
  newList.value = res.result
}

// 当组件加载完成时，调用getNewList函数
onMounted(() => getNewList())
</script>

<template>
  <homePanel Title="新鲜好物" SubTitle="新鲜出炉 品质靠谱">
    <ul class="goods-list">
      <li v-for="item in newList" :key="item.id">
        <RouterLink to="/">
          <img :src="item.picture" alt="" />
          <p class="name">{{ item.name }}</p>
          <p class="price">&yen;{{ item.price }}</p>
        </RouterLink>
      </li>
    </ul>
  </homePanel>
</template>

<style scoped lang="scss">
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 406px;

  li {
    width: 306px;
    height: 406px;

    background: #f0f9f4;
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
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }

    .price {
      color: $priceColor;
    }
  }
}
</style>
