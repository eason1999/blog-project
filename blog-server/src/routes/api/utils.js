/**
 * @description 工具
 */

const router = require('koa-router')()
// const { checkLogin } = require('../../middlewares/loginCheck')
const verifyToken = require('../../middlewares/checkToken')
const koaForm = require('formidable-upload-koa')
const { saveFiles } = require('../../controllers/utils')


router.prefix('/api/utils')

router.post('/upload', verifyToken, koaForm(), async (ctx, next) => {
  const file = ctx.req.files['file']
  const { path, size, name, type } = file
  ctx.body = await saveFiles({
    filePath: path,
    size,
    name,
    type
  })
})

module.exports = router