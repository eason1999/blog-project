/**
 * @description sequelize 实例
 */

// 创建sequelize实例并导出
const Sequelize = require('sequelize')
const { MYSQL_CONF } = require('../conf/db')
const {
  isPro,
  isTest
} = require('../utils/env')

const {
  host,
  dialect,
  database,
  user,
  password
} = MYSQL_CONF

const conf = {
  host,
  dialect // 数据库类型
}

// 测试环境不答应sql语句
if (isTest) {
  conf.logging = () => {}
}

if (isPro) {
  // 连接池（线上使用）
  conf.pool = {
    max: 5, // 最大创建连接数
    min: 0,
    idle: 10000, // 如果一个链接池10s未被使用会被释放
  }
}

const seq = new Sequelize(database, user, password, conf)

module.exports = seq
