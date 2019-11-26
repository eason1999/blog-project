import axios from 'axios'
import { Message } from 'view-design'
import config from './config'
import storage from '@/utils/storage'

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
    const token = window.$STORE.state.token || storage.getStorage('token') || ''
    reqConf.headers.common['Authorization'] = `Bearer ${token}`
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
    case 1000:
      storage.removeStorage()
      window.location = `${window.location.pathname}#/home/new`
      return Promise.reject(response.data)
    default:
      console.log(Message, 999)
      Message.warning(response.data.msg)
      return Promise.reject(response.data)
  }
}, (err) => {
  Message.warning('请刷新重试~')
  return Promise.reject(err)
})

export const Get = (url, params = {}) => Serve.get(url, { params })

export const Post = (url, data) => Serve.post(url, data)

export default Serve