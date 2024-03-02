// 导入 'request' 模块
import request from '@/utils/require'

// 生成-订单(结算页)
export const getCheckInfoAPI = () => {
  return request({
    url: '/member/order/pre'
  })
}
