/**
 * @description blog
 */
const xss = require('xss')
const {
  createBlog,
  getBlogList,
  // getDetail
} = require('../services/blog')
const { SuccessResultModel, FailResultModel } = require('../model/ResultModel')
const { CODE_ENUM } = require('../utils/constant')
const { get } = require('../cache/_redis')
const {
  getCacheBlogList,
  getBlogInfo
} = require('../cache/blog')

/**
 * @description 新建博客
 * @param {string} content
 * @param {string} image 
 */
async function create({ content, image, title }) {
  const userInfo = await get('userInfo')
  const userId = userInfo.userId
  try {
    await createBlog({
      userId,
      content,
      title: xss(title),
      image
    })
    return new SuccessResultModel()
  } catch (err) {
    console.error(err.message, err.stack)
    return new FailResultModel(CODE_ENUM.FAIL)
  }
}
/**
 * @description 获取首页博客
 * @param {number} pageIndex
 * @param {number} pageSize 
 */
async function getBlogs({ pageIndex, pageSize }) {
  try {
    const result = await getCacheBlogList({
      pageIndex,
      pageSize
    })
    return new SuccessResultModel(result)
  } catch (err) {
    console.error(err.message, err.stack)
    return new FailResultModel(CODE_ENUM.FAIL)
  }
}

/**
 * @description 获取我的博客
 * @param {number} pageIndex
 * @param {number} pageSize 
 */
async function getMyBlogs({ pageIndex, pageSize }) {
  const info = await get('userInfo')
  const userName = info.userName
  try {
    const result = await getBlogList({
      pageIndex,
      pageSize,
      userName
    })
    return new SuccessResultModel(result)
  } catch (err) {
    console.error(err.message, err.stack)
    return new FailResultModel(CODE_ENUM.FAIL)
  }
}

/**
 * 获取详情controller
 * @param {string} id 
 */
async function getBlogDetail({id, userId}) {
  try {
    // const result = await getDetail({id, userId})
    const result = await getBlogInfo({ id, userId })
    if (!result) {
      return new FailResultModel(CODE_ENUM.FAIL)
    }
    return new SuccessResultModel(result)
  } catch (err) {
    console.error(err.message, err.stack)
    return new FailResultModel(CODE_ENUM.FAIL)
  }
}

module.exports = {
  create,
  getBlogs,
  getMyBlogs,
  getBlogDetail
}