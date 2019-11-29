/**
 * @description user service
 */

const { User, UserRelation } = require('../db/model')
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
    attributes: ['userName', 'id', 'telephone', 'avatar', 'gender', 'tag'],
    where: whereObj
  })
  console.log(result, 999)
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
 * @param {string} avatar 
 * @param {string} telephone 
 * @param {number} gender (0 女 1 男 2 保密) 
 * @param {string} tag (0 开发 1 其他)
 */
async function createUser({ userName, password, telephone, gender = 3, avatar, tag }) {
  const result = await User.create({
    userName,
    password,
    telephone,
    gender,
    avatar: avatar ? avatar : INIT_AVATAR,
    tag: tag ? tag : '1'
  })
  return result.dataValues
}

/**
 * 删除用户
 * @param {string} userName 
 */
async function deleteUser(userName) {
  const result = await User.destroy({
    where: {
      userName
    }
  })
  return result > 0
}

/**
 * 更新信息
 * @param {object} param0 修改的信息
 * @param {object} param1 查询条件
 */
async function updateUser({
  newUserName,
  newGender,
  newAvatar,
  newTelephone,
  newPassword
}, { userName, password }) {
  // 修改obj
  let updateData = {}
  if (newUserName) {
    updateData.userName = newUserName
  }
  if (newGender) {
    updateData.gender = newGender
  }
  if (newTelephone) {
    updateData.telephone = newTelephone
  }
  if (newAvatar) {
    updateData.avatar = newAvatar
  }
  if (newPassword) {
    updateData.password = newPassword
  }
  // 查询obj
  let whereData = {
    userName
  }
  if (password) {
    whereData.password = password
  }
  const result = await User.update(updateData, {
    where: whereData 
  })
  return result[0] > -1
}

/**
 * 获取粉丝列表
 * @param {string} userId 
 */
async function getFansUsers({ userId }) {
  const result = await User.findAndCountAll({
    attributes: ['id', 'userName', 'avatar'],
    order: [
      ['id', 'desc']
    ],
    include: [
      {
        model: UserRelation,
        where: {
          followId: userId
        }
      }
    ]
  })
  const userList = result.rows.map(item => item.dataValues)
  userList = formatUser(userList)
  return {
    count: result.count,
    rows: userList
  }
}

/**
 * 获取关注人列表
 * @param {string} userId 
 */
async function getFollowUsers({ userId }) {
  const result = await UserRelation.findAndCountAll({
    where: {
      userId
    },
    order: [
      ['id', 'desc']
    ],
    include: {
      model: User,
      attributes: ['id', 'userName', 'avatar']
    }
  })
  const userArr = result.rows.map(item => item.dataValues)
  userList = userArr.map(item => {
    item.user = formatUser(item.user.dataValues)
    return item
  })
  return {
    count: result.count,
    rows: userList
  }
}

/**
 * 添加关注
 * @param {string} userId
 * @param {string} followUserId
 */
async function addFollowUser({ userId, followUserId }) {
  const result = await UserRelation.create({
    userId,
    followId: followUserId
  })
  return result.dataValues
}

/**
 * 取消关注
 * @param {string} userId
 * @param {string} followUserId
 */
async function delFollowUser({ userId, followUserId }) {
  const result = await UserRelation.destroy({
    where: {
      userId,
      followId: followUserId
    }
  })
  return result > 0
}

module.exports = {
  getUserInfo,
  createUser,
  deleteUser,
  updateUser,
  getFansUsers,
  getFollowUsers,
  delFollowUser,
  addFollowUser
}