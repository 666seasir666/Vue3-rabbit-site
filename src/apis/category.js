import request from '@/utils/require'

export function getCategoryAPI(id) {
  return request({
    url: '/category',
    params: {
      id
    }
  })
}
