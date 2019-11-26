/**
 * @description blog相关
 */

const router = require('koa-router')()
const blogValidator = require('../../validator/blog')
const { genValidator } = require('../../middlewares/validator')
// const { checkLogin } = require('../../middlewares/loginCheck')
const verifyToken = require('../../middlewares/checkToken')
const {
  create,
  getBlogs,
  getMyBlogs
} = require('../../controllers/blog')

router.prefix('/api/blog') // 路由前缀

router.post('/create', verifyToken, genValidator(blogValidator), async (ctx, next) => {
  // const { id: userId } = ctx.session.userInfo
  const { content, image, title } = ctx.request.body
  ctx.body = await create({ content, image, title })
})

router.get('/list', verifyToken, async (ctx, next) => {
  const { pageIndex, pageSize } = ctx.params
  ctx.body = await getBlogs({ pageIndex, pageSize })
})

router.get('/myBlogs', verifyToken, async (ctx, next) => {
  const { pageIndex, pageSize } = ctx.params
  ctx.body = await getMyBlogs({ pageIndex, pageSize })
})

module.exports = router