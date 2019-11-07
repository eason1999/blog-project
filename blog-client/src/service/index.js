import axios from 'axios'
import config from './config'

const env = process.env.NODE_ENV
console.log(env)
let isMock = config.MOCK.isMock
if (env === 'production') {
  isMock = false
}

const Serve = axios.create({
  baseURL: isMock ? config.MOCK.url : config.BASE_URL,
  timeout: 5 * 60 * 1000
})

Serve.interceptors.request.use((reqConf) => {
  /* eslint no-param-reassign: "error" */
  if (!isMock) {
    const token = window.$STORE.state.xToken || localStorage.getItem('token') || ''
    reqConf.headers.common['TOKEN'] = token
  }
  for (let key in reqConf.params) {
    if (reqConf.params[key] === null || reqConf.params[key] === '') {
      delete reqConf.params[key]
    }
  }

  reqConf.params = reqConf.params || {}

  return reqConf
}, err => Promise.reject(err))

Serve.interceptors.response.use((response) => {
  if (isMock) {
    return response.data.data
  }
  const { code } = response.data
  switch (code) {
    case 1:
      return Promise.resolve(response.data.data)
    case -1:
      /* eslint-disable */
      window.location = `${window.location.pathname}#/home`
      return Promise.reject(response.data)
    default:
      Message({
        message: response.data.msg || '请稍候~',
        type: 'warning'
      })
      return Promise.reject(response.data)
  }
}, (err) => {
  Message({
    message: '请刷新重试~',
    type: 'warning'
  })
  return Promise.reject(err)
})

export const Get = (url, params = {}) => Serve.get(url, { params })

export const Post = (url, data) => Serve.post(url, data)

export default Serve