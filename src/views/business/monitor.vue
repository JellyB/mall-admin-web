<template>
  <el-form ref="postForm" :model="postForm" :rules="rules">
    <div class="detail-container">
      <el-row>
        <el-col :span="18">
          <el-form-item prop="interfaceName" label="接口地址">
            <el-select v-model="postForm.insterfaceName" placeholder="请输入JSF地址" style="width:500px">
              <el-option />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item prop="alias" label="别名">
            <el-select v-model="postForm.alias" placeholder="请选择别名">
              <el-option />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-form-item>
            <el-button
              type="success"
              @click="interfaceAnalyze"
            >解析
            </el-button>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item prop="methodName" label="方法名">
            <el-select v-model="postForm.methodName" placeholder="请选择方法名" style="width:200px">
              <el-option />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item prop="alias" label="别名">
            <el-input placeholder="请选择别名" />
          </el-form-item>
        </el-col>
      </el-row>
    </div>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      postForm: []
    }
  }
}
</script>
<style lang="scss" scoped>
  .detail-container {
    padding: 40px 50px 20px;
    .preview-img {
      width: 200px;
      height: 270px;
    }
  }
</style>
