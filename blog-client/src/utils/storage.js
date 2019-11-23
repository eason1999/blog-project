/**
 * @description storage相关操作
 */

let storageObj = {}

storageObj.setStorage = (key, value, type = 'local') => {
  if (type === 'session') {
    sessionStorage.setItem(key, JSON.stringify(value))
    return
  }
  localStorage.setItem(key, JSON.stringify(value))
}

storageObj.getStorage = (key, type = 'local') => {
  let val = localStorage.getItem(key)
  if (type === 'session') {
    val = sessionStorage.getItem(key)
  }
  if (val && val !== 'undefined' && val !== 'null') {
    return JSON.parse(val)
  }
  return ''
}

storageObj.removeStorage = (key, type = 'local') => {
  if (key) {
    if (type === 'session') {
      sessionStorage.removeItem(key)
      return
    }
    localStorage.removeItem(key)
  } else {
    if (type === 'session') {
      sessionStorage.clear()
      return
    }
    localStorage.clear()
  }
}

export default storageObj