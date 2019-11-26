/**
 * @description blog 数据模型
 */
const seq = require('../seq')
const { INTEGER, STRING, TEXT } = require('../type')

const Blog = seq.define('Blog', {
  userId: {
    type: INTEGER,
    allowNull: false,
    comment: '用户ID'
  },
  title: {
    type: STRING,
    allowNull: false,
    comment: '标题'
  },
  content: {
    type: TEXT,
    allowNull: false,
    comment: '内容'
  },
  image: {
    type: STRING,
    comment: '封面图',
  },
  like: {
    type: INTEGER,
    content: '点赞数'
  },
  collect: {
    type: INTEGER,
    content: '收藏数'
  },
  comment: {
    type: INTEGER,
    content: '评论数'
  }
})

module.exports = Blog