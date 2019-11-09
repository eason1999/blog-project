/**
 * @description 环境变量
 */

const ENV = process.env.NODE_ENV

module.exports = {
  isDev: ENV === 'dev',
  isPro: ENV === 'production'
}