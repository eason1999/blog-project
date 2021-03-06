import Vue from 'vue'
import Vuex from 'vuex'
import { Get, Post } from '@/service'
import storage from '@/utils/storage'
import create from './modules/create'
import home from './modules/home'
import detail from './modules/detail'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    token: '',
    userInfo: {},
    spinShow: false
  },
  mutations: {
    updateToken(state, str) {
      state.token = str
      storage.setStorage('token', str)
    },
    updateUserInfo(state, obj) {
      state.userInfo = Object.assign({}, obj)
      storage.setStorage('userInfo', obj)
    },
    updateSpinShow(state, bool) {
      state.spinShow = bool || false
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
        await Post(url, params)
        return Promise.resolve()
      } catch (err) {
        return Promise.reject(err)
      }
    },
    async uploadImg({ commit }, formData) {
    const url = '/api/utils/upload'
    try {
      const res = await Post(url, formData)
      return Promise.resolve(res)
    } catch (err) {
      return Promise.reject(err)
    }
  }
  },
  modules: {
    create,
    home,
    detail
  }
})

window.$STORE = store

export default store