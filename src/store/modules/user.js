// user模块 vuex仓库
import md5 from 'md5'
import { loginApi, logoutApi, userInfoApi } from '@/api/adminUser'

export default {
  namespaced: true,
  state() {
    return {
      // 用户登录凭证
      token: '',
      // 用户信息
      userinfo: {}
    }
  },
  getters: {},
  mutations: {
    setToken(state, token) {
      state.token = token
    },
    setUserinfo(state, data) {
      state.userinfo = data
    },
    // 重置信息
    resetInfo(state) {
      state.token = ''
      state.userinfo = {}
    }
  },
  actions: {
    // 用户登录
    async login({ commit }, form) {
      const data = { userName: form.username, passwordMd5: md5(form.password) }
      const res = await loginApi(data)
      commit('setToken', res)
    },
    // 获取用户个人信息
    async getUserInfo({ commit }) {
      const res = await userInfoApi()
      commit('setUserinfo', res)
    },
    // 退出登录
    async logout({ commit }) {
      await logoutApi()
      commit('setToken', null)
      commit('setUserinfo', {})
    }
  }
}
