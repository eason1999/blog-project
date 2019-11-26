
import { Post } from '@/service'

const state = {}
const mutations = {}
const actions = {
  async handlePublish({ commit }, params) {
    const url = '/api/blog/create'
    try {
      await Post(url, params)
      return Promise.resolve()
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