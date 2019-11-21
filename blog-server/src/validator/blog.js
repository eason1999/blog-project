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
    content: {
      type: 'string'
    },
    image: {
      type: 'string',
      maxLength: 255
    }
  },
  required: ['content']
}

/**
 * 校验博客数据
 * @param {object} data 
 */
function blogValidator(data = {}) {
  return validate(SCHEMA, data)
}

module.exports = blogValidator
