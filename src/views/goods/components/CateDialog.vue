<template>
  <!-- 操作弹窗 -->
  <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="350px" :before-close="dialogCancel" :close-on-click-modal="false">
    <el-form ref="dialogFormRef" label-width="80px" :model="dialogForm" :rules="dialogRule">
      <el-form-item label="分类名称" prop="categoryName">
        <el-input v-model="dialogForm.categoryName" />
      </el-form-item>
      <el-form-item label="排序值" prop="categoryRank">
        <el-input v-model.number="dialogForm.categoryRank" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="dialogCancel">取 消</el-button>
      <el-button type="primary" @click="dialogSubmit">确 定</el-button>
    </template>
  </el-dialog>
</template>

<script>
import { addCateApi, editCateApi } from '@/api/goods'

export default {
  name: 'CateDialog',
  props: {
    // 外部传递的参数值
    query: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      dialogVisible: false,
      dialogForm: {
        categoryName: '',
        categoryRank: 1
      },
      dialogRule: {
        categoryName: [{ required: true, message: '分类名称不能为空', trigger: 'blur' }],
        categoryRank: [
          { required: true, message: '排序值不能为空', trigger: 'blur' },
          { type: 'number', min: 1, max: 100, message: '排序值范围1-100', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    dialogTitle() {
      return this.dialogForm.categoryId ? '修改分类' : '新增分类'
    }
  },
  methods: {
    // 提交表单数据 [新增 - 修改]
    async dialogSubmit() {
      try {
        // 1. 校验表单数据
        await this.$refs.dialogFormRef.validate()
        // 2. 提交表单数据 【判断是否为修改操作】
        const apiFn = this.dialogForm.categoryId ? editCateApi : addCateApi
        await apiFn({ ...this.dialogForm, ...this.query })
        // 3. 操作完成 [重置表单]
        this.$message.success('操作成功')
        this.dialogCancel()
        this.$emit('update')
      } catch (e) {
        console.log('校验失败')
      }
    },
    // 重置表单数据 [关闭]
    dialogCancel() {
      this.dialogForm = {
        categoryName: '',
        categoryRank: 1
      }
      this.$refs.dialogFormRef.clearValidate()
      this.dialogVisible = false
    }
  }
}
</script>

<style scoped lang="scss"></style>
