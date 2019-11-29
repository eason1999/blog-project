/**
 * @description blog service
 */

const { Blog, User } = require('../db/model')
const { formatBlog } = require('./_format')
const { INIT_CONTENT_IMAGE } = require('../utils/constant')
// const { getCacheCount } = require('../cache/blog')

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
    image: image ? image : INIT_CONTENT_IMAGE,
    like: 0,
    comment: 0,
    collect: 0,
    check: 0
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

/**
 * 获取博客详情
 * @param {string} id 
 */
async function getDetail({id, userId}) {
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
  const res = formatBlog([blogInfo])
  return res[0]
}


module.exports = {
  createBlog,
  getBlogList,
  getDetail
}