/**
 * @description 路由管理
 */

// 路由注册
const index = require('../routes/index')
const usersDemo = require('../routes/usersDemo')
const user = require('../routes/api/user')
const utils = require('../routes/api/utils')
const createBlog = require('../routes/api/blog')
const errorViewRouter = require('../routes/view/error')

module.exports = {
  index,
  usersDemo,
  user,
  utils,
  createBlog,
  errorViewRouter
}