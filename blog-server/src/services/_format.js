/**
 * @description 数据格式化处理
 */
const { INIT_AVATAR, INIT_CONTENT_IMAGE } = require('../utils/constant')

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

function _formatBlog(obj) {
  if (obj.like === null) {
    obj.like = 0
  }
  if (obj.collect === null) {
    obj.collect = 0
  }
  if (obj.comment === null) {
    obj.comment = 0
  }
  if (!obj.image) {
    obj.image = INIT_CONTENT_IMAGE
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

/**
 * 格式化预处理blog
 * @param {object|array} data 
 */
function formatBlog(data) {
  if (data instanceof Array) {
    return data.map(_formatBlog)
  }
}

module.exports = {
  formatUser,
  formatBlog
}