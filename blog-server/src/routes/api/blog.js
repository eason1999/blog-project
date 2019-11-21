/**
 * @description blog相关
 */

const router = require('koa-router')()
const blogValidator = require('../../validator/blog')
const { genValidator } = require('../../middlewares/validator')
// const { checkLogin } = require('../../middlewares/loginCheck')
const verifyToken = require('../../middlewares/checkToken')
const { create } = require('../../controllers/blog')

router.prefix('/api/blog') // 路由前缀

router.post('/create', verifyToken, genValidator(blogValidator), async (ctx, next) => {
  const { id: userId } = ctx.session.userInfo
  const { content, image } = ctx.request.body
  ctx.body = await create({ userId, content, image })
})

module.exports = router