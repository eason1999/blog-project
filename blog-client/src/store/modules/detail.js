import { Get } from '@/service'

const state = {
}
const mutations = {
}
const actions= {
  async getDetail({ commit }, params) {
    const url = '/api/blog/detail'
    try {
      const res = await Get(url, params)
      return Promise.resolve(res)
    } catch (err) {
      return Promise.reject(err)
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}