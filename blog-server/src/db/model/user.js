/**
 * @description 用户数据模型
 */

const seq = require('../seq.js')
const { STRING, DECIMAL } = require('../type.js')

const User = seq.define('user', {
  userName: {
    type: STRING,
    allowNull: false,
    unique: true, // 用户名唯一不重复
    comment: '用户名'
  },
  telephone: {
    type: STRING,
    allowNull: false,
    comment: '手机'
  },
  password: {
    type: STRING,
    allowNull: false,
    comment: '密码'
  },
  gender: {
    type: DECIMAL,
    allowNull: false,
    defaultValue: 2,
    comment: '性别（0 女 1 男 2 保密）'
  },
  avatar: {
    type: STRING,
    comment: '头像'
  },
  tag: {
    type: STRING,
    content: '标签'
  }
})

module.exports = User