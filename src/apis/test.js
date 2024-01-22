import require from '@/utils/require'

export function getCategoryAPI() {
  return require({
    url: 'home/category/head'
  })
}
