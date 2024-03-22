<template>
  <div class="swiper-view">
    <!-- 操作区域 -->
    <div class="btn-view">
      <div class="left">
        <el-button icon="el-icon-plus" type="primary" size="small" @click="dialogVisible = true">增加</el-button>
        <el-popconfirm title="你确定要删除吗?" @confirm="handleRemove">
          <template #reference>
            <el-button icon="el-icon-delete" type="danger" size="small">批量删除</el-button>
          </template>
        </el-popconfirm>
      </div>
      <div class="right">
        <el-button icon="el-icon-refresh" size="small" @click="refreshData">刷新</el-button>
      </div>
    </div>
    <!-- 数据区域 -->
    <div class="data-view">
      <el-table
        :data="tableData"
        stripe
        height="460px"
        max-height="1000px"
        v-loading="loading"
        highlight-selection-row
        @selection-change="selectedTable = $event"
      >
        <el-table-column type="selection" />
        <el-table-column label="轮播图" align="center" width="120">
          <template #default="{ row }">
            <el-image style="width: 64px; height: 64px; border-radius: 8px" :src="row.carouselUrl" :preview-src-list="[row.carouselUrl]">
            </el-image>
          </template>
        </el-table-column>
        <el-table-column label="跳转链接" prop="redirectUrl" />
        <el-table-column label="排序值" prop="carouselRank" width="120" align="center" />
        <el-table-column label="添加时间" prop="updateTime" />
        <el-table-column label="操作" width="140">
          <template #default="{ row }">
            <el-link type="primary" @click="handleEdit(row)">修改</el-link>
            <el-popconfirm title="你确定要删除吗?" @confirm="handleRemove([row.carouselId])">
              <template #reference>
                <el-link type="danger">删除</el-link>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页区域 -->
    <div class="page-view">
      <el-pagination layout="prev, pager, next" background :total="pager.total" :current-page="pager.page" @current-change="pageChange" />
    </div>
    <!-- 操作弹窗 -->
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="350px" :before-close="dialogCancel" :close-on-click-modal="false">
      <el-form ref="dialogFormRef" label-width="80px" :model="dialogForm" :rules="dialogRule">
        <el-form-item label="图片" prop="carouselUrl">
          <!--<el-input v-model="dialogForm.carouselUrl" />-->
          <!--组件自定义v-model-->
          <!--<NbUpload v-model="dialogForm.carouselUrl" />-->
          <!--组件.sync用法[v-model]-->
          <NbUpload :avatar.sync="dialogForm.carouselUrl" />
        </el-form-item>
        <el-form-item label="跳转链接" prop="redirectUrl">
          <el-input v-model="dialogForm.redirectUrl" />
        </el-form-item>
        <el-form-item label="排序值" prop="carouselRank">
          <el-input v-model="dialogForm.carouselRank" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogCancel">取 消</el-button>
        <el-button type="primary" @click="dialogSubmit">确 定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { delSwiperApi, swiperListApi, addSwiperApi, editSwiperApi } from '@/api/swiper'
import NbUpload from '@/components/NbUpload.vue'

export default {
  name: 'IndexSwiper',
  components: { NbUpload },
  data() {
    return {
      loading: false,
      tableData: [],
      selectedTable: [],
      pager: {
        total: 0,
        page: 1
      },
      dialogVisible: false,
      dialogForm: {
        carouselUrl: '',
        redirectUrl: '',
        carouselRank: 100
      },
      dialogRule: {
        carouselUrl: [{ required: true, message: '轮播图不能为空', trigger: 'blur' }],
        redirectUrl: [{ required: true, message: '跳转链接不能为空', trigger: 'blur' }],
        carouselRank: [{ required: true, message: '排序值不能为空', trigger: 'blur' }]
      }
    }
  },
  computed: {
    dialogTitle() {
      return this.dialogForm.carouselId ? '修改轮播图' : '新增轮播图'
    }
  },
  methods: {
    // 刷新数据
    refreshData() {
      this.pager.page = 1
      this.getTableData()
    },
    // 获取表格数据
    async getTableData() {
      // 1. 处理参数
      const query = { pageNumber: this.pager.page, pageSize: 10 }
      this.loading = true
      // 2. 发起请求
      const res = await swiperListApi(query)
      // 3. 处理响应
      this.tableData = res.list
      this.pager = {
        total: res.totalCount,
        page: res.currPage
      }
      this.loading = false
    },
    // 页码改变
    pageChange(index) {
      this.pager.page = index
      this.getTableData()
    },
    // 删除表格项
    async handleRemove(ids) {
      // 根据参数类型区分  没有ids则从选择项中取出ids[批量删除]
      if (!ids) ids = this.selectedTable.map((item) => item.carouselId)
      await delSwiperApi(ids)
      this.$message.success('删除成功')
      // 判断当前删除数据是否为当前页最后一条  ->  加载上一页
      if (this.tableData.length - ids.length < 1 && this.pager.page !== 1) this.pager.page--
      this.getTableData()
    },
    // 修改表格项
    handleEdit(row) {
      this.dialogForm = { ...row }
      this.dialogVisible = true
    },
    // 提交表单数据 [新增 - 修改]
    async dialogSubmit() {
      try {
        // 1. 校验表单数据
        await this.$refs.dialogFormRef.validate()
        // 2. 提交表单数据 【判断是否为修改操作】
        const apiFn = this.dialogForm.carouselId ? editSwiperApi : addSwiperApi
        await apiFn(this.dialogForm)
        // 3. 操作完成 [重置表单]
        this.$message.success('操作成功')
        this.dialogCancel()
        this.getTableData()
      } catch (e) {
        console.log('校验失败')
      }
    },
    // 重置表单数据 [关闭]
    dialogCancel() {
      this.dialogForm = {
        carouselUrl: '',
        redirectUrl: '',
        carouselRank: 100
      }
      this.$refs.dialogFormRef.clearValidate()
      this.dialogVisible = false
    }
  },
  mounted() {
    this.getTableData()
  }
}
</script>

<style scoped lang="scss">
.btn-view {
  display: flex;
  justify-content: space-between;
  .left {
    .el-button {
      margin-right: 10px;
    }
  }
}
.data-view {
  margin-top: 20px;
  border-top: 1px solid #eee;
  .el-link {
    margin-right: 10px;
  }
}
.page-view {
  margin-top: 20px;
  text-align: center;
}
</style>
