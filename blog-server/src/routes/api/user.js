/**
 * @description 路由相关接口
 */

const router = require('koa-router')()
const { isExist } = require('../../controllers/user')

router.prefix('/api/user') // 路由前缀

router.post('/isExist', async (ctx, next) => {
  const { userName } = ctx.request.body
  // controller调用，统一返回格式
  ctx.body = await isExist(userName)
})

router.post('/register', async (ctx, next) => {
})

module.exports = router