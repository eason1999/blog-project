/**
 * @description 数据格式化处理
 */
const { INIT_AVATAR } = require('../utils/constant')

/**
 * 内部方法
 * @param {object} obj 用户对象
 */
function _formatUserAvatar(obj) {
  if (obj.avatar === null) {
    obj.avatar = INIT_AVATAR
  }
  return obj
}

/**
 * 数据库查询到的数据
 * @param {object|array} data 
 */
function formatUser(data) {
  if (data instanceof Array) {
    return data.map(_formatUserAvatar)
  }
  return _formatUserAvatar(data)
}

module.exports = {
  formatUser
}