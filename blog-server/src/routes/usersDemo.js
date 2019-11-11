const router = require('koa-router')()
const jwt = require('jsonwebtoken') // token加密工具
const { JWT_SECRET } = require('../utils/constant')
const util = require('util')
const verify = util.promisify(jwt.verify)

router.prefix('/users') // 路由前缀

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

router.post('/login', async (ctx, next) => {
  const { userName, password } = ctx.request.body
  if (userName === 'zhangsan' && password === 'abc') {
    const userInfo = {
      userName,
      password,
      userId: 1,
      gender: 1
    }
    const token = jwt.sign(userInfo, JWT_SECRET, { expiresIn: '1h' }) // jwt加密， { 加密对象，密钥，过期时间 }
    console.log(token, 99)
    ctx.body = {
      code: 1,
      data: token
    }
  } else {
    ctx.body = {
      code: 0,
      msg: '登录失败'
    }
  }
})

router.get('/userInfo', async (ctx, next) => {
  const token = ctx.header.authorization
  try {
    const userInfo = await verify(token.split(' ')[1], JWT_SECRET)
    ctx.body = {
      code: 1,
      data: userInfo
    }
  } catch (err) {
    ctx.body = {
      code: 0,
      msg: '登录失败'
    }
  }

})

module.exports = router
