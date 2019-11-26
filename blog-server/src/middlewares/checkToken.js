/**
 * @description token验证
 */
const jwt = require('jsonwebtoken')
const util = require('util')
const {
  JWT_SECRET,
  CODE_ENUM,
  UN_AUTH_ROUTES
} = require('../utils/constant')
const verify = util.promisify(jwt.verify)
const { set, get } = require('../cache/_redis')

/**
 * 校验token
 * @param {object} ctx 
 * @param {function} next 
 */
async function verifyToken(ctx, next) {
  // try {
  //   const authorization = ctx.header.authorization
  //   if (authorization) {
  //     try {
  //       const token = authorization.split(' ')[1]
  //       const payload = await verify(token, JWT_SECRET)
  //       // ctx.userInfo = {
  //       //   userName: payload.userName,
  //       //   userId: payload.userId
  //       // }
  //       set('userInfo', {
  //         userName: payload.userName,
  //         userId: payload.userId
  //       })
  //       await next()
  //     } catch (err) {
  //       ctx.body = CODE_ENUM.TIMEOUT
  //       return
  //     }
  //   } else {
  //     await next()
  //   }
  // } catch (err) {
  //   console.error(err.message)
  //   if (err.status === 401) {
  //     ctx.body = CODE_ENUM.TIMEOUT
  //   } else {
  //     throw err
  //   }
  //   ctx.body = CODE_ENUM.TIMEOUT
  //   return
  // }
  const authorization = ctx.header.authorization
  try {
    const token = authorization && authorization.split(' ')[1] || ' '
    const payload = await verify(token, JWT_SECRET)
    const info = await get('userInfo')
    await set('userInfo', Object.assign(info, {
      userName: payload.userName,
      userId: payload.userId
    }))
    await next()
  } catch (err) {
    ctx.body = CODE_ENUM.TIMEOUT
    return
  }
}

module.exports = verifyToken