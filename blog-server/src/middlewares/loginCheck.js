/**
 * @description 验证中间件
 */
const { FailResultModel } = require('../model/ResultModel')
const { CODE_ENUM } = require('../utils/constant')
/**
* 登录验证
* @param {function} validateFun 验证函数
*/
async function checkLogin(ctx, next) {
  const info = ctx.session && ctx.session.userInfo
  if (info) {
    // 成功
    await next()
    return
  }
  // 验证失败
  ctx.body = new FailResultModel(CODE_ENUM.UN_LOGIN)
}

module.exports = {
  checkLogin
}