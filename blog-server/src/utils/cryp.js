/**
 * @description 加密
 */

const crypto = require('crypto')
const { CRYP_SECRET } = require('./constant')

/**
 * 加密方法
 * @param {string} content 
 */
function _md5(content) {
  const md5 = crypto.createHash('md5')
  return md5.update(content).digest('hex')
}

/**
 * 对外加密
 * @param {string} content 
 */
const doCrypto = (content) => {
  const str = `password=${content}&key=${CRYP_SECRET}`
  return _md5(str)
}

module.exports = doCrypto