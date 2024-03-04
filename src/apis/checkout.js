// 导入 'request' 模块
import request from '@/utils/require'

// 生成-订单(结算页)
export const getCheckInfoAPI = () => {
  return request({
    url: '/member/order/pre'
  })
}

// 提交-订单
export const submitOrderAPI = (data) => {
  return request({
    url: '/member/order',
    method: 'POST',
    data
  })
}
