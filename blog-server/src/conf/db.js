/**
 * @description 存储配置
 */
const { isPro } = require('../utils/env')

let REDIS_CONF = {
  port: 6379,
  host: '127.0.0.1'
}

let MYSQL_CONF = {
  host: 'localhost',
  user:'root',
  password: '123456',
  port: '3306',
  database: 'koa2_blog_db',
  dialect: 'mysql' // 数据库类型
}

if (isPro) {
  REDIS_CONF = {
    port: 6379,
    host: '127.0.0.1'
  }
  // 线上
  MYSQL_CONF = {
    host: 'localhost',
    user:'root',
    password: '123456',
    port: '3306',
    database: 'koa2_blog_db',
    dialect: 'mysql' // 数据库类型
  }
}

module.exports = {
  REDIS_CONF,
  MYSQL_CONF
}