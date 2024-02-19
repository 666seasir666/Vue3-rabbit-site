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
 * @description: 获取面包屑二级分类列表数据
 * @param {*} id 分类id
 * @return {*}
 */

// 导出一个函数，用于获取面包屑二级分类列表数据
export const getCategoryFilterAPI = (id) => {
  // 发送请求，url为'/category/sub/filter'，参数为id
  return request({
    url: '/category/sub/filter',
    params: {
      id
    }
  })
}

/**
 * @description: 获取二级分类-基础商品列表导航数据
 * @data { 
     categoryId: 1005000 ,
     page: 1,
     pageSize: 20,
     sortField: 'publishTime' | 'orderNum' | 'evaluateNum'
   } 
 * @return {*}
 */
export const getSubCategoryAPI = (data) => {
  return request({
    url: '/category/goods/temporary',
    method: 'POST',
    data
  })
}
