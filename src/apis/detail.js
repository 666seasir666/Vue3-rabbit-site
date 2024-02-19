// 导入 'request' 模块
import request from '@/utils/require'

export const getDetail = (id) => {
  return request({
    url: '/goods',
    params: {
      id
    }
  })
}
