/**
 * @description 首页blog缓存
 */

const { Blog, User } = require('../db/model')
const { set, get, incr } = require('./_redis')
const { formatBlog } = require('../services/_format')
const { getBlogList, getDetail } = require('../services/blog')
const {
  CHECK_KEY_PREFIX,
  LIST_KEY_PREFIX
} = require('../utils/constant')

/**
 * 首页blog list 获取
 * @param {number} pageIndex
 * @param {number} pageSize
 */
async function getCacheBlogList({ pageIndex, pageSize }) {
  const key = `${LIST_KEY_PREFIX}_${pageSize}_${pageIndex}`
  let result = await get(key)
  if (result !== null) {
    return result
  }
  result = await getBlogList({ pageIndex, pageSize })
  await set(key, result, 60)
  return result
}

/**
 * blog详情
 * @param {string} id
 * @param {string} userId 
 */
async function _getCacheCount({ id, userId }) {
  // 访问计数
  const checkKey = `${CHECK_KEY_PREFIX}_${id}_${userId}`
  const checkNum = await get(checkKey)

  if (checkNum === null) {
    const result = await getDetail({ id, userId })
    await set(checkKey, result.check, 30 * 60)
  }
  console.log(checkKey, 7777)
  incr(checkKey)

  const check = await get(checkKey)

  return check
}

/**
 * 获取博客详情
 * @param {string} id 
 */
async function getBlogInfo({id, userId}) {
  const whereObj = {
    id: userId
  }
  const result = await Blog.findOne({
    where: {
      id
    },
    include: [{
      model: User,
      attributes: ['userName', 'avatar', 'tag'],
      where: whereObj
    }]
  })
  if (!result) {
    return result
  }
  const blogInfo = result.dataValues
  const check = await _getCacheCount({ id, userId })

  blogInfo.check = check
  const res = formatBlog([blogInfo])
  return res[0]
}

module.exports = {
  getCacheBlogList,
  getBlogInfo
}