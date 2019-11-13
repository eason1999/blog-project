/**
 * @description 数据校验
 */
const validate = require('./_validate')
 /**
  * 数据校验规则
  */
const SCHEMA = {
  type: 'object',
  properties: {
    userName: {
      type: 'string',
      pattern: '^[a-zA-Z][a-zA-Z0-9_]+$',
      maxLength: 255,
      minLength: 2
    },
    password: {
      type: 'string',
      maxLength: 255,
      minLength: 3
    },
    rePass: {
      type: 'string',
      maxLength: 255,
      minLength: 3
    },
    telephone: {
      type: 'string',
      maxLength: 11,
      minLength: 11
    },
    gender: {
      type: 'number',
      maximum: 2,
      minimum: 0
    },
    avatar: {
      type: 'string',
      maxLength: 255
    }
  },
  required: ['userName', 'password', 'rePass', 'telephone', 'gender']
}

/**
 * 校验用户数据
 * @param {object} data 
 */
function userValidator(data = {}) {
  return validate(SCHEMA, data)
}

module.exports = userValidator
