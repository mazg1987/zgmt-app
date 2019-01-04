<template>
  <div class="page-detail">
    <el-row>
      <el-col :span="24">
        <crumbs/>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <summa/>
      </el-col>
    </el-row>
    <el-row class="m-title">
      <el-col :span="24">
        <h3>商家团购及优惠</h3>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <list/>
        <div
          class="deal-need-login">
          <img
            src="//p0.meituan.net/codeman/56a7d5abcb5ce3d90fc91195e5b5856911194.png"
            alt="登录查看">
          <span>请登录后查看详细团购优惠</span>
          <el-button
            type="primary"
            round>
            <a href="/login">立即登录</a>
          </el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import Crumbs from '../components/detail/crumbs.vue'
  import Summa from '../components/detail/summary.vue'
  import List from '../components/detail/list.vue'

  export default {
    components: {
      Crumbs,
      Summa,
      List
    },
  }
</script>

<style lang="scss">
  @import "@/assets/css/detail/index.scss";
</style>
