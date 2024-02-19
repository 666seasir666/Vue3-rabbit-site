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

/**
 * @description: 获取二级分类列表数据
 * @param {*} id 分类id
 * @return {*}
 */

export const getCategoryFilterAPI = (id) => {
  return request({
    url: '/category/sub/filter',
    params: {
      id
    }
  })
}
