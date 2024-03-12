import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login.vue'
import Layout from '@/layout/Index.vue'
import NotView from '@/views/404.vue'

Vue.use(VueRouter)

const routes = [
  // 首页
  { path: '/', name: 'Home', redirect: '/data/dashboard' },
  // 数据管理
  {
    path: '/data',
    redirect: '/data/dashboard',
    component: Layout,
    children: [{ path: '/data/dashboard', name: 'dashboard', component: () => import('@/views/data/Dashboard.vue') }]
  },
  // 首页管理
  {
    path: '/index',
    redirect: '/index/swiper',
    component: Layout,
    children: [
      { path: '/index/swiper', name: 'IndexSwiper', component: () => import('@/views/index/Swiper.vue') },
      { path: '/index/recommend', name: 'IndexRecommend', component: () => import('@/views/index/Recommend.vue') },
      { path: '/index/hot', name: 'IndexHot', component: () => import('@/views/index/Hot.vue') },
      { path: '/index/new', name: 'IndexNew', component: () => import('@/views/index/New.vue') }
    ]
  },
  // 商品管理
  {
    path: '/goods',
    redirect: '/goods/list',
    component: Layout,
    children: [
      { path: '/goods/cate', name: 'GoodsCate', component: () => import('@/views/goods/Cate.vue') },
      { path: '/goods/list', name: 'GoodsList', component: () => import('@/views/goods/List.vue') },
      { path: '/goods/new', name: 'GoodsNew', component: () => import('@/views/goods/new.vue') }
    ]
  },
  // 订单管理
  {
    path: '/order',
    redirect: '/order/list',
    component: Layout,
    children: [{ path: '/order/list', name: 'OrderList', component: () => import('@/views/order/List.vue') }]
  },
  // 会员管理
  {
    path: '/vip',
    redirect: '/vip/list',
    component: Layout,
    children: [{ path: '/vip/list', name: 'VipList', component: () => import('@/views/vip/List.vue') }]
  },
  // 系统管理
  {
    path: '/system',
    redirect: '/system/list',
    component: Layout,
    children: [{ path: '/system/list', name: 'SystemList', component: () => import('@/views/system/List.vue') }]
  },
  // 登录页
  { path: '/login', component: Login },
  // 404页
  { path: '/404', component: NotView },
  // 匹配404页
  { path: '*', redirect: '/404' }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
