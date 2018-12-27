<template>
  <div>
    <!-- gutter	栅格间隔 -->
    <el-row
      :gutter="0"
      class="m-header">
      <!-- span	栅格占据的列数 (共24) -->
      <el-col :span="5">
        <GEO/>
      </el-col>
      <el-col :span="5">
        <User/>
      </el-col>
      <el-col :span="14">
        <Nav/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import GEO from './geo.vue'
  import User from './user.vue'
  import Nav from './nav.vue'
  export default {
    components:{
      GEO,
      User,
      Nav
    }
  }
</script>

<style>
  @import '@/assets/css/public/layout.scss';
  @import '@/assets/css/public/header/index.scss';
</style>
