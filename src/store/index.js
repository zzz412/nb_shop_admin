import Vue from 'vue'
import Vuex from 'vuex'
// 对vuex数据进行持久化存储  npm install --save vuex-persistedstate
import createPersistedState from 'vuex-persistedstate'
import user from '@/store/modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: { user },
  getters: {
    isLogin: (state) => !!state.user.token,
    username: (state) => state.user.userinfo.loginUserName
  },
  plugins: [
    createPersistedState({
      // 指定存储方式
      storage: localStorage,
      // 指定存储键名
      key: 'nb_shop_admin_store',
      // 通过path指定需要存储的模块【不设置则存储所有模块】
      paths: ['user']
    })
  ]
})
