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
  getMyBlogs,
  getBlogDetail
} = require('../../controllers/blog')

router.prefix('/api/blog') // 路由前缀

router.post('/create', verifyToken, genValidator(blogValidator), async (ctx, next) => {
  // const { id: userId } = ctx.session.userInfo
  const { content, image, title } = ctx.request.body
  ctx.body = await create({ content, image, title })
})

router.get('/list', async (ctx, next) => {
  const { pageIndex, pageSize } = ctx.query
  const _pageIndex = Number(pageIndex)
  const _pageSize = Number(pageSize)
  ctx.body = await getBlogs({ _pageIndex, _pageSize })
})

router.get('/myBlogs', verifyToken, async (ctx, next) => {
  const { pageIndex, pageSize } = ctx.query
  const _pageIndex = Number(pageIndex)
  const _pageSize = Number(pageSize)
  ctx.body = await getMyBlogs({ _pageIndex, _pageSize })
})

router.get('/detail', async (ctx, next) => {
  const { id, userId } = ctx.query
  ctx.body = await getBlogDetail({id, userId})
})

module.exports = router