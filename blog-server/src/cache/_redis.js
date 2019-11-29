/**
 * @description 链接redis 方法 get set
 */
const redis = require('redis')
const { REDIS_CONF } = require('../conf/db')

const _timeout = 60 * 60
// 创建客户端连接
const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host)
redisClient.on('error', err => {
  console.error('redis error', err)
})

/**
 * 
 * @param {string} key 
 * @param {string} val 
 * @param {number} timeout 过期时间
 */
function set (key, val, timeout = _timeout) {
  if (typeof val === 'object') {
    val = JSON.stringify(val)
  }
  redisClient.set(key, val)
  redisClient.expire(key, timeout)
}

/**
 * 自增
 * @param {string} key 
 */
function incr (key) {
  redisClient.incr(key)
}

/**
 * @param {string} key 
 */
function get (key) {
  const promise = new Promise((resolve, reject) => {
    redisClient.get(key, (err, val) => {
      if (err) {
        reject(err)
      }
      if (val === null) {
        resolve(val)
      }
      try {
        resolve(JSON.parse(val))
      } catch (err) {
        resolve(val)
      }
    })
  })
  return promise
}

function del (key) {
  const promise = new Promise((resolve, reject) => {
    redisClient.del(key, (err, val) => {
      if (err) {
        reject(err)
      }
      resolve(val)
    })
  })
  return promise
}

function getKeys(prefix) {
  const promise = new Promise((resolve, reject) => {
    redisClient.keys(prefix, (err, val) => {
      if (err) {
        reject(err)
      }
      resolve(val)
    })
  })
  return promise
}

module.exports = {
  set,
  get,
  del,
  incr,
  getKeys
}
