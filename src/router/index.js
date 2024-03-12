import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login.vue'
import Layout from '@/layout/Index.vue'
import NotView from '@/views/404.vue'

Vue.use(VueRouter)

// 基础路由
const baseRoutes = [
  // 登录页
  { path: '/login', component: Login },
  // 404页
  { path: '/404', component: NotView },
  // 匹配404页
  { path: '*', redirect: '/404' }
]

// 动态路由【登录后才拥有  ->  菜单导航】
export const asyncRoutes = [
  // 首页
  { path: '/', name: 'Home', hidden: true, redirect: '/data/dashboard' },
  // 数据管理
  {
    path: '/data',
    redirect: '/data/dashboard',
    component: Layout,
    // meta字段 专用于设置自定义值
    meta: { title: '数据管理' },
    children: [
      {
        path: '/data/dashboard',
        name: 'dashboard',
        component: () => import('@/views/data/Dashboard.vue'),
        meta: { title: 'dashboard', icon: 'el-icon-odometer' }
      }
    ]
  },
  // 首页管理
  {
    path: '/index',
    redirect: '/index/swiper',
    component: Layout,
    meta: { title: '首页管理' },
    children: [
      {
        path: '/index/swiper',
        name: 'IndexSwiper',
        component: () => import('@/views/index/Swiper.vue'),
        meta: { title: '轮播图管理', icon: 'el-icon-picture' }
      },
      {
        path: '/index/recommend',
        name: 'IndexRecommend',
        component: () => import('@/views/index/Recommend.vue'),
        meta: { title: '推荐商品管理', icon: 'el-icon-star-on' }
      },
      {
        path: '/index/hot',
        name: 'IndexHot',
        component: () => import('@/views/index/Hot.vue'),
        meta: { title: '热销商品管理', icon: 'el-icon-sell' }
      },
      {
        path: '/index/new',
        name: 'IndexNew',
        component: () => import('@/views/index/New.vue'),
        meta: { title: '新品上线管理', icon: 'el-icon-thumb' }
      }
    ]
  },
  // 商品管理
  {
    path: '/goods',
    redirect: '/goods/list',
    component: Layout,
    meta: { title: '商品管理' },
    children: [
      {
        path: '/goods/cate',
        name: 'GoodsCate',
        component: () => import('@/views/goods/Cate.vue'),
        meta: { title: '商品分类管理', icon: 'el-icon-menu' }
      },
      {
        path: '/goods/list',
        name: 'GoodsList',
        component: () => import('@/views/goods/List.vue'),
        meta: { title: '商品列表管理', icon: 'el-icon-s-grid' }
      },
      {
        path: '/goods/new',
        name: 'GoodsNew',
        component: () => import('@/views/goods/new.vue'),
        meta: { title: '新增商品', icon: 'el-icon-plus' }
      }
    ]
  },
  // 订单管理
  {
    path: '/order',
    redirect: '/order/list',
    component: Layout,
    meta: { title: '订单管理' },
    children: [
      {
        path: '/order/list',
        name: 'OrderList',
        component: () => import('@/views/order/List.vue'),
        meta: { title: '订单列表管理', icon: 'el-icon-s-order' }
      }
    ]
  },
  // 会员管理
  {
    path: '/vip',
    redirect: '/vip/list',
    component: Layout,
    meta: { title: '会员管理' },
    children: [
      {
        path: '/vip/list',
        name: 'VipList',
        component: () => import('@/views/vip/List.vue'),
        meta: { title: '会员列表管理', icon: 'el-icon-user' }
      }
    ]
  },
  // 系统管理
  {
    path: '/system',
    redirect: '/system/list',
    component: Layout,
    meta: { title: '系统管理' },
    children: [
      {
        path: '/system/list',
        name: 'SystemList',
        component: () => import('@/views/system/List.vue'),
        meta: { title: '个人信息管理', icon: 'el-icon-lock' }
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [...asyncRoutes, ...baseRoutes]
})

export default router
