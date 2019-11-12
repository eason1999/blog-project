/**
 * @description user service
 */

const { User } = require('../db/model')
const { formatUser } = require('./_format')

/**
 * 获取用户信息
 * @param {string} userName 
 * @param {string} password 
 */
async function getUserInfo(userName, password) {
  let whereObj = {
    userName
  }
  if (password) {
    Object.assign(whereObj, { password })
  }
  const result = await User.findOne({
    attributes: ['userName', 'nickName', 'avatar', 'gender', 'city'],
    where: whereObj
  })

  if (result === null) {
    return result
  }

  const formatData = formatUser(result.dataValues)
  return formatData
}

module.exports = {
  getUserInfo
}