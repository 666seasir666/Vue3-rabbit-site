// 导入 'request' 模块
import request from '@/utils/require'

/*
params: {
	orderState:0,
  page:1,
  pageSize:2
}
*/

export const getUserOrder = (params) => {
  return request({
    url: '/member/order',
    method: 'GET',
    params
  })
}
