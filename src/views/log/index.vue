<template>
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div>
        <i class="el-icon-search" />
        <span>筛选搜索</span>
        <el-button
          style="float:right"
          type="primary"
          size="small"
          @click="handleSearchList()"
        >
          查询搜索
        </el-button>
        <el-button
          style="float:right;margin-right: 15px"
          size="small"
          @click="handleResetSearch()"
        >
          重置
        </el-button>
      </div>
      <div style="margin-top: 15px">
        <el-form :inline="true" :model="listQuery" size="small" label-width="140px">
          <el-form-item label="输入搜索：">
            <el-input v-model="listQuery.pin" class="input-width" placeholder="pin" clearable />
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets" />
      <span>数据列表</span>
    </el-card>
    <div class="table-container">
      <el-table
        ref="adminTable"
        v-loading="listLoading"
        :data="list"
        style="width: 100%;"
        border
      >
        <el-table-column label="pin" width="100" align="center">
          <template slot-scope="scope">{{ scope.row.pin }}</template>
        </el-table-column>
        <el-table-column label="类型" align="center">
          <template slot-scope="scope">{{ scope.row.type }}</template>
        </el-table-column>
        <el-table-column label="内容" align="center">
          <template slot-scope="scope">{{ scope.row.content }}</template>
        </el-table-column>
        <el-table-column label="添加时间" width="160" align="center">
          <template slot-scope="scope">{{ scope.row.created | formatDateTime }}</template>
        </el-table-column>
        <el-table-column label="ip" width="160" align="center">
          <template slot-scope="scope">{{ scope.row.ip }}</template>
        </el-table-column>
        <el-table-column label="操作人" width="160" align="center">
          <template slot-scope="scope">{{ scope.row.operator }}</template>
        </el-table-column>
        <el-table-column label="eid" width="160" align="center">
          <template slot-scope="scope">{{ scope.row.eid }}</template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-container">
      <el-pagination
        background
        :page-size="listQuery.pageSize"
        :page-sizes="[10,15,20]"
        :total="total"
        :current-page.sync="listQuery.pageNum"
        layout="total, sizes,prev, pager, next,jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>
<script>
import { fetchList } from '@/api/log'
import { formatDate } from '@/utils/date'

const defaultListQuery = {
  pageNum: 1,
  pageSize: 10,
  pin: null
}
export default {
  name: 'LogList',
  filters: {
    formatDateTime(time) {
      if (time == null || time === '') {
        return 'N/A'
      }
      const date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
    }
  },
  data() {
    return {
      listQuery: Object.assign({}, defaultListQuery),
      list: null,
      total: null,
      listLoading: false,
      dialogVisible: false,
      isEdit: false,
      allocDialogVisible: false,
      allocRoleIds: [],
      allRoleList: [],
      allocAdminId: null
    }
  },
  created() {
    this.getList()
  },
  methods: {
    handleResetSearch() {
      this.listQuery = Object.assign({}, defaultListQuery)
    },
    handleSearchList() {
      this.listQuery.pageNum = 1
      this.getList()
    },
    handleSizeChange(val) {
      this.listQuery.pageNum = 1
      this.listQuery.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.pageNum = val
      this.getList()
    },
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.listLoading = false
        this.list = response.data.list
        this.total = response.data.total
      })
    }
  }
}
</script>
<style></style>
