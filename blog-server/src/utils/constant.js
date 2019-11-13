const JWT_SECRET = '@a#bD_S%DF_12+&45-7&*'
const CRYP_SECRET = 'sdf_$%_SD*&_F@S'
const SESSION_SECRET = 'ASD_dsfd_123*&324_%$^'
const INIT_AVATAR = 'http://dwz.cn/rnTnftz'

// code 枚举常量
const CODE_ENUM = {
  FAIL: {
    code: 0, // 接口请求失败
    msg: '请求失败'
  },
  SUCCESS: {
    code: 1, // 接口成功
    msg: '请求成功'
  },
  TIMEOUT: {
    code: 1000,
    msg: '登录超时'
  }, // 登录超时，token失效
  EXIST_USER: {
    code: 1001,
    msg: '用户已存在'
  }, // 用户已存在
  DATA_ERROR: {
    code: 1002,
    msg: '数据格式校验失败'
  },
}

module.exports = {
  JWT_SECRET,
  INIT_AVATAR,
  CODE_ENUM,
  CRYP_SECRET,
  SESSION_SECRET
}