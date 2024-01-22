import require from '@/utils/require.js'

export function getCategoryAPI() {
  return require({
    url: 'home/category/head'
  })
}
