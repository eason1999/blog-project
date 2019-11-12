/**
 * @description sequelize 同步数据库
 */

// 同步model到数据库
const seq = require('./seq')
require('./model')

// 测试链接
// seq.authenticate().then(() => {
//   console.log('ok')
// }).catch(err => {
//   console.log(err)
// })

// 执行同步
seq.sync({
  force: true // 删除数据库原表
}).then(() => {
  process.exit() // 同步成功退出
})