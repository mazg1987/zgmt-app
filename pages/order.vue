<template>
  <div class="page-order">
    <el-row>
      <el-col
        :span="4"
        class="navbar"
      >
        <h3>我的美团</h3>
        <dl>
          <dt>我的订单</dt>
          <dd>全部订单<i class="el-icon-arrow-right"/></dd>
          <dd>待付款<i class="el-icon-arrow-right"/></dd>
          <dd>待使用<i class="el-icon-arrow-right"/></dd>
        </dl>
        <dl>
          <dt>我的收藏</dt>
          <dd>收藏的商家<i class="el-icon-arrow-right"/></dd>
          <dd>收藏的团购<i class="el-icon-arrow-right"/></dd>
        </dl>
        <dl>
          <dt>抵用卷</dt>
          <dd>可用卷<i class="el-icon-arrow-right"/></dd>
          <dd>失效卷<i class="el-icon-arrow-right"/></dd>
        </dl>
      </el-col>
      <el-col
        :span="19"
        class="table">
        <el-tabs
          v-model="activeName"
          @tab-click="handleClick">
          <el-tab-pane
            label="全部订单"
            name="all">
            <list :cur="cur"/>
          </el-tab-pane>
          <el-tab-pane
            label="待付款"
            name="unpay">
            <list :cur="cur"/>
          </el-tab-pane>
          <el-tab-pane
            label="待使用"
            name="unuse">
            <list :cur="cur"/>
          </el-tab-pane>
          <el-tab-pane
            label="待评价"
            name="unreplay">
            <list :cur="cur"/>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import List from '../components/order/list.vue'
  import checklogin from '../middleware/checklogin'
  export default {
    components: {
      List
    },
    data() {
      return {
        activeName: 'all',
        list: [
          {status:0,name:"毛肚火锅",count:2,total:1000,imgs:[{url:"http://p0.meituan.net/208.126/deal/3de8818be93f77ac112bf7fd4df179a182081.jpg@100w_100h_1e_1c",title:"代金券"}]},
          {status:1,name:"海底捞",count:3,total:130,imgs:[{url:"http://p0.meituan.net/208.126/deal/3de8818be93f77ac112bf7fd4df179a182081.jpg@100w_100h_1e_1c",title:"代金券"}]},
          {status:0,name:"安逸火锅",count:1,total:80,imgs:[{url:"http://p0.meituan.net/208.126/deal/3de8818be93f77ac112bf7fd4df179a182081.jpg@100w_100h_1e_1c",title:"代金券"}]},
        ],
      }
    },
    computed:{
      cur:function(){
        return this.list.filter(item => {
          if (this.activeName === 'unpay') {
            return item.status === 0
          } else if (this.activeName === 'all') {
            return true
          } else {
            return false
          }
        })
      }
    },
    methods: {
      handleClick: function(tab) {
        this.activeName = tab.name
      }
    },
    async asyncData(ctx){
      const { status, data} = await ctx.$axios.get('/order/getOrders')
      console.log(data);
      if (data.code === 0 && data.list.length) {
        return {
          list: data.list
        }
      }
    },
    middleware:checklogin
  }
</script>

<style lang="scss">
  @import "@/assets/css/order/index.scss";
</style>
