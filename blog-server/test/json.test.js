/**
 * @description test server请求
 */

const server = require('./server')

test('接口返回数据结构格式正确', async () => {
  const res = await server.get('/json')
  expect(res.body).toEqual({
    title: 'koa2 json'
  })
  expect(res.body.title).toBe('koa2 json')
})

test('接口post数据结构格式正确', async () => {
  const res = await server.post('/login').send({
    userName: 'zhangsan',
    password: '123'
  })
  expect(res.body.code).toEqual(1)
})