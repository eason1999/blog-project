/**
 * @description blog相关定时任务
 */

const schedule = require('node-schedule')
const { Blog } = require('../db/model')
const { CHECK_KEY_PREFIX } = require('../utils/constant')
const { getKeys, get } = require('../cache/_redis.js')

/**
 * @description 定时5分钟更新文章查看数到数据库
 */
const updateCheck = () => {
  schedule.scheduleJob('*/5 * * * *', async () => {
    let updateArr = []
    const PREFIX = `${CHECK_KEY_PREFIX}*`
    const keys = await getKeys(PREFIX)
    console.log(keys, '-------定时任务--------')
    if (keys && keys instanceof Array) {
      updateArr = keys.map(async item => {
        const paramsArr = item.split('_')
        const id = paramsArr[1]
        // const userId = paramsArr[2]
        const check = await get(item)
        console.log(check, '----缓存数据----')
        const obj = {
          check,
          id,
          // userId
        }
        return Promise.resolve(obj)
      })
      Promise.all(updateArr).then(arr => {
        console.log(arr, '----待更新数据----')
        arr.forEach(async item => {
          await Blog.update({
            check: item.check
          }, {
            where: {
              id: item.id
            }
          })
        })
        // Blog.bulkCreate(arr, {
        //   fields: ['check'],
        //   updateOnDuplicate: ['id']
        // })
      })
    }
  })
}

module.exports = {
  updateCheck
}