const router = require('koa-router')()

router.prefix('/users') // 路由前缀

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

router.post('/login', async (ctx, next) => {
  const { username, password } = ctx.request.body
  ctx.body = {
    username,
    password
  }
})

module.exports = router
