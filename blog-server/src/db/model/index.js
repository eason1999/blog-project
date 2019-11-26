/**
 * @description 数据模型统一输出 出口
 */

const User = require('./user')
const Blog = require('./blog')
const UserRelation = require('./userRelation')
const BlogRelation = require('./BlogRelation')

/**
 * 创建外键关联
 */
// 博客与用户关联
Blog.belongsTo(User, {
  foreignKey: 'userId'
})

// 用户关注用户
UserRelation.belongsTo(User, {
  foreignKey: 'followId'
})
User.hasMany(UserRelation, {
  foreignKey: 'userId'
})

// 用户收藏文章
BlogRelation.belongsTo(User, {
  foreignKey: 'contentId'
})
User.hasMany(BlogRelation, {
  foreignKey: 'userId'
})

module.exports = {
  User,
  Blog,
  UserRelation,
  BlogRelation
}