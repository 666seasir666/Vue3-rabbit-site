<script setup>
import HomeCategory from './components/HomeCategory.vue'
import HomeBanner from './components/HomeBanner.vue'
import HomeNew from './components/HomeNew.vue'
import HomeHot from './components/HomeHot.vue'
import homeProduct from './components/HomeProduct.vue'
// import homePanel from './components/homePanel.vue'
</script>

<template>
  <div class="container">
    <HomeCategory />
    <HomeBanner />
  </div>
  <HomeNew />
  <HomeHot />
  <homeProduct />
  <!-- <homePanel Title="新鲜好物" SubTitle="新鲜出炉 品质靠谱"></homePanel>
  <homePanel Title="人气推荐" SubTitle="人气爆款 不容错过"></homePanel> -->
</template>
