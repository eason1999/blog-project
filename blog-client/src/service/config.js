/**
 * 
 */

 
const config = {
  development: {
    api: '//localhost:3000',
    static: './'
  },
  test: {
    api: '',
    static: './'
  },
  production: {
    api: '',
    static: './'
  }
}
const MOCK = {
  url: 'http://yapi.ywwl.org/mock/96',
  isMock: false
}

let env = process.env.NODE_ENV

if (env === 'production') {
  env = process.env.VUE_APP_API
}

export default {
  BASE_URL: config[env].api,
  MOCK,
}