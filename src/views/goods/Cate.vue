<template>
  <div class="swiper-view">
    <!-- 操作区域 -->
    <div class="btn-view">
      <div class="left">
        <span class="level-title">分类{{ query.categoryLevel }}级</span>
        <el-button icon="el-icon-plus" type="primary" size="small" @click="$refs.dialogRef.dialogVisible = true">增加</el-button>
        <el-popconfirm title="你确定要删除吗?" @confirm="handleRemove">
          <template #reference>
            <el-button icon="el-icon-delete" type="danger" size="small">批量删除</el-button>
          </template>
        </el-popconfirm>
      </div>
      <div class="right">
        <el-button v-if="query.categoryLevel !== 1" icon="el-icon-back" type="warning" size="small" round @click="backCate">
          返回上级
        </el-button>
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
        <el-table-column label="分类名称" prop="categoryName" />
        <el-table-column label="分类层级" prop="categoryLevel" width="150" align="center">
          <template #default="{ row }">
            <el-tag v-if="row.categoryLevel === 1">1级</el-tag>
            <el-tag v-if="row.categoryLevel === 2" type="success">2级</el-tag>
            <el-tag v-if="row.categoryLevel === 3" type="warning">3级</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="排序值" prop="categoryRank" width="150" align="center" />
        <el-table-column label="添加时间" prop="updateTime" width="200" />
        <el-table-column label="操作" width="180">
          <template #default="{ row }">
            <el-link v-if="row.categoryLevel !== 3" type="success" @click="nextCate(row)">下级分类</el-link>
            <el-link type="primary" @click="handleEdit(row)">修改</el-link>
            <el-popconfirm title="你确定要删除吗?" @confirm="handleRemove([row.categoryId])">
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
    <!-- 弹窗组件 -->
    <CateDialog ref="dialogRef" :query="query" @update="getTableData" />
  </div>
</template>

<script>
import { cateListApi, delCateApi } from '@/api/goods'
import CateDialog from '@/views/goods/components/CateDialog'

export default {
  name: 'GoodsCate',
  components: { CateDialog },
  data() {
    return {
      loading: false,
      tableData: [],
      selectedTable: [],
      pager: {
        total: 0,
        page: 1
      },
      query: {
        categoryLevel: 1,
        parentId: 0
      },
      // 根级别ID
      rootLevelId: 0
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
      const query = { pageNumber: this.pager.page, pageSize: 10, ...this.query }
      this.loading = true
      // 2. 发起请求
      const res = await cateListApi(query)
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
      if (!ids) ids = this.selectedTable.map((item) => item.categoryId)
      await delCateApi(ids)
      this.$message.success('删除成功')
      // 判断当前删除数据是否为当前页最后一条  ->  加载上一页
      if (this.tableData.length - ids.length < 1 && this.pager.page !== 1) this.pager.page--
      this.getTableData()
    },
    // 修改表格项
    handleEdit(row) {
      this.$refs.dialogRef.dialogForm = { ...row }
      this.$refs.dialogRef.dialogVisible = true
    },
    // 加载下级分类
    nextCate(cate) {
      // 当前为1级保存一份ID值 【用于返回层级】
      if (cate.categoryLevel === 1) this.rootLevelId = cate.categoryId
      this.query = {
        categoryLevel: cate.categoryLevel + 1,
        parentId: cate.categoryId
      }
      this.pager.page = 1
      this.getTableData()
    },
    // 加载上级分类
    backCate() {
      this.query = {
        categoryLevel: this.query.categoryLevel - 1,
        // 3级返回2级需要1级ID    2级返回1级需要0级ID
        parentId: this.query.categoryLevel === 2 ? 0 : this.rootLevelId
      }
      this.pager.page = 1
      this.getTableData()
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
    display: flex;
    align-items: center;
    .el-button {
      margin-right: 10px;
    }
  }
  .level-title {
    font-size: 24px;
    margin-right: 20px;
    color: #1baeae;
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
