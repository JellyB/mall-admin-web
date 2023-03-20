<template>
  <div class="app-container">
    <el-card shadow="never" class="operate-container">
      <i class="el-icon-tickets" />
      <span>数据列表</span>
    </el-card>
    <div class="table-container">
      <el-table
        ref="selectSessionTable"
        v-loading="listLoading"
        :data="list"
        style="width: 100%;"
        border
      >
        <el-table-column label="编号" width="100" align="center">
          <template slot-scope="scope">{{ scope.row.id }}</template>
        </el-table-column>
        <el-table-column label="秒杀时间段名称" align="center">
          <template slot-scope="scope">{{ scope.row.name }}</template>
        </el-table-column>
        <el-table-column label="每日开始时间" align="center">
          <template slot-scope="scope">{{ scope.row.startTime | formatTime }}</template>
        </el-table-column>
        <el-table-column label="每日结束时间" align="center">
          <template slot-scope="scope">{{ scope.row.endTime | formatTime }}</template>
        </el-table-column>
        <el-table-column label="商品数量" align="center">
          <template slot-scope="scope">{{ scope.row.productCount }}</template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              @click="handleShowRelation(scope.$index, scope.row)"
            >商品列表
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import { fetchSelectList } from '@/api/flashSession'
import { formatDate } from '@/utils/date'
export default {
  name: 'SelectSessionList',
  filters: {
    formatTime(time) {
      if (time == null || time === '') {
        return 'N/A'
      }
      const date = new Date(time)
      return formatDate(date, 'hh:mm:ss')
    }
  },
  data() {
    return {
      list: null,
      listLoading: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    handleShowRelation(index, row) {
      this.$router.push({ path: '/sms/flashProductRelation', query: {
        flashPromotionId: this.$route.query.flashPromotionId, flashPromotionSessionId: row.id }})
    },
    getList() {
      this.listLoading = true
      fetchSelectList({ flashPromotionId: this.$route.query.flashPromotionId }).then(response => {
        this.listLoading = false
        this.list = response.data
      })
    }
  }
}
</script>
<style scoped>
  .operate-container {
    margin-top: 0;
  }
</style>
