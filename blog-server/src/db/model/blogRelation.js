/**
 * @description  数据模型
 */
const seq = require('../seq')
const { INTEGER } = require('../type')

const BlogRelation = seq.define('ulogRelation', {
  userId: {
    type: INTEGER,
    allowNull: false,
    comment: '用户ID'
  },
  contentId: {
    type: INTEGER,
    allowNull: false,
    comment: '文章ID'
  }
})

module.exports = BlogRelation