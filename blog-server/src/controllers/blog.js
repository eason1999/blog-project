/**
 * @description blog
 */
const xss = require('xss')
const { createBlog } = require('../services/blog')
const { SuccessResultModel, FailResultModel } = require('../model/ResultModel')
const { CODE_ENUM } = require('../utils/constant')

async function create({ userId, content, image }) {
  try {
    const blog = await createBlog({
      userId,
      content: xss(content),
      image
    })
    return new SuccessResultModel(blog)
  } catch (err) {
    console.log(err.message, err.stack)
    return new FailResultModel(CODE_ENUM.FAIL)
  }
}

module.exports = {
  create
}