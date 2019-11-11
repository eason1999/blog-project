const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  // 异步读取模板文件
  await ctx.render('index', {
    title: 'Hello Koa 2!',
    message: '你好',
    isMe: true,
    blogList: [
      {
        title: 'aaa'
      }, {
        title: 'bbb'
      }, {
        title: 'ccc'
      }, {
        title: 'ddd'
      }
    ]
  })
})

router.get('/json', async (ctx, next) => {
  const session = ctx.session
  if (session.viewNum === null) {
    session.viewNum = 0
  }
  session.viewNum++
  ctx.body = {
    title: 'koa2 json',
    viewNum: session.viewNum
  }
})

router.get('/profile/:username', async (ctx, next) => {
  const { username } = ctx.params
  ctx.body = {
    title: '登陆者姓名',
    username
  }
})

router.get('/loadmore/:username/:pagenum', async (ctx, next) => {
  const { username, pagenum } = ctx.params
  ctx.body = {
    title: '查询页数',
    username,
    pagenum
  }
})

module.exports = router
