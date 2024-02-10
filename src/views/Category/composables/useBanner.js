import { ref, onMounted } from 'vue'

// 从 @/apis/home 文件中导入 getBannerAPI 方法
import { getBannerAPI } from '@/apis/home'

export function useBanner() {
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
  return {
    BannerList
  }
}
