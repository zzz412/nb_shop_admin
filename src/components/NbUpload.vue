<template>
  <!-- 上传组件  action上传地址  before-upload上传前（false终止上传）  on-success上传成功-->
  <el-upload
    class="avatar-uploader"
    action="https://zhi.zeng.pub/new-bee/manage-api/v1/upload/file"
    :headers="{ token: this.$store.state.user.token }"
    :show-file-list="false"
    :on-success="handleAvatarSuccess"
    :before-upload="beforeAvatarUpload"
  >
    <!--上传完成显示图片-->
    <img v-if="avatar" :src="avatar" class="avatar" />
    <!--未上传显示图标-->
    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
  </el-upload>
</template>

<script>
// 自定义组件支持  自定义v-model写法
// 核心: 通过props传值  $emit改值
// 用法: 需要通过model属性去告诉vue组件  props传谁  $emit改谁
export default {
  name: 'NbUpload',
  // 通过model属性告诉v-model绑定的是谁  监听的是谁
  // model: {
  //   prop: 'avatar',
  //   event: 'success'
  // },
  props: {
    avatar: {
      type: String,
      default: ''
    }
  },
  methods: {
    // 上传成功 【图片上传了  但响应不一定成功】  [res响应值  file当前上传的图片]
    handleAvatarSuccess(res) {
      if (res.resultCode !== 200) return this.$message.error(res.message)
      // .sync修饰符  自定义必须是 update:变量
      this.$emit('update:avatar', res.data)
    },
    // 上传前校验 [file当前上传图片] [校验大于不能超过2MB  格式必须是png和jpg]
    beforeAvatarUpload(file) {
      // 格式是否为png或jpg
      const isType = ['image/jpeg', 'image/png'].includes(file.type)
      // 是否大于2MB
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isType) this.$message.error('图片格式必须为png或jpg')
      if (!isLt2M) this.$message.error('图片大小不能超过2M')

      return isType && isLt2M
    }
  }
}
</script>

<style lang="scss" scoped>
.avatar-uploader {
  ::v-deep {
    .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      &:hover {
        border-color: #409eff;
      }
      .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 108px;
        height: 108px;
        line-height: 108px;
        text-align: center;
      }
      .avatar {
        width: 108px;
        height: 108px;
        display: block;
      }
    }
  }
}
</style>