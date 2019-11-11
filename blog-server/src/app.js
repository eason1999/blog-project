const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-generic-session')
const redisStore = require('koa-redis')
const jwtKoa = require('koa-jwt')

const { REDIS_CONF } = require('./conf/db')
const { JWT_SECRET } = require('./utils/constant')

// 路由
const index = require('./routes/index')
const users = require('./routes/users')
const errorViewRouter = require('./routes/view/error')

// error handler 后端接口错误导向ejs错误页面
// const onErrorConf = {
//   redirect: '/error'
// }
// onerror(app, onErrorConf)
onerror(app)

// jwt注册 json web token
app.use(jwtKoa({
  secret: JWT_SECRET, // 密钥--常量
}).unless({
  path: [/^\/users\/login/] // 不需要做jwt认证的路由
}))

// middlewares
// 解析post参数数据
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())

app.use(logger())
// 静态资源路由目录访问
app.use(require('koa-static')(__dirname + '/public'))

// ejs模板注册
app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

// session 配置
// 加密参数
app.keys = ['ASD_dsfd_123*&324_%$^']
// 每次用户登录创建一个名为weibo.sid 的cookie
app.use(session({
  key: 'weibo.sid', // cookie name 默认为‘koa.sid’
  prefix: 'weibo:sess:', // redis key 前缀 默认为‘koa:sess:’
  cookie: {
    path: '/', // cookie 在所有目录都可访问
    httpOnly: true, // cookie 值只可服务端更改，客户端不可更改cookie值
    maxAge: 1 * 60 * 60 * 1000, // cookie 过期时间
  },
  // ttl: 1 * 60 * 60 * 1000, // redis 过期时间，不写默认与cookie过期时间同步
  store: redisStore({
    all: `${REDIS_CONF.host}:${REDIS_CONF.port}`
  })
}))

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(errorViewRouter.routes(), errorViewRouter.allowedMethods()) // 含兜底路由，需注册最底部

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

module.exports = app
