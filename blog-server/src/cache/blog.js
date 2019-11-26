/**
 * @description 首页blog缓存
 */

const { set, get } = require('./_redis')
const { getBlogList } = require('../services/blog')

const KEY_PREFIX = 'home:blogList:'

async function getCacheBlogList({ pageIndex, pageSize }) {
  const key = `${KEY_PREFIX}_${pageSize}_${pageIndex}`
  let result = await get(key)
  if (result !== null) {
    return result
  }
  result = await getBlogList({ pageIndex, pageSize })
  await set(key, result, 60)
  return result
}

module.exports = {
  getCacheBlogList
}