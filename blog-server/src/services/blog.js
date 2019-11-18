/**
 * @description blog service
 */

const { Blog } = require('../db/model')
const { INIT_AVATAR } = require('../utils/constant')

async function createBlog({ content, userId, image }) {
  const result = await Blog.create({
    userId,
    content,
    image: image ? image: INIT_AVATAR
  })
  return result.dataValues
}

module.exports = {
  createBlog
}