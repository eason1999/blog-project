import { Get } from '@/service'

const state = {
  list: []
}
const mutations = {
  updateList(state, list) {
    state.list = [...list]
  }
}
const actions= {
  async getBlogs({ commit }, params) {
    const url = '/api/blog/list'
    try {
      const res = await Get(url, params)
      commit('updateList', res.blogList)
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