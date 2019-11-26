/**
 * @description blog service
 */

const { Blog, User } = require('../db/model')
const { formatBlog } = require('./_format')
const { INIT_CONTENT_IMAGE } = require('../utils/constant')

/**
 * @description 写博客
 * @param {string} content
 * @param {string} userId
 * @param {string} image
 */
async function createBlog({ content, userId, image, title }) {
  const result = await Blog.create({
    userId,
    title,
    content,
    image: image ? image : INIT_CONTENT_IMAGE
  })
  return result.dataValues
}
/**
 * @description 获取博客列表
 * @param {number} pageIndex
 * @param {number} pageSize
 * @param {string} userName
 */
async function getBlogList({ pageIndex = 1, pageSize = 15, userName = null }) {
  let whereObj = {}
  if (userName) {
    whereObj.userName = userName
  }
  const result = await Blog.findAndCountAll({
    offset: pageSize * (pageIndex - 1),
    limit: pageSize,
    order: [
      ['id', 'desc']
    ],
    include: [
      {
        model: User,
        attributes: ['userName', 'avatar'],
        where: whereObj
      }
    ]
  })

  const count = result.count
  const blogList = result.rows.map(item => {
    const blog = item.dataValues
    blog.user = blog.user.dataValues
    return blog
  })
  return {
    count,
    pageSize,
    pageIndex,
    blogList: formatBlog(blogList)
  }
}


module.exports = {
  createBlog,
  getBlogList
}