const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // 关闭开发模式下 -> eslint、插件错误时，取消全屏覆盖（建议关掉）
  lintOnSave: false,
  devServer: {
    // 关闭开发模式下 -> 编译错误时，取消全屏覆盖（建议关掉）
    client: {
      overlay: false
    }
  }
})
