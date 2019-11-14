/**
 * @description user controller
 */
const {
  getUserInfo,
  createUser,
  updateUser
} = require('../services/user')
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
 * @param {string} newPassword 
 * @param {string} telephone 
 * @param {number} gender (0 女 1 男 2 保密) 
 */
async function register({ userName, password, newPassword, telephone, gender, avatar }) {
  const userInfo = await getUserInfo({ userName })
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
  const { userName } = ctx.session.userInfo
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
    Object.assign(ctx.session.userInfo, {
      newUserName,
      newGender,
      newAvatar,
      newTelephone
    })
    return new SuccessResultModel(CODE_ENUM.SUCCESS)
  }
  return new FailResultModel(CODE_ENUM.FAIL_UPDATE_INFO)
}

/**
 * 修改密码
 * @param {string} userName
 * @param {string} password
 * @param {string} newPassword 
 */
async function changePsd({ userName, password, newPassword }) {
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
  delete ctx.session.userInfo
  return new SuccessResultModel()
}

module.exports = {
  isExist,
  register,
  login,
  changeInfo,
  changePsd,
  loginout
}