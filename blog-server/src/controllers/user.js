/**
 * @description user controller
 */
const jwt = require('jsonwebtoken')
const {
  getUserInfo,
  createUser,
  updateUser
} = require('../services/user')
const { SuccessResultModel, FailResultModel } = require('../model/ResultModel')
const { CODE_ENUM, JWT_SECRET } = require('../utils/constant')
const doCrypto = require('../utils/cryp')
const { set, get, del } = require('../cache/_redis')

 /**
  * 用户名是否存在
  * @param {string} userName 
  */
async function isExist(userName) {
  // 业务逻辑处理，server数据处理
  const userInfo = await getUserInfo(userName)
  if (userInfo) {
    return new FailResultModel(CODE_ENUM.EXIST_USER)
  }
  return new SuccessResultModel(userInfo)
}

/**
 * 处理注册逻辑
 * @param {string} userName 
 * @param {string} password 
 * @param {string} newPassword 
 * @param {string} telephone 
 * @param {number} gender (0 女 1 男 2 保密) 
 */
async function register({ userName, password, newPassword, telephone, gender, avatar, tag }) {
  // const userInfo = await getUserInfo({ userName })
  const userInfo = await get('userInfo')
  console.log(userInfo, 'register info')
  if (userInfo) {
    return new FailResultModel(CODE_ENUM.EXIST_USER)
  }
  // 注册 service
  try {
    await createUser({
      userName,
      password: doCrypto(password),
      telephone,
      gender: gender || 2,
      avatar,
      tag
    })
    // console.log(result, 998877)
    // const token = jwt.sign({
    //   userName: result.userName,
    //   userId: result.id
    // }, JWT_SECRET, { expiresIn: '1h' })
    // set('token', token)
    return new SuccessResultModel()
  } catch(err) {
    console.log(err, 988)
    console.error(err.message, err.stack)
    return new FailResultModel(CODE_ENUM.FAIL)
  }
}

/**
 * 登录
 * @param {object} ctx
 * @param {string} userName
 * @param {string} password
 */
async function login({ ctx, userName, password }) {
  const userInfo = await getUserInfo({
    userName,
    password: doCrypto(password)
  })
  console.log(userInfo, 9988)
  if (!userInfo) {
    // 登录失败
    return new FailResultModel(CODE_ENUM.FAIL)
  }
  // 登录成功 session 存储用户信息
  // if (!ctx.session.userInfo) {
  //   ctx.session.userInfo = userInfo
  // }
  const redisUserInfo = await get('userInfo')
  if (!redisUserInfo) {
    await set('userInfo', userInfo)
  }
  const token = jwt.sign({
    userName,
    userId: userInfo.id
  }, JWT_SECRET, { expiresIn: '1h' })
  await set('token', token)
  return new SuccessResultModel({
    token
  })
}

/**
 * 修改信息
 * @param {object} ctx 
 * @param {object} param1 修改参数
 */
async function changeInfo(ctx, {
  newUserName,
  newGender,
  newAvatar,
  newTelephone
}) {
  // const { userName } = ctx.session.userInfo
  let userInfo = await get('userInfo')
  const userName = userInfo.userName
  const result = await updateUser({
    newUserName,
    newGender,
    newAvatar,
    newTelephone
  }, {
    userName
  })

  if (result) {
    // 更新session info
    Object.assign(userInfo, {
      userName: newUserName,
      gender: newGender,
      avatar: newAvatar,
      telephone: newTelephone
    })
    await set('userInfo', userInfo)
    return new SuccessResultModel(userInfo)
  }
  return new FailResultModel(CODE_ENUM.FAIL_UPDATE_INFO)
}

/**
 * 修改密码
 * @param {string} userName
 * @param {string} password
 * @param {string} newPassword 
 */
async function changePsd({ password, newPassword }) {
  const userInfo = await get('token')
  const userName = userInfo.userName
  const result = await updateUser({
    newPassword: doCrypto(newPassword)
  }, {
    userName,
    password: doCrypto(password)
  })
  if (result) {
    return new SuccessResultModel()
  }
  return new FailResultModel(CODE_ENUM.FAIL_UPDATE_PSD)
}

/**
 * 退出
 * @param {object} ctx 
 */
async function loginout(ctx) {
  // delete ctx.session.userInfo
  // await set('token', null)
  // await set('userInfo', null)
  await del('token')
  await del('userInfo')
  return new SuccessResultModel()
}

async function getInfo() {
  const info = await get('userInfo')
  const userName = info.userName
  const userInfo = await getUserInfo({
    userName
  })
  if (userInfo) {
    return new SuccessResultModel({ userInfo })
  }
  return new FailResultModel(CODE_ENUM.TIMEOUT)
}

module.exports = {
  isExist,
  register,
  login,
  changeInfo,
  changePsd,
  loginout,
  getInfo
}