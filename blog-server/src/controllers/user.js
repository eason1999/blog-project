/**
 * @description user controller
 */
const { getUserInfo, createUser } = require('../services/user')
const { SuccessResultModel, FailResultModel } = require('../model/ResultModel')
const { CODE_ENUM } = require('../utils/constant')
const doCrypto = require('../utils/cryp')

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
 * @param {string} rePass 
 * @param {string} telephone 
 * @param {number} gender (0 女 1 男 2 保密) 
 */
async function register({ userName, password, rePass, telephone, gender, avatar }) {

  const userInfo = await getUserInfo(userName)
  if (userInfo) {
    return new FailResultModel(CODE_ENUM.EXIST_USER)
  }
  // 注册 service
  try {
    await createUser({
      userName,
      password: doCrypto(password),
      telephone,
      gender,
      avatar
    })
    return new SuccessResultModel()
  } catch(err) {
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
  if (!userInfo) {
    // 登录失败
    return new FailResultModel(CODE_ENUM.FAIL)
  }
  // 登录成功 session 存储用户信息
  if (!ctx.session.userInfo) {
    ctx.session.userInfo = userInfo
  }
  return new SuccessResultModel()
}

module.exports = {
  isExist,
  register,
  login
}