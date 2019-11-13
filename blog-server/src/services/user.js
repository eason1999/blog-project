/**
 * @description user service
 */

const { User } = require('../db/model')
const { formatUser } = require('./_format')
const { INIT_AVATAR } = require('../utils/constant')

/**
 * 获取用户信息
 * @param {string} userName 
 * @param {string} password 
 */
async function getUserInfo({ userName, password }) {
  let whereObj = {
    userName
  }
  if (password) {
    Object.assign(whereObj, { password })
  }
  const result = await User.findOne({
    attributes: ['userName', 'telephone', 'avatar', 'gender'],
    where: whereObj
  })

  if (result === null) {
    return result
  }

  const formatData = formatUser(result.dataValues)
  return formatData
}

/**
 * 数据处理
 * @param {string} userName 
 * @param {string} password 
 * @param {string} rePass 
 * @param {string} telephone 
 * @param {number} gender (0 女 1 男 2 保密) 
 */
async function createUser({ userName, password, telephone, gender = 3, avatar }) {
  const result = await User.create({
    userName,
    password,
    telephone,
    gender,
    avatar: avatar ? avatar : INIT_AVATAR
  })
  return result.dataValues
}

module.exports = {
  getUserInfo,
  createUser
}