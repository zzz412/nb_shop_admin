<template>
  <div class="swiper-view">
    <!-- 操作区域 -->
    <div class="btn-view">
      <div class="left">
        <el-button icon="el-icon-plus" type="primary" size="small" @click="$router.push('/goods/new')">增加</el-button>
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
        <el-table-column label="商品编号" prop="goodsId" width="80" />
        <el-table-column label="商品图片" prop="goodsCoverImg" width="120">
          <template #default="{ row }">
            <el-image
              style="width: 64px; height: 64px; border-radius: 8px"
              :src="row.goodsCoverImg"
              :preview-src-list="[row.goodsCoverImg]"
            >
            </el-image>
          </template>
        </el-table-column>
        <el-table-column label="商品名称" prop="goodsName" width="200" show-overflow-tooltip />
        <el-table-column label="商品简介" prop="goodsIntro" show-overflow-tooltip />
        <el-table-column label="商品状态" prop="goodsSellStatus" width="80" align="center">
          <template #default="{ row }">
            <el-tag :type="row.goodsSellStatus === 0 ? 'success' : 'danger'">
              {{ row.goodsSellStatus === 0 ? '上架' : '下架' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作状态" prop="goodsSellStatus" width="80" align="center">
          <template #default="{ row }">
            <el-switch
              v-model="row.goodsSellStatus"
              :active-value="0"
              :inactive-value="1"
              inactive-color="#ff4949"
              @change="handleChangeStatus($event, [row.goodsId])"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="商品库存" prop="stockNum" width="80" align="center" />
        <el-table-column label="商品售价" prop="sellingPrice" width="80" align="center" />
        <el-table-column label="操作" width="140">
          <template #default="{ row }">
            <el-link type="primary" @click="$router.push({ name: 'GoodsEdit', params: { goodsId: row.goodsId } })"> 修改 </el-link>
            <el-link type="primary">查看详情</el-link>
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
import { changeGoodsStatusApi, goodsListApi } from '@/api/goods'

export default {
  name: 'GoodsList',
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
        // 接口暂不支持商品名模糊查询
        // goodsName: '',
        // 商品状态:  0 全部  1下架
        goodsSellStatus: 0
      }
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
      const res = await goodsListApi(query)
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
    // 修改状态【批量下架】
    async handleChangeStatus(status, ids) {
      await changeGoodsStatusApi(status, ids)
      this.$message.success('操作成功')
      // this.getTableData()
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