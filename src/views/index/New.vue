<template>
  <div class="new-view">
    <!-- 操作区域 -->
    <div class="btn-view">
      <el-button icon="el-icon-plus" type="primary" size="small">增加</el-button>
      <el-button icon="el-icon-delete" type="danger" size="small">批量删除</el-button>
    </div>
    <!-- 数据区域 -->
    <div class="data-view">
      <el-table :data="tableData" stripe>
        <el-table-column type="selection" />
        <el-table-column label="轮播图" prop="cover" />
        <el-table-column label="轮播图" prop="link" />
        <el-table-column label="轮播图" prop="rank" />
        <el-table-column label="轮播图" prop="time" />
        <el-table-column label="操作">
          <template #default>
            <el-link>修改</el-link>
            <el-link type="danger">删除</el-link>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页区域 -->
    <div class="page-view">
      <el-pagination layout="prev, pager, next" background :total="pager.total" :current-page="pager.page" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexNew',
  data() {
    return {
      tableData: [
        { id: 1, cover: '123123', link: 'http://123123.com', rank: 100, time: '2024-11-11' },
        { id: 2, cover: '123123', link: 'http://123123.com', rank: 100, time: '2024-11-11' },
        { id: 3, cover: '123123', link: 'http://123123.com', rank: 100, time: '2024-11-11' },
        { id: 4, cover: '123123', link: 'http://123123.com', rank: 100, time: '2024-11-11' },
        { id: 5, cover: '123123', link: 'http://123123.com', rank: 100, time: '2024-11-11' }
      ],
      pager: {
        total: 100,
        page: 1
      }
    }
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