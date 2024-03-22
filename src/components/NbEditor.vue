<template>
  <!--npm i @wangeditor/editor  @wangeditor/editor-for-vue 下载包依赖 -->
  <div class="editor-view">
    <!-- 工具栏 -->
    <Toolbar class="toolbar" :editor="editor" :defaultConfig="toolbarConfig" :mode="mode" />
    <!-- 编辑栏 -->
    <Editor
      class="editor"
      :value="html"
      placeholder="请输入内容..."
      :defaultConfig="editorConfig"
      :mode="mode"
      @onCreated="onCreated"
      @onChange="onChange"
    />
  </div>
</template>

<script>
import { Toolbar, Editor } from '@wangeditor/editor-for-vue'
import '@wangeditor/editor/dist/css/style.css'
import { Message } from 'element-ui'
import store from '@/store'

const toolbarKeys = [
  'headerSelect',
  'blockquote',
  '|',
  'bold',
  'underline',
  'italic',
  '|',
  'color',
  'bgColor',
  '|',
  'fontSize',
  'fontFamily',
  'emotion',
  '|',
  {
    iconSvg:
      '<svg viewBox="0 0 1024 1024"><path d="M959.877 128l0.123 0.123v767.775l-0.123 0.122H64.102l-0.122-0.122V128.123l0.122-0.123h895.775zM960 64H64C28.795 64 0 92.795 0 128v768c0 35.205 28.795 64 64 64h896c35.205 0 64-28.795 64-64V128c0-35.205-28.795-64-64-64zM832 288.01c0 53.023-42.988 96.01-96.01 96.01s-96.01-42.987-96.01-96.01S682.967 192 735.99 192 832 234.988 832 288.01zM896 832H128V704l224.01-384 256 320h64l224.01-192z"></path></svg>',
    key: 'group-image',
    menuKeys: ['insertImage', 'uploadImage'],
    title: '图片'
  },
  'fullScreen'
]
const uploadImage = {
  // 上传地址
  server: 'https://zhi.zeng.pub/new-bee/manage-api/v1/upload/file',
  // 配置上传字段名
  fieldName: 'file',
  // 单个文件的最大体积限制，默认为 2M
  maxFileSize: 1 * 1024 * 1024, // 1M
  // 选择文件时的类型限制，默认为 ['image/*'] 。如不想限制，则设置为 []
  allowedFileTypes: ['image/*'],
  // 自定义请求头
  headers: { token: store.state.user.token },
  // 超时时间
  timeout: 10 * 1000,
  // 上传错误，或者触发 timeout 超时
  onError(file, err, res) {
    // console.log(`${file.name} 上传出错`, err, res)
    Message.error('上传出错, 请检查图片格式')
  },
  // 自定义插入
  customInsert(res, insertFn) {
    insertFn(res.data)
  }
}
export default {
  name: 'NbEditor.vue',
  components: { Toolbar, Editor },
  props: {
    // 富文本编辑器的值
    html: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      // 富文本编辑器实例
      editor: null,
      // 工具栏配置
      toolbarConfig: {
        // 显示哪些工具栏
        toolbarKeys
      },
      // 编辑栏配置
      editorConfig: {
        MENU_CONF: { uploadImage }
      },
      // 模式:  default  simple
      mode: 'default' // or 'simple': value
    }
  },
  methods: {
    // 初始化编辑器【核心】
    onCreated(editor) {
      this.editor = Object.seal(editor) // 一定要用 Object.seal() ，否则会报错
    },
    // 编辑器值发生变化
    onChange(editor) {
      // editor 编辑器实例
      // console.log('编辑器的值:', editor.getHtml())
      this.$emit('update:html', editor.getHtml())
    }
  },
  beforeDestroy() {
    const editor = this.editor
    if (editor == null) return
    editor.destroy() // 组件销毁时，及时销毁编辑器
  }
}
</script>

<style scoped lang="scss">
.editor-view {
  border: 1px solid #ccc;
  .toolbar {
    border-bottom: 1px solid #ccc;
  }
  .editor {
    height: 500px;
    overflow-y: hidden;
  }
}
</style>