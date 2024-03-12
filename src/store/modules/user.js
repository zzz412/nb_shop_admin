// user模块 vuex仓库
import request from '@/utils/request'
import md5 from 'md5'
import { Message } from 'element-ui'

export default {
  namespaced: true,
  state() {
    return {
      // 用户登录凭证
      token: ''
    }
  },
  getters: {},
  mutations: {
    setToken(state, token) {
      state.token = token
    }
  },
  actions: {
    // 用户登录
    async login({ commit }, form) {
      const data = { userName: form.username, passwordMd5: md5(form.password) }
      const res = await request.post('/adminUser/login', data)
      // 处理响应结果 [判断状态码是否为200 -> 错误提示并返回Promise失败状态]
      if (res.resultCode !== 200) {
        Message.error(res.message)
        return Promise.reject('错误')
      }
      commit('setToken', res.data)
    }
  }
}
