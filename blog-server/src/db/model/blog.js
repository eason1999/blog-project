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
  content: {
    type: TEXT,
    allowNull: false,
    comment: '内容'
  },
  image: {
    type: STRING,
    comment: '封面图'
  }
})

module.exports = Blog