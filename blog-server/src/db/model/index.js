/**
 * @description 数据模型统一输出 出口
 */

const User = require('./user')
const Blog = require('./blog')

/**
 * 创建外键关联
 */

Blog.belongsTo(User, {
  foreignKey: 'userId'
})

module.exports = {
  User,
  Blog
}