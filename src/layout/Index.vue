<template>
  <el-container class="layout-view">
    <!-- 左侧 -->
    <el-aside width="200px" class="layout-left">
      <div class="logo-link">
        <img src="https://s.weituibao.com/1582958061265/mlogo.png" />
        <span>NB_ADMIN</span>
      </div>
      <!--  导航菜单   -->
      <!--   默认展开   :default-openeds="['/data', '/index', '/goods', '/order', '/vip', '/system']"-->
      <el-menu :default-active="activePath" background-color="#222832" text-color="#fff" active-text-color="#1baeae" router unique-opened>
        <!--  1级菜单 -->
        <!-- 下拉导航菜单项 ->  基于动态路由表进行循环渲染 -->
        <template v-for="route in asyncRoutes">
          <el-submenu :key="route.path" :index="route.path" v-if="!route.hidden">
            <!-- 下拉导航菜单项标题  -->
            <template #title>
              <span>{{ route.meta.title }}</span>
            </template>
            <!--  2级菜单 -->
            <!-- 下拉导航菜单内容 -->
            <template v-for="route2 in route.children">
              <el-menu-item :key="route2.path" :index="route2.path" v-if="!route2.hidden">
                <i :class="route2.meta.icon"></i>
                {{ route2.meta.title }}
              </el-menu-item>
            </template>
          </el-submenu>
        </template>
      </el-menu>
    </el-aside>
    <!-- 右侧 -->
    <el-container class="layout-right">
      <el-header>
        <div class="title">{{ title }}</div>
        <div class="user">
          <!-- 下拉菜单 -->
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link"> {{ userinfo.nickName }}<i class="el-icon-arrow-down el-icon--right"></i> </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="info">个人信息</el-dropdown-item>
                <el-dropdown-item divided command="logout">退出</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-header>
      <el-main>
        <el-card>
          <router-view></router-view>
        </el-card>
      </el-main>
      <el-footer>
        <div class="copy-link">Copyright © 2019-2024 zzz. All rights reserved.</div>
        <div class="version">nb_shop_admin version: 1.0.1</div>
      </el-footer>
    </el-container>
  </el-container>
</template>

<script>
import { asyncRoutes } from '@/router'
import { mapState } from 'vuex'

export default {
  name: 'Layout',
  data() {
    return {
      asyncRoutes
    }
  },
  computed: {
    ...mapState('user', ['userinfo']),
    // 获取当前路由地址
    activePath() {
      return this.$route.path
    },
    // 获取当前路由的title值
    title() {
      return this.$route.meta.title || '主页'
    }
  },
  methods: {
    handleCommand(command) {
      // 判断下拉菜单类型
      if (command === 'logout') {
        //   退出登录
        this.$confirm('你确定要退出吗', '提示').then(async () => {
          await this.$store.dispatch('user/logout')
          this.$message.success('退出登录成功')
          this.$router.push('/login')
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">
.layout-view {
  height: 100vh;
  .layout-left {
    background-color: #222832;
    // 隐藏滚动条
    &::-webkit-scrollbar {
      display: none;
    }
    .logo-link {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 50px;
      img {
        width: 50px;
        height: 50px;
        margin-right: 10px;
      }
      span {
        font-size: 20px;
        color: #fff;
      }
    }
    .el-menu {
      border-right: none;
    }
  }
  .layout-right {
    .el-main {
      background-color: #fff;
      padding: 10px;
    }
    .el-header {
      border-bottom: 1px solid #e9e9e9;
    }
    .el-footer {
      border-top: 1px solid #e9e9e9;
    }
    .el-header,
    .el-footer {
      height: 50px;
      background-color: #fff;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .title {
        font-size: 20px;
      }
      .user {
        cursor: pointer;
      }
      .version {
        color: #409eff;
        cursor: pointer;
      }
    }
  }
}
</style>
