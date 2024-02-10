// 引入名为instance的网络请求工具
import instance from '@/utils/require'

// 导出一个函数，用于获取banner接口
export function getBannerAPI(params = {}) {
  // 广告区域展示位置（投放位置 投放位置，1为首页，2为分类商品页） 默认是1
  const { distributionSite = '1' } = params
  // 返回一个实例，参数为一个对象，包含接口地址
  return instance({
    // 接口地址：https://apifox.com/apidoc/shared-c05cb8d7-e591-4d9c-aff8-11065a0ec1de/api-67132166
    url: 'home/banner',
    params: {
      distributionSite
    }
  })
}

// 导出一个函数，用于获取新鲜好物API
export function getFloorAPI() {
  // 返回一个实例，url为/home/new
  return instance({
    // 接口地址：https://apifox.com/apidoc/shared-c05cb8d7-e591-4d9c-aff8-11065a0ec1de/api-67132167
    url: '/home/new'
  })
}

export function getHotAPI() {
  // 返回一个实例，url为/home/new
  return instance({
    // 接口地址：https://apifox.com/apidoc/shared-c05cb8d7-e591-4d9c-aff8-11065a0ec1de/api-67132164
    url: '/home/hot'
  })
}

/**
 * @description: 获取所有商品模块
 * @param {*}
 * @return {*}
 */
export const getGoodsAPI = () => {
  return instance({
    url: '/home/goods'
  })
}
