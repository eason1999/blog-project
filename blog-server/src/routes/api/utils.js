/**
 * @description 工具
 */

const router = require('koa-router')()
const { checkLogin } = require('../../middlewares/loginCheck')
const koaForm = require('formidable-upload-koa')
const { saveFiles } = require('../../controllers/utils')


router.prefix('/api/uitls')

router.post('/upload', checkLogin, koaForm(), async (ctx, next) => {
  const file = ctx.request.files['file']
  const { path, size, name, type } = file
  ctx.body = await saveFiles({
    filePath: path,
    size,
    name,
    type
  })
})

module.exports = router