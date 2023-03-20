<template>
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div>
        <i class="el-icon-search" />
        <span>筛选搜索</span>
        <el-button
          style="float: right"
          type="primary"
          size="small"
          @click="handleSearchList()"
        >查询结果
        </el-button>
        <el-button
          style="float: right;margin-right: 15px"
          size="small"
          @click="handleResetSearch()"
        >重置
        </el-button>
      </div>
      <div style="margin-top: 15px">
        <el-form :inline="true" :model="listQuery" size="small" label-width="140px">
          <el-form-item label="输入搜索：">
            <el-input v-model="listQuery.keyword" style="width: 203px" placeholder="商品名称" />
          </el-form-item>
          <el-form-item label="商品货号：">
            <el-input v-model="listQuery.productSn" style="width: 203px" placeholder="商品货号" />
          </el-form-item>
          <el-form-item label="商品分类：">
            <el-cascader
              v-model="selectProductCateValue"
              :options="productCateOptions"
              clearable
            />
          </el-form-item>
          <el-form-item label="商品品牌：">
            <el-select v-model="listQuery.brandId" placeholder="请选择品牌" clearable>
              <el-option
                v-for="item in brandOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="上架状态：">
            <el-select v-model="listQuery.publishStatus" placeholder="全部" clearable>
              <el-option
                v-for="item in publishStatusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="审核状态：">
            <el-select v-model="listQuery.verifyStatus" placeholder="全部" clearable>
              <el-option
                v-for="item in verifyStatusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets" />
      <span>数据列表</span>
      <el-button
        class="btn-add"
        size="mini"
        @click="handleAddProduct()"
      >添加
      </el-button>
    </el-card>
    <div class="table-container">
      <el-table
        ref="productTable"
        v-loading="listLoading"
        :data="list"
        style="width: 100%"
        border
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="60" align="center" />
        <el-table-column label="编号" width="100" align="center">
          <template slot-scope="scope">{{ scope.row.id }}</template>
        </el-table-column>
        <el-table-column label="商品图片" width="120" align="center">
          <template slot-scope="scope"><img style="height: 80px" :src="scope.row.pic"></template>
        </el-table-column>
        <el-table-column label="商品名称" align="center">
          <template slot-scope="scope">
            <p>{{ scope.row.name }}</p>
            <p>品牌：{{ scope.row.brandName }}</p>
          </template>
        </el-table-column>
        <el-table-column label="价格/货号" width="120" align="center">
          <template slot-scope="scope">
            <p>价格：￥{{ scope.row.price }}</p>
            <p>货号：{{ scope.row.productSn }}</p>
          </template>
        </el-table-column>
        <el-table-column label="标签" width="140" align="center">
          <template slot-scope="scope">
            <p>上架：
              <el-switch
                v-model="scope.row.publishStatus"
                :active-value="1"
                :inactive-value="0"
                @change="handlePublishStatusChange(scope.$index, scope.row)"
              />
            </p>
            <p>新品：
              <el-switch
                v-model="scope.row.newStatus"
                :active-value="1"
                :inactive-value="0"
                @change="handleNewStatusChange(scope.$index, scope.row)"
              />
            </p>
            <p>推荐：
              <el-switch
                v-model="scope.row.recommandStatus"
                :active-value="1"
                :inactive-value="0"
                @change="handleRecommendStatusChange(scope.$index, scope.row)"
              />
            </p>
          </template>
        </el-table-column>
        <el-table-column label="排序" width="100" align="center">
          <template slot-scope="scope">{{ scope.row.sort }}</template>
        </el-table-column>
        <el-table-column label="SKU库存" width="100" align="center">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" circle @click="handleShowSkuEditDialog(scope.$index, scope.row)" />
          </template>
        </el-table-column>
        <el-table-column label="销量" width="100" align="center">
          <template slot-scope="scope">{{ scope.row.sale }}</template>
        </el-table-column>
        <el-table-column label="审核状态" width="100" align="center">
          <template slot-scope="scope">
            <p>{{ scope.row.verifyStatus | verifyStatusFilter }}</p>
            <p>
              <el-button
                type="text"
                @click="handleShowVerifyDetail(scope.$index, scope.row)"
              >审核详情
              </el-button>
            </p>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="160" align="center">
          <template slot-scope="scope">
            <p>
              <el-button
                size="mini"
                @click="handleShowProduct(scope.$index, scope.row)"
              >查看
              </el-button>
              <el-button
                size="mini"
                @click="handleUpdateProduct(scope.$index, scope.row)"
              >编辑
              </el-button>
            </p>
            <p>
              <el-button
                size="mini"
                @click="handleShowLog(scope.$index, scope.row)"
              >日志
              </el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
              >删除
              </el-button>
            </p>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="batch-operate-container">
      <el-select
        v-model="operateType"
        size="small"
        placeholder="批量操作"
      >
        <el-option
          v-for="item in operates"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-button
        style="margin-left: 20px"
        class="search-button"
        size="small"
        type="primary"
        @click="handleBatchOperate()"
      >确定
      </el-button>
    </div>
    <div class="pagination-container">
      <el-pagination
        background
        layout="total, sizes,prev, pager, next,jumper"
        :page-size="listQuery.pageSize"
        :page-sizes="[5,10,15]"
        :current-page.sync="listQuery.pageNum"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <el-dialog
      title="编辑货品信息"
      :visible.sync="editSkuInfo.dialogVisible"
      width="40%"
    >
      <span>商品货号：</span>
      <span>{{ editSkuInfo.productSn }}</span>
      <el-input v-model="editSkuInfo.keyword" placeholder="按sku编号搜索" size="small" style="width: 50%;margin-left: 20px">
        <el-button slot="append" icon="el-icon-search" @click="handleSearchEditSku" />
      </el-input>
      <el-table
        style="width: 100%;margin-top: 20px"
        :data="editSkuInfo.stockList"
        border
      >
        <el-table-column
          label="SKU编号"
          align="center"
        >
          <template slot-scope="scope">
            <el-input v-model="scope.row.skuCode" />
          </template>
        </el-table-column>
        <el-table-column
          v-for="(item,index) in editSkuInfo.productAttr"
          :key="item.id"
          :label="item.name"
          align="center"
        >
          <template slot-scope="scope">
            {{ getProductSkuSp(scope.row,index) }}
          </template>
        </el-table-column>
        <el-table-column
          label="销售价格"
          width="80"
          align="center"
        >
          <template slot-scope="scope">
            <el-input v-model="scope.row.price" />
          </template>
        </el-table-column>
        <el-table-column
          label="商品库存"
          width="80"
          align="center"
        >
          <template slot-scope="scope">
            <el-input v-model="scope.row.stock" />
          </template>
        </el-table-column>
        <el-table-column
          label="库存预警值"
          width="100"
          align="center"
        >
          <template slot-scope="scope">
            <el-input v-model="scope.row.lowStock" />
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editSkuInfo.dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleEditSkuConfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {
  fetchList,
  updateDeleteStatus,
  updateNewStatus,
  updateRecommendStatus,
  updatePublishStatus
} from '@/api/product'
import { fetchList as fetchSkuStockList, update as updateSkuStockList } from '@/api/skuStock'
import { fetchList as fetchProductAttrList } from '@/api/productAttr'
import { fetchList as fetchBrandList } from '@/api/brand'
import { fetchListWithChildren } from '@/api/productCate'
const defaultListQuery = {
  keyword: null,
  pageNum: 1,
  pageSize: 5,
  publishStatus: null,
  verifyStatus: null,
  productSn: null,
  productCategoryId: null,
  brandId: null
}
export default {
  name: 'ProductList',
  filters: {
    verifyStatusFilter(value) {
      if (value === 1) {
        return '审核通过'
      } else {
        return '未审核'
      }
    }
  },
  data() {
    return {
      editSkuInfo: {
        dialogVisible: false,
        productId: null,
        productSn: '',
        productAttributeCategoryId: null,
        stockList: [],
        productAttr: [],
        keyword: null
      },
      operates: [
        {
          label: '商品上架 ',
          value: 'publishOn '
        },
        {
          label: '商品下架',
          value: 'publishOff'
        },
        {
          label: '设为推荐',
          value: 'recommendOn'
        },
        {
          label: '取消推荐',
          value: 'recommendOff'
        },
        {
          label: '设为新品',
          value: 'newOn'
        },
        {
          label: '取消新品',
          value: 'newOff'
        },
        {
          label: '转移到分类',
          value: 'transferCategory'
        },
        {
          label: '移入回收站',
          value: 'recycle'
        }
      ],
      operateType: null,
      listQuery: Object.assign({}, defaultListQuery),
      list: null,
      total: null,
      listLoading: true,
      selectProductCateValue: null,
      multipleSelection: [],
      productCateOptions: [],
      brandOptions: [],
      publishStatusOptions: [{
        value: 1,
        label: '上架'
      }, {
        value: 0,
        label: '下架'
      }],
      verifyStatusOptions: [{
        value: 1,
        label: '审核通过'
      }, {
        value: 0,
        label: '未审核'
      }]
    }
  },
  watch: {
    selectProductCateValue: function(newValue) {
      if (newValue != null && newValue.length === 2) {
        this.listQuery.productCategoryId = newValue[1]
      } else {
        this.listQuery.productCategoryId = null
      }
    }
  },
  created() {
    this.getList()
    this.getBrandList()
    this.getProductCateList()
  },
  methods: {
    getProductSkuSp(row, index) {
      const spData = JSON.parse(row.spData)
      if (spData != null && index < spData.length) {
        return spData[index].value
      } else {
        return null
      }
    },
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.listLoading = false
        this.list = response.data.list
        this.total = response.data.total
      })
    },
    getBrandList() {
      fetchBrandList({ pageNum: 1, pageSize: 100 }).then(response => {
        this.brandOptions = []
        const brandList = response.data.list
        for (let i = 0; i < brandList.length; i++) {
          this.brandOptions.push({ label: brandList[i].name, value: brandList[i].id })
        }
      })
    },
    getProductCateList() {
      fetchListWithChildren().then(response => {
        const list = response.data
        this.productCateOptions = []
        for (let i = 0; i < list.length; i++) {
          const children = []
          if (list[i].children != null && list[i].children.length > 0) {
            for (let j = 0; j < list[i].children.length; j++) {
              children.push({ label: list[i].children[j].name, value: list[i].children[j].id })
            }
          }
          this.productCateOptions.push({ label: list[i].name, value: list[i].id, children: children })
        }
      })
    },
    handleShowSkuEditDialog(index, row) {
      this.editSkuInfo.dialogVisible = true
      this.editSkuInfo.productId = row.id
      this.editSkuInfo.productSn = row.productSn
      this.editSkuInfo.productAttributeCategoryId = row.productAttributeCategoryId
      this.editSkuInfo.keyword = null
      fetchSkuStockList(row.id, { keyword: this.editSkuInfo.keyword }).then(response => {
        this.editSkuInfo.stockList = response.data
      })
      if (row.productAttributeCategoryId != null) {
        fetchProductAttrList(row.productAttributeCategoryId, { type: 0 }).then(response => {
          this.editSkuInfo.productAttr = response.data.list
        })
      }
    },
    handleSearchEditSku() {
      fetchSkuStockList(this.editSkuInfo.productId, { keyword: this.editSkuInfo.keyword }).then(response => {
        this.editSkuInfo.stockList = response.data
      })
    },
    handleEditSkuConfirm() {
      if (this.editSkuInfo.stockList == null || this.editSkuInfo.stockList.length <= 0) {
        this.$message({
          message: '暂无sku信息',
          type: 'warning',
          duration: 1000
        })
        return
      }
      this.$confirm('是否要进行修改', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        updateSkuStockList(this.editSkuInfo.productId, this.editSkuInfo.stockList).then(response => {
          this.$message({
            message: '修改成功',
            type: 'success',
            duration: 1000
          })
          this.editSkuInfo.dialogVisible = false
        })
      })
    },
    handleSearchList() {
      this.listQuery.pageNum = 1
      this.getList()
    },
    handleAddProduct() {
      this.$router.push({ path: '/pms/addProduct' })
    },
    handleBatchOperate() {
      if (this.operateType == null) {
        this.$message({
          message: '请选择操作类型',
          type: 'warning',
          duration: 1000
        })
        return
      }
      if (this.multipleSelection == null || this.multipleSelection.length < 1) {
        this.$message({
          message: '请选择要操作的商品',
          type: 'warning',
          duration: 1000
        })
        return
      }
      this.$confirm('是否要进行该批量操作?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const ids = []
        for (let i = 0; i < this.multipleSelection.length; i++) {
          ids.push(this.multipleSelection[i].id)
        }
        switch (this.operateType) {
          case this.operates[0].value:
            this.updatePublishStatus(1, ids)
            break
          case this.operates[1].value:
            this.updatePublishStatus(0, ids)
            break
          case this.operates[2].value:
            this.updateRecommendStatus(1, ids)
            break
          case this.operates[3].value:
            this.updateRecommendStatus(0, ids)
            break
          case this.operates[4].value:
            this.updateNewStatus(1, ids)
            break
          case this.operates[5].value:
            this.updateNewStatus(0, ids)
            break
          case this.operates[6].value:
            break
          case this.operates[7].value:
            this.updateDeleteStatus(1, ids)
            break
          default:
            break
        }
        this.getList()
      })
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
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handlePublishStatusChange(index, row) {
      const ids = []
      ids.push(row.id)
      this.updatePublishStatus(row.publishStatus, ids)
    },
    handleNewStatusChange(index, row) {
      const ids = []
      ids.push(row.id)
      this.updateNewStatus(row.newStatus, ids)
    },
    handleRecommendStatusChange(index, row) {
      const ids = []
      ids.push(row.id)
      this.updateRecommendStatus(row.recommandStatus, ids)
    },
    handleResetSearch() {
      this.selectProductCateValue = []
      this.listQuery = Object.assign({}, defaultListQuery)
    },
    handleDelete(index, row) {
      this.$confirm('是否要进行删除操作?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const ids = []
        ids.push(row.id)
        this.updateDeleteStatus(1, ids)
      })
    },
    handleUpdateProduct(index, row) {
      this.$router.push({ path: '/pms/updateProduct', query: { id: row.id }})
    },
    handleShowProduct(index, row) {
      console.log('handleShowProduct', row)
    },
    handleShowVerifyDetail(index, row) {
      console.log('handleShowVerifyDetail', row)
    },
    handleShowLog(index, row) {
      console.log('handleShowLog', row)
    },
    updatePublishStatus(publishStatus, ids) {
      const params = new URLSearchParams()
      params.append('ids', ids)
      params.append('publishStatus', publishStatus)
      updatePublishStatus(params).then(response => {
        this.$message({
          message: '修改成功',
          type: 'success',
          duration: 1000
        })
      })
    },
    updateNewStatus(newStatus, ids) {
      const params = new URLSearchParams()
      params.append('ids', ids)
      params.append('newStatus', newStatus)
      updateNewStatus(params).then(response => {
        this.$message({
          message: '修改成功',
          type: 'success',
          duration: 1000
        })
      })
    },
    updateRecommendStatus(recommendStatus, ids) {
      const params = new URLSearchParams()
      params.append('ids', ids)
      params.append('recommendStatus', recommendStatus)
      updateRecommendStatus(params).then(response => {
        this.$message({
          message: '修改成功',
          type: 'success',
          duration: 1000
        })
      })
    },
    updateDeleteStatus(deleteStatus, ids) {
      const params = new URLSearchParams()
      params.append('ids', ids)
      params.append('deleteStatus', deleteStatus)
      updateDeleteStatus(params).then(response => {
        this.$message({
          message: '删除成功',
          type: 'success',
          duration: 1000
        })
      })
      this.getList()
    }
  }
}
</script>
<style></style>
