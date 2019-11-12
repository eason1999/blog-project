/**
 * 接口返回值处理模型
 */
const { CODE_ENUM } = require('../utils/constant')

/**
* 基础模型
*/
class BaseModel {
  constructor(code, data, msg) {
    this.code = code
    if (data) {
      this.data = data
    }
    if (msg) {
      this.msg = msg
    }
  }
}

/**
 * 成功返回模型
 */
class SuccessResultModel extends BaseModel {
  constructor(data) {
    const result = Object.assign({
      data
    }, CODE_ENUM.SUCCESS)
    super(result)
  }
}

/**
 * 失败返回模型
 */
class FailResultModel extends BaseModel {
  constructor(code, msg) {
    super({
      code,
      msg
    })
  }
}

module.exports = {
  SuccessResultModel,
  FailResultModel
}