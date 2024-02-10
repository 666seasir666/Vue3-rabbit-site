// 导入 'request' 模块
import request from '@/utils/require'

// 导出一个函数，用于获取面包屑导航分类信息
export function getCategoryAPI(id) {
  // 发起请求，获取分类信息
  return request({
    // 请求地址
    url: '/category',
    // 请求参数
    params: {
      id
    }
  })
}
