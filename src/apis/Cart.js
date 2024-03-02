// 封装购物车接口

// 导入 'request' 模块
import request from '@/utils/require'

// 加入购物车
// 接口地址:https://apifox.com/apidoc/shared-c05cb8d7-e591-4d9c-aff8-11065a0ec1de/api-67132149
export const insertCartAPI = ({ skuId, count }) => {
  return request({
    url: '/member/cart',
    method: 'POST',
    data: {
      skuId,
      count
    }
  })
}

// 获取-购物车列表
// 接口地址:https://apifox.com/apidoc/shared-c05cb8d7-e591-4d9c-aff8-11065a0ec1de/api-67132150
export const findNewCartListAPI = () => {
  return request({
    url: '/member/cart'
  })
}
