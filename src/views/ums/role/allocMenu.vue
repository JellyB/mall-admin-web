<template>
  <el-card class="form-container" shadow="never">
    <el-tree
      ref="tree"
      :data="menuTreeList"
      show-checkbox
      default-expand-all
      node-key="id"
      highlight-current
      :props="defaultProps"
    />
    <div style="margin-top: 20px" align="center">
      <el-button type="primary" @click="handleSave()">保存</el-button>
      <el-button @click="handleClear()">清空</el-button>
    </div>

  </el-card>
</template>

<script>
import { fetchTreeList } from '@/api/menu'
import { listMenuByRole, allocMenu } from '@/api/role'
export default {
  name: 'AllocMenu',
  data() {
    return {
      menuTreeList: [],
      defaultProps: {
        children: 'children',
        label: 'title'
      },
      roleId: null
    }
  },
  created() {
    this.roleId = this.$route.query.roleId
    this.treeList()
    this.getRoleMenu(this.roleId)
  },
  methods: {
    treeList() {
      fetchTreeList().then(response => {
        this.menuTreeList = response.data
      })
    },
    getRoleMenu(roleId) {
      listMenuByRole(roleId).then(response => {
        const menuList = response.data
        const checkedMenuIds = []
        if (menuList != null && menuList.length > 0) {
          for (let i = 0; i < menuList.length; i++) {
            const menu = menuList[i]
            if (menu.parentId !== 0) {
              checkedMenuIds.push(menu.id)
            }
          }
        }
        this.$refs.tree.setCheckedKeys(checkedMenuIds)
      })
    },
    handleSave() {
      const checkedNodes = this.$refs.tree.getCheckedNodes()
      const checkedMenuIds = new Set()
      if (checkedNodes != null && checkedNodes.length > 0) {
        for (let i = 0; i < checkedNodes.length; i++) {
          const checkedNode = checkedNodes[i]
          checkedMenuIds.add(checkedNode.id)
          if (checkedNode.parentId !== 0) {
            checkedMenuIds.add(checkedNode.parentId)
          }
        }
      }
      this.$confirm('是否分配菜单？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const params = new URLSearchParams()
        params.append('roleId', this.roleId)
        params.append('menuIds', Array.from(checkedMenuIds))
        allocMenu(params).then(response => {
          this.$message({
            message: '分配成功',
            type: 'success',
            duration: 1000
          })
          this.$router.back()
        })
      })
    },
    handleClear() {
      this.$refs.tree.setCheckedKeys([])
    }
  }
}
</script>
<style scoped>
</style>
