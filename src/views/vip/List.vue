<template>
  <div class="swiper-view">
    <!-- 操作区域 -->
    <div class="btn-view">
      <div class="left">
        <el-popconfirm title="你确定要解禁吗?" @confirm="handleChangeStatus(0)">
          <template #reference>
            <el-button icon="el-icon-plus" type="primary" size="small">批量解禁</el-button>
          </template>
        </el-popconfirm>
        <el-popconfirm title="你确定要禁用吗?" @confirm="handleChangeStatus(1)">
          <template #reference>
            <el-button icon="el-icon-delete" type="danger" size="small">批量禁用</el-button>
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
        <el-table-column label="用户昵称" prop="nickName" />
        <el-table-column label="登录名" prop="loginName" />
        <el-table-column label="个性签名" prop="introduceSign" show-overflow-tooltip width="200" />
        <el-table-column label="注册时间" prop="createTime" width="200" />
        <el-table-column label="身份状态" prop="lockedFlag" width="80" align="center">
          <template #default="{ row }">
            <el-tag v-if="row.lockedFlag === 0" type="success">正常</el-tag>
            <el-tag v-else type="danger">禁用</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="是否注销" prop="isDeleted" width="80" align="center">
          <template #default="{ row }">
            <el-tag v-if="row.isDeleted === 0" type="success">正常</el-tag>
            <el-tag v-else type="danger">已注销</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="禁用用户" width="80" align="center">
          <template #default="{ row }">
            <el-switch
              v-model="row.lockedFlag"
              :active-value="0"
              :inactive-value="1"
              inactive-color="#ff4949"
              @change="handleChangeStatus($event, [row.userId])"
            ></el-switch>
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
import { changeVipStatusApi, vipListApi } from '@/api/vip'

export default {
  name: 'VipList',
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
      const res = await vipListApi(query)
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
    // 修改用户状态
    async handleChangeStatus(status, ids) {
      // ids = ids || this.selectedTable.map((item) => item.userId)
      // 当第一个运算元为null或undefined时  则赋值为第二个运算元  [等同于上]
      ids ??= this.selectedTable.map((item) => item.userId)
      await changeVipStatusApi(status, ids)
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
}
.page-view {
  margin-top: 20px;
  text-align: center;
}
</style>