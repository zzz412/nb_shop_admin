<template>
  <div class="wang-editor">
    <!-- 工具栏 -->
    <Toolbar style="border-bottom: 1px solid #ccc" :editor="editor" :defaultConfig="toolbarConfig" />
    <!-- 编辑器 -->
    <Editor style="height: 500px; overflow-y: hidden" :defaultConfig="editorConfig" v-model="html" @onCreated="onCreated" />
  </div>
</template>

<script>
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { Message } from 'element-ui'
import { mapState } from 'vuex'

export default {
  name: 'WangEditor.vue',
  components: { Editor, Toolbar },
  data() {
    return {
      editor: null,
      html: '',
      toolbarConfig: {
        // // 显示哪些菜单
        // toolbarKeys: [],
        // // 隐藏哪些菜单
        // excludeKeys: []
      },
      editorConfig: {
        placeholder: '请输入内容...',
        // 所有的菜单配置，都要在 MENU_CONF 属性下
        MENU_CONF: {
          // // 配置字号
          // fontSize: [],
          // // 配置上传图片
          uploadImage: {
            // 后端上传地址，必填
            server: 'https://zhi.zeng.pub/new-bee/manage-api/v1/upload/file',
            timeout: 30 * 1000, // 5s 超时时间
            fieldName: 'file', // 字段名
            headers: { token: this.$store.state.user.token },
            withCredentials: false,
            //选择文件时的类型限制，默认为['image/*'] 如不想限制，则设置为 []
            allowedFileTypes: ['image/*'],
            metaWithUrl: false, // 参数拼接到 url 上
            maxFileSize: 5 * 1024 * 1024, //5M //设置大点 不然图片过大会报错
            base64LimitSize: 0.1 * 1024 * 1024, // 100kb 以下插入 base64
            // 自定义插入图片
            customInsert(res, insertFn) {
              // res 即服务端的返回结果
              // const url = 'http://101.35.5.235:81' + res.data
              // 从 res 中找到 url alt href ，然后插图图片
              insertFn(res.data)
            },
            // 上传前
            onBeforeUpload(file) {
              console.log('onBeforeUpload', file)
              // Message({
              //   message: '图片正在上传中,请耐心等待',
              //   duration: 0,
              //   customClass: 'uploadTip',
              //   iconClass: 'el-icon-loading',
              //   showClose: true
              // })
              return file.url // 返回哪些文件可以上传
              // return false 会阻止上传
            },
            // 上传进度的回调函数
            onProgress(progress) {
              console.log('onProgress', progress)
            },
            // 单个文件上传成功之后
            onSuccess(file, res) {
              console.log('onSuccess', file.url, res)
            },
            // 单个文件上传失败
            onFailed(file, res) {
              // alert(res.message)
              console.log('onFailed', file, res)
            },
            // 上传错误，或者触发 timeout 超时
            onError(file, err, res) {
              // alert(err.message)
              console.error('onError', file, err, res)
            }
          }
          // // 继续其他菜单配置...
        }
      }
    }
  },
  computed: {
    ...mapState('user', ['token'])
  },
  methods: {
    onCreated(editor) {
      this.editor = Object.seal(editor) // 【注意】一定要用 Object.seal() 否则会报错
    }
  },
  mounted() {
    // // 模拟 ajax 请求，异步渲染编辑器
    // setTimeout(() => {
    //   this.html = '<p>Ajax 异步设置内容 HTML</p>'
    // }, 1500)
  },
  beforeDestroy() {
    const editor = this.editor
    if (editor == null) return
    editor.destroy() // 组件销毁时，及时销毁 editor ，重要！！！
  }
}
</script>

<style scoped lang="scss">
@import '@wangeditor/editor/dist/css/style.css';
.wang-editor {
  border: 1px solid #ccc;
}
</style>
