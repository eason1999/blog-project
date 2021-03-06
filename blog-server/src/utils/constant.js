const JWT_SECRET = '@a#bD_S%DF_12+&45-7&*'
const CRYP_SECRET = 'sdf_$%_SD*&_F@S'
const SESSION_SECRET = 'ASD_dsfd_123*&324_%$^'
const INIT_AVATAR = 'https://i.loli.net/2017/08/21/599a521472424.jpg'
const INIT_CONTENT_IMAGE = 'https://dev-file.iviewui.com/5wxHCQMUyrauMCGSVEYVxHR5JmvS7DpH/large'
const LIST_KEY_PREFIX = 'home:blogList:'
const CHECK_KEY_PREFIX = 'detail:checknum:'

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
  UN_LOGIN: {
    code: 1003,
    msg: '您还没有登录'
  },
  FILE_SIZE_BIG: {
    code: 1004,
    msg: '文件尺寸过大'
  },
  FAIL_UPDATE_INFO: {
    code: 1005,
    msg: '信息更新失败'
  },
  FAIL_UPDATE_PSD: {
    code: 1006,
    msg: '密码修改失败'
  },
}

const UN_AUTH_ROUTES = [
  '/',
  '/api/user/login',
  '/api/user/register'
]

module.exports = {
  JWT_SECRET,
  INIT_AVATAR,
  CODE_ENUM,
  CRYP_SECRET,
  SESSION_SECRET,
  UN_AUTH_ROUTES,
  INIT_CONTENT_IMAGE,
  LIST_KEY_PREFIX,
  CHECK_KEY_PREFIX
}