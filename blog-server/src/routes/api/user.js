/**
 * @description 路由相关接口
 */

const router = require('koa-router')()
const {
  isExist,
  register,
  login,
  changeInfo,
  changePsd,
  loginout,
  getInfo
} = require('../../controllers/user')
const userValidator = require('../../validator/user')
const { genValidator } = require('../../middlewares/validator')
// const { checkLogin } = require('../../middlewares/loginCheck')
const verifyToken = require('../../middlewares/checkToken')

router.prefix('/api/user') // 路由前缀

router.post('/isExist', async (ctx, next) => {
  const { userName } = ctx.request.body
  // controller调用，统一返回格式
  ctx.body = await isExist(userName)
})
// 2 -- 中间件
router.post('/register', genValidator(userValidator), async (ctx, next) => {
  const {
    userName,
    password,
    newPassword,
    telephone,
    gender,
    avatar
  } = ctx.request.body
  ctx.body = await register({
    userName,
    password,
    newPassword,
    telephone,
    gender,
    avatar
  })
})

router.post('/login', async (ctx, next) => {
  const { userName, password } = ctx.request.body
  ctx.body = await login({ ctx, userName, password })
})

router.post(
  '/changeInfo',
  // checkLogin,
  verifyToken,
  genValidator(userValidator), async (ctx, next) => {
  const { userName, gender, avatar, telephone } = ctx.request.body
  ctx.body = await changeInfo(ctx, {
    newUserName: userName,
    newGender: gender,
    newAvatar: avatar,
    newTelephone: telephone
  })
})

router.post('/changePsd', verifyToken, genValidator(userValidator), async (ctx, next) => {
  const { password, newPassword } = ctx.request.body
  ctx.body = await changePsd({ password, newPassword })
})

router.post('/loginout', verifyToken, async (ctx, next) => {
 ctx.body = await loginout(ctx)
})

router.get('/userInfo', verifyToken, async (ctx, next) => {
  ctx.body = await getInfo()
})

module.exports = router