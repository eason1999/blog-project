/**
 * @description 密码校验
 * @param {*} rule 
 * @param {*} value 
 * @param {*} callback 
 */
export const checkPsw = (rule, value, callback) => {
  if (!value) return callback()
  const reg = /^[a-zA-Z0-9]{6,21}$/
  if (reg.test(value)) {
    callback()
  } else {
    callback('请输入6~21位的数字或字母')
  }
}
/**
 * @description 邮箱校验
 * @param {*} rule 
 * @param {*} value 
 * @param {*} callback 
 */
export const email = (rule, value, callback) => {
  if (!value) return callback()
  if (!/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(value)) {
    callback(new Error('邮箱格式有误'))
  } else {
    callback()
  }
}
/**
 * @description 手机号校验
 * @param {*} rule 
 * @param {*} val 
 * @param {*} callback 
 */
export const phone = (rule, val, callback) => {
  if (!val) return callback()
  if (!(/^1[0-9]{10}$/.test(val))) {
    callback(new Error('电话号码不合法'))
  }
  callback()
}