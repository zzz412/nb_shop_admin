<template>
  <div class="swiper-view">
    <!-- 操作区域 -->
    <div class="btn-view">
      <div class="left">
        <el-select v-model="query.orderStatus" placeholder="请选择订单状态" style="margin-right: 20px" size="small" @change="getTableData">
          <el-option v-for="item in orderStatusKeys" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        <el-popconfirm title="你确定要操作吗?" @confirm="handleOrderStatus('checkDone')">
          <template #reference>
            <el-button icon="el-icon-delete" size="small">批量配货</el-button>
          </template>
        </el-popconfirm>
        <el-popconfirm title="你确定要操作吗?" @confirm="handleOrderStatus('checkOut')">
          <template #reference>
            <el-button icon="el-icon-delete" type="warning" size="small">批量出库</el-button>
          </template>
        </el-popconfirm>
        <el-popconfirm title="你确定要操作吗?" @confirm="handleOrderStatus('checkClose')">
          <template #reference>
            <el-button icon="el-icon-delete" type="danger" size="small">批量关闭</el-button>
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
        <el-table-column label="订单号" prop="orderNo" />
        <el-table-column label="订单总价" prop="totalPrice" />
        <el-table-column label="创建时间" prop="createTime" />
        <el-table-column label="订单状态" prop="orderStatus" width="120">
          <template #default="{ row }">
            <el-tag :type="filterOrderStatus(row.orderStatus)">{{ findOrderStatus(row.orderStatus).label }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="支付方式" prop="payType" width="120">
          <template #default="{ row }">
            <el-tag v-if="row.payType === 0" type="info" effect="dark">未支付</el-tag>
            <el-tag v-if="row.payType === 1" type="success" effect="dark">微信支付</el-tag>
            <el-tag v-if="row.payType === 2" effect="dark">支付宝支付</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="260">
          <template #default="{ row }">
            <span class="link-span">
              <nb-pop
                v-if="row.orderStatus === 1"
                title="你确定要操作吗?"
                message="配货完成"
                type="primary"
                @ok="handleOrderStatus('checkDone', [row.orderId])"
              />
              <nb-pop
                v-if="row.orderStatus === 2"
                title="你确定要操作吗?"
                message="出库完成"
                type="primary"
                @ok="handleOrderStatus('checkOut', [row.orderId])"
              />
            </span>
            <span class="link-span">
              <nb-pop
                v-if="[0, 1, 2, 3].includes(row.orderStatus)"
                title="你确定要关闭吗?"
                message="关闭订单"
                type="danger"
                @ok="handleOrderStatus('checkClose', [row.orderId])"
              />
            </span>
            <span class="link-span">
              <el-link type="success" @click="handleEdit(row)">查看详情</el-link>
            </span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页区域 -->
    <div class="page-view">
      <el-pagination layout="prev, pager, next" background :total="pager.total" :current-page="pager.page" @current-change="pageChange" />
    </div>
    <!-- 操作弹窗 -->
  </div>
</template>

<script>
import { checkCloseApi, checkDoneApi, checkOutApi, orderListApi } from '@/api/order'
import { orderStatusKeys } from '@/utils/constance'
import NbPop from '@/components/NbPop.vue'

// 订单状态
// 0 待支付  1已支付 2配货完成 3出库成功 4交易成功 -1 手动关闭 -2 超时关闭 -3 商家关闭
export default {
  name: 'OrderList',
  components: { NbPop },
  data() {
    return {
      loading: false,
      tableData: [],
      selectedTable: [],
      query: { orderNo: '', orderStatus: '' },
      pager: { total: 0, page: 1 },
      orderStatusKeys
    }
  },
  methods: {
    // 匹配订单状态
    findOrderStatus(status) {
      return this.orderStatusKeys.find((item) => item.value === status) || {}
    },
    // 匹配订单状态值类型
    filterOrderStatus(status) {
      if (status < 0) return 'danger'
      if (status === 4) return 'success'
      return 'warning'
    },
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
      const res = await orderListApi(query)
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
    // 操作订单状态
    async handleOrderStatus(type, ids) {
      // 根据参数类型区分  没有ids则从选择项中取出ids[批量操作]
      if (!ids) ids = this.selectedTable.map((item) => item.orderId)
      // 根据type类型区分 操作方法
      const fnObj = { checkDone: checkDoneApi, checkOut: checkOutApi, checkClose: checkCloseApi }
      await fnObj[type](ids)
      this.$message.success('操作成功')
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
  .link-span {
    width: 70px;
    display: inline-block;
  }
}
.page-view {
  margin-top: 20px;
  text-align: center;
}
</style>