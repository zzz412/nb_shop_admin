<template>
  <div class="swiper-view">
    <!-- 操作区域 -->
    <div class="btn-view">
      <el-button icon="el-icon-plus" type="primary" size="small">增加</el-button>
      <el-button icon="el-icon-delete" type="danger" size="small">批量删除</el-button>
    </div>
    <!-- 数据区域 -->
    <div class="data-view">
      <el-table :data="tableData" stripe height="460px" max-height="1000px" v-loading="loading">
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
          <template #default>
            <el-link type="primary">修改</el-link>
            <el-link type="danger">删除</el-link>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页区域 -->
    <div class="page-view">
      <el-pagination layout="prev, pager, next" background :total="pager.total" :current-page="pager.page" @current-change="pageChange" />
    </div>
  </div>
</template>

<script>
import { swiperListApi } from '@/api/swiper'

export default {
  name: 'IndexSwiper',
  data() {
    return {
      loading: false,
      tableData: [],
      pager: {
        total: 100,
        page: 1
      }
    }
  },
  methods: {
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
      console.log(index)
      this.pager.page = index
      this.getTableData()
    }
  },
  mounted() {
    this.getTableData()
  }
}
</script>

<style scoped lang="scss">
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