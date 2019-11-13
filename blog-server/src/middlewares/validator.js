/**
 * @description schema 验证中间件
 */
const { FailResultModel } = require('../model/ResultModel')
const { CODE_ENUM } = require('../utils/constant')
 /**
  * 验证中间件
  * @param {function} validateFun 验证函数
  */
function genValidator(validateFun) {
  async function validator(ctx, next) {
    const data = ctx.request.body
    const err = validateFun(data)
    if (err) {
      // 失败
      ctx.body = new FailResultModel(CODE_ENUM.DATA_ERROR)
      return
    }
    // 验证成功
    await next()
  }

  return validator
}

module.exports = {
  genValidator
}