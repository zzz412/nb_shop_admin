<template>
  <div class="login-view">
    <div class="login">
      <!-- 头部  -->
      <div class="login-header">
        <img class="logo" src="https://s.weituibao.com/1582958061265/mlogo.png" />
        <div class="title">
          <h1>NB商城</h1>
          <h2>商品后台管理系统</h2>
        </div>
      </div>
      <!-- 表单项 -->
      <div class="login-form">
        <el-form ref="formRef" :model="form" :rules="rules">
          <el-form-item label="账号" prop="username">
            <el-input placeholder="请输入账号名" v-model="form.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" placeholder="请输入密码" v-model="form.password" show-password></el-input>
          </el-form-item>
          <el-form-item>
            <div class="tips">
              登录表示您已同意
              <a href="javascript:void(0);">《服务条款》</a>
            </div>
            <el-button style="width: 100%" type="primary" @click="submitForm">立即登录</el-button>
            <el-checkbox checked>下次自动登录</el-checkbox>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      form: {
        username: 'admin',
        password: '123456'
      },
      rules: {
        username: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 6, max: 12, message: '密码最低6位', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm() {
      this.$refs.formRef.validate(async (flag) => {
        if (!flag) return
        // 调用vuex Login   await只能解析Promise成功状态
        await this.$store.dispatch('user/login', this.form)
        // 提示登录成功
        this.$notify.success({ title: '提示', message: '登录成功, 欢迎您!' })
        // 跳转首页
        this.$router.push('/')
      })
    }
  }
}
</script>

<style scoped lang="scss">
.login-view {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  .login {
    width: 420px;
    height: 500px;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 21px 41px #0003;

    .login-header {
      padding: 40px 0 20px;
      display: flex;
      align-items: center;
      justify-content: center;

      .logo {
        width: 100px;
        height: 100px;
        margin-right: 20px;
      }

      .title {
        h1 {
          font-size: 28px;
          color: #1baeae;
          font-weight: 700;
        }

        h2 {
          font-size: 12px;
          color: #999;
        }
      }
    }

    .login-form {
      width: 70%;
      margin: 0 auto;

      .el-form-item {
        margin-bottom: 10px;
      }

      .tips a {
        color: #409eff;
      }
    }
  }
}
</style>
