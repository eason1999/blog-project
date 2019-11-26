/**
 * @description  数据模型
 */
const seq = require('../seq')
const { INTEGER } = require('../type')

const UserRelation = seq.define('userRelation', {
  userId: {
    type: INTEGER,
    allowNull: false,
    comment: '用户ID'
  },
  followId: {
    type: INTEGER,
    allowNull: false,
    comment: '被关注用户ID'
  }
})

module.exports = UserRelation