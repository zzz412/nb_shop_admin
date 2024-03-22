<template>
  <el-popconfirm :title="title" @confirm="$emit('ok')">
    <template #reference>
      <slot>
        <el-link :type="type">{{ message }}</el-link>
      </slot>
    </template>
  </el-popconfirm>
</template>

<script>
export default {
  name: 'NbPop.vue',
  props: {
    title: String,
    message: String,
    type: String
  }
}
</script>

<style scoped lang="scss"></style>