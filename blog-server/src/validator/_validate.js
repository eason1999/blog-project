/**
 * @description 校验方法
 */

const Ajv = require('ajv')

const ajv = new Ajv()
/**
 * 校验方法
 * @param {object} schema 规则
 * @param {object} data 校验数据 
 */
function validate(schema, data = {}) {
  const valid = ajv.validate(schema, data)
  if (!valid) {
    return ajv.errors[0]
  }
  return null
}

module.exports = validate
