// 引入名为instance的网络请求工具
import instance from '@/utils/require'

export function getBannerAPI() {
  return instance({
    // 接口地址：https://apifox.com/apidoc/shared-c05cb8d7-e591-4d9c-aff8-11065a0ec1de/api-67132166
    url: 'home/banner'
  })
}
