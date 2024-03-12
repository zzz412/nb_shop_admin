// 路由权限校验文件
import router from '@/router'
import store from '@/store'

// 前置守卫 [主要做跳转的拦截]
router.beforeEach(async (to, from, next) => {
  //  验证是否有token
  if (store.getters.isLogin) {
    //  验证是否有用户信息  ->  有则放行     没有则获取
    if (store.getters.username) {
      next()
    } else {
      // 获取用户信息
      try {
        // 获取成功
        await store.dispatch('user/getUserInfo')
        next()
      } catch (e) {
        // 获取失败
        store.commit('user/resetInfo')
        next('/login')
      }
    }
  } else {
    if (to.path === '/login') return next()
    next('/login')
  }
})

// 后置守卫
router.afterEach((to, from) => {
})
