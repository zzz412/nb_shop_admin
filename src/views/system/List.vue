<template>
  <div class="user_list_view">
    <!--  修改账号信息 -->
    <el-card class="card">
      <template #header>修改账号信息</template>
      <el-form ref="formRef" label-width="80px" :model="form" :rules="formRules">
        <el-form-item label="登录名" prop="loginUserName">
          <el-input v-model="form.loginUserName"></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="nickName">
          <el-input v-model="form.nickName"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="danger" @click="updateName">确认修改</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!--  修改密码-->
    <el-card class="card">
      <template #header>修改密码</template>
      <el-form ref="formRef2" label-width="80px" :model="form2" :rules="form2Rules">
        <el-form-item label="原密码" prop="originalPassword">
          <el-input type="password" show-password v-model="form2.originalPassword"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input type="password" show-password v-model="form2.newPassword"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="danger" @click="updatePassword">确认修改</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { updateNameApi, updatePasswordApi } from '@/api/adminUser'
import md5 from 'md5'

export default {
  name: 'SystemList',
  data() {
    return {
      form: {
        loginUserName: '',
        nickName: ''
      },
      form2: {
        newPassword: '',
        originalPassword: ''
      },
      formRules: {
        loginUserName: [{ required: true, message: '登录名不能为空', trigger: 'blur' }],
        nickName: [{ required: true, message: '用户昵称不能为空', trigger: 'blur' }]
      },
      form2Rules: {
        originalPassword: [{ required: true, message: '旧密码不能为空', trigger: 'blur' }],
        newPassword: [{ required: true, message: '新密码不能为空', trigger: 'blur' }]
      }
    }
  },
  methods: {
    async updateName() {
      try {
        //   1. 校验表单数据
        await this.$refs.formRef.validate()
        //   2. 发起请求提交数据
        await updateNameApi(this.form)
        //   3. 提示信息 重新登录
        this.$notify({
          title: '警告',
          message: '修改成功, 请重新登录',
          type: 'warning'
        })
        await this.$store.dispatch('user/logout')
        this.$router.push('/login')
      } catch (e) {
        console.log('校验失败')
      }
    },
    async updatePassword() {
      try {
        //   1. 校验表单数据
        await this.$refs.formRef.validate()
        //   2. 发起请求提交数据 【MD5加密】
        await updatePasswordApi({
          originalPassword: md5(this.form2.originalPassword),
          newPassword: md5(this.form2.newPassword)
        })
        //   3. 提示信息 重新登录
        this.$notify({
          title: '警告',
          message: '修改成功, 请重新登录',
          type: 'warning'
        })
        await this.$store.dispatch('user/logout')
        this.$router.push('/login')
      } catch (e) {
        console.log('校验失败')
      }
    }
  },
  mounted() {
    const { userinfo } = this.$store.state.user
    this.form = {
      loginUserName: userinfo.loginUserName,
      nickName: userinfo.nickName
    }
  }
}
</script>

<style scoped lang="scss">
.card {
  margin-bottom: 10px;
  &:last-child {
    margin-bottom: 0;
  }
  .el-input {
    width: 300px;
  }
}
</style>