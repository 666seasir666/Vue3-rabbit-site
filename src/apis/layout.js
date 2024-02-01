// 引入名为instance的网络请求工具
import instance from '@/utils/require'

// 获取-全部分类(包含推荐商品)
export function getCategoryAPI() {
  return instance({
    // 接口地址https://apifox.com/apidoc/shared-c05cb8d7-e591-4d9c-aff8-11065a0ec1de/api-67132163
    url: '/home/category/head'
  })
}
