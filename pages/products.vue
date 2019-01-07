<template>
  <el-row class="page-product">
    <el-col :span="19">
      <crumbs :keyword="keyword"/>
      <category
        :types="types"
        :areas="areas"/>
      <list :list="list"/>
    </el-col>
    <el-col :span="5">
      <amap
        v-if="point.length"
        :point="point"/>
    </el-col>
  </el-row>
</template>

<script>
  import Crumbs from '../components/products/crumbs.vue'
  import Category from '../components/products/category.vue'
  import List from '../components/products/list.vue'
  import Amap from '../components/public/map.vue'
  export default {
    components: {
      Crumbs,
      Category,
      List,
      Amap
    },
    data: () => {
      return {
        keyword:'',
        types: [
          {type:"美食",module:["全部","小吃快餐","咖啡酒吧"]},
          {type:"酒店住宿",module:["全部","温泉酒店","情侣酒店","经济型酒店","高端酒店","品牌连锁"]},
        ],
        areas: [
          {type:"滨湖区",module:["河埒口蠡园/太湖景区","新体育中心/奥林花园梅园","灵山大佛/拈花湾景区","胡埭建筑路/稻香路太湖学院"]},
          {type:"新吴区",module:["长江北路沿线"]}
        ],
        list : [
            {
              "type": "movie;体育休闲服务;影剧院;电影院",
              "img": [{
                "title": [],
                "url": "http://store.is.autonavi.com/showpic/44ae1984d71b3eb9ddf250b73074c3f7"
              }],
              "name": "夏港影剧院",
              "comment": 3551,
              "rate": 4.9,
              "price": 0,
              "tel": "",
              "status": "可订明日",
              "location": "120.214916,31.896740",
              "module": "movie",
              "address": "临港街道夏港镇南巷95号",
              "tag":""
            },
            {
              "type": "part;餐饮服务;中餐厅;中餐厅",
              "img": [{
                "title": [],
                "url": "http://store.is.autonavi.com/showpic/44ae1984d71b3eb9ddf250b73074c3f7"
              }],
              "name": "长城园私房菜",
              "comment": 188,
              "rate": 3.5,
              "price": 36,
              "scene": "清水虾,酸菜河豚,清汤,时蔬,蚌肉豆腐,碎肉鸡爪,老坛酸菜鱼,鱼香肉丝,农家小炒鸡,雪菜炒鱿鱼,三色笋丝,笑口常开,泡椒凤爪,双色鱼头,排骨营养砂锅",
              "tel": "0510-86892788",
              "status": "可订明日",
              "location": "120.270234,31.904495",
              "module": "part",
              "address": "澄江街道中街55号",
              "tag": "清水虾,酸菜河豚,清汤,时蔬,蚌肉豆腐,碎肉鸡爪,老坛酸菜鱼,鱼香肉丝,农家小炒鸡,雪菜炒鱿鱼,三色笋丝,笑口常开,泡椒凤爪,双色鱼头,排骨营养砂锅"
            },
        ],
        point: []
      }
    },
    watch: {
      $route: {
        handler: async function(val, oldVal){
          console.log(val.query.name);
          this.keyword = val.query.name;
          const { status:status2, data:{pois}} = await this.$axios.get('/search/resultsByKeywords', {
            params: {
              keyword:this.keyword,
              city:this.$store.state.geo.position||"无锡市"
            }
          })
          this.list = pois;
        }
      },
      //监听list属性的变化，当list改变之后更新point的信息
      list:function(val, oldVal){
        if(val.length!=0){
          this.point = val.length!=0?val[0].location.split(','):["100.11","100.11"]
        }
      }
    },
    mounted(){
      window.addEventListener('scroll', this.handleScroll)
      var map = document.querySelector(".m-map");
      this.map = map;
    },
    methods:{
      handleScroll () {
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        //console.log(scrollTop)
        //position:fixed;right:0px;top:200px
        if(scrollTop >200){
          this.map.style.position = 'fixed';
          this.map.style.right = '0px';
          this.map.style.top = '0px';
        }
        else{
          this.map.style.position = 'relative';
        }
        //计算当前滚动到第几个商品
        var idx = Math.ceil((scrollTop-382)/172.0);
        if(idx<0){
          idx = 0;
        }
        else if(idx > this.list.length-1){
          idx = this.list.length-1;
        }
        //console.log(idx);
        //根据滚动到第几个商品改变地图的point值
        this.point = this.list.length!=0?this.list[0].location.split(','):["100.11","100.11"]

      },
    },
    async asyncData(ctx) {
      //console.log("products-----------------");

      const keyword = ctx.query.name

      const { status, data} = await ctx.$axios.get('/category/crumbs', {
        params: {
          city:ctx.store.state.geo.position||"无锡市"
        }
      })

      const { status:status2, data:{pois}} = await ctx.$axios.get('/search/resultsByKeywords', {
        params: {
          keyword,
          city:ctx.store.state.geo.position||"无锡市",
        }
      })

      if(data.code == 0 ){
        return{
          types : data.types.slice(0,5),
          areas : data.areas.slice(0,5),
          list : pois,
          keyword:keyword,
          point: pois.length!=0?pois[0].location.split(','):["100.11","100.11"]
        }
      }
    }
  }
</script>

<style lang="scss">
  @import "@/assets/css/products/index.scss";
</style>
