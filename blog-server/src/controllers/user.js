/**
 * @description user controller
 */
const { getUserInfo } = require('../services/user')
const { SuccessResultModel, FailResultModel } = require('../model/ResultModel')
const { CODE_ENUM } = require('../utils/constant')

 /**
  * 用户名是否存在
  * @param {string} userName 
  */
async function isExist(userName) {
  // 业务逻辑处理，server数据处理
  const userInfo = await getUserInfo(userName)
  if (userInfo) {
    return new FailResultModel(CODE_ENUM.EXIST_USER.code, CODE_ENUM.EXIST_USER.msg)
  }
  return new SuccessResultModel(userInfo)
}

module.exports = {
  isExist
}