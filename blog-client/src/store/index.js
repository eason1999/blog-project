import Vue from 'vue'
import Vuex from 'vuex'
import { Get, Post } from '@/service'
import storage from '@/utils/storage'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    token: '',
    userInfo: {}
  },
  mutations: {
    updateToken(state, str) {
      state.token = str
      storage.setStorage('token', str)
    },
    updateUserInfo(state, obj) {
      state.userInfo = Object.assign({}, obj)
      storage.setStorage('userInfo', obj)
    }
  },
  actions: {
    async handleLogin({ commit }, params) {
      const url = '/api/user/login'
      try {
        const res = await Post(url, params)
        commit('updateToken', res.token)
        return Promise.resolve()
      } catch (err) {
        return Promise.reject(err)
      }
    },
    async getUserInfo({ commit }) {
      const url = '/api/user/userInfo'
      try {
        const res = await Get(url)
        commit('updateUserInfo', res.userInfo)
        return Promise.resolve()
      } catch (err) {
        return Promise.reject(err)
      }
    },
    async loginOut({ commit }) {
      const url = '/api/user/loginout'
      try {
        await Post(url)
        commit('updateUserInfo', {})
        storage.removeStorage()
        return Promise.resolve()
      } catch (err) {
        return Promise.reject(err)
      }
    },
    async handleRegister({ commit }, params) {
      const url = '/api/user/register'
      try {
        const res = await Post(url, params)
        commit('updateToken', res.token)
        return Promise.resolve()
      } catch (err) {
        return Promise.reject(err)
      }
    }
  },
  modules: {}
})

window.$STORE = store

export default store