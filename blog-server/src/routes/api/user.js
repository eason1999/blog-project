/**
 * @description 路由相关接口
 */

const router = require('koa-router')()
const { isExist, register, login } = require('../../controllers/user')
const userValidator = require('../../validator/user')
const { genValidator } = require('../../middlewares/validator')

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
    rePass,
    telephone,
    gender,
    avatar
  } = ctx.request.body
  ctx.body = await register({
    userName,
    password,
    rePass,
    telephone,
    gender,
    avatar
  })
})

router.post('/login', async (ctx, next) => {
  const { userName, password } = ctx.request.body
  ctx.body = await login({ ctx, userName, password })
})

module.exports = router