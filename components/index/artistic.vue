<template>
  <section class="m-istyle">
    <!--dl显示导航  :class="{active:kind==='all'}"  表示当kind值为all的时候取active样式 -->
    <dl>
      <dt>有格调</dt>
      <dd
        :class="{active:kind==='all'}"
        kind="all"
        keyword="景点"
        @mouseover="over">全部</dd>
      <dd
        :class="{active:kind==='part'}"
        kind="part"
        keyword="美食"
        @mouseover="over">约会聚餐</dd>
      <dd
        :class="{active:kind==='spa'}"
        kind="spa"
        keyword="丽人"
        @mouseover="over">丽人SPA</dd>
      <dd
        :class="{active:kind==='movie'}"
        kind="movie"
        keyword="电影"
        @mouseover="over">电影演出</dd>
      <dd
        :class="{active:kind==='travel'}"
        kind="travel"
        keyword="旅游"
        @mouseover="over">品质出游</dd>
    </dl>

    <!--内容区域
        v-for="item in cur"  cur是从数据源列表中根据kind类型筛选出符合条件的数据
        -->
    <ul class="ibody">
      <li
        v-for="item in cur"
        :key="item.title">
        <!--:body-style="{ padding: '0px' }"  修改card的样式-->
        <el-card
          :body-style="{ padding: '0px' }"
          shadow="never">
          <img
            :src="item.img"
            class="image">
          <ul class="cbody">
            <li class="title">{{ item.name }}</li>
            <li class="pos"><span>{{ item.address }}</span></li>
            <li class="price">￥<em>{{ item.price }}</em><span>/起</span></li>
          </ul>
        </el-card>
      </li>
    </ul>
  </section>
</template>

<script>
  export default {
    data: () => {
      return {
        kind: 'all',
        list: {
          all: [
             {
               imgUrl:
                '//p0.meituan.net/hotel/01b1941a2e0bf25aed72f69b39e2298c362774.png@368w_208h_1e_1c',
               title: '东方之家酒店',
               bottomInfo: '酒店套餐',
               currentPrice: 398
             },
            {
              imgUrl:
                '//p0.meituan.net/hotel/01b1941a2e0bf25aed72f69b39e2298c362774.png@368w_208h_1e_1c',
              title: '东方之家酒店',
              bottomInfo: '酒店套餐',
              currentPrice: 398
            }
          ],
          part: [],
          spa: [],
          movie: [],
          travel: []
        }
      }
    },
    computed: {
      cur(){
        return this.list[this.kind]
      }
    },
    async mounted() {
      const {status,data} = await this.$axios.get('/search/resultsByKeywords', {
        params: {
          city: this.$store.state.geo.position || "无锡市",
          keyword: 'all'
        }
      })
      if(data.code === 0){
        this.list['all'] = data.pois;
      }
      else{
        this.list['all'] = [];
      }
    },
    methods:{
      over: async function(e) {
        const dom = e.target
        this.kind = dom.getAttribute('kind')
        const { status, data} = await this.$axios.get('/search/resultsByKeywords', {
          params: {
            keyword:this.kind,
            city: this.$store.state.geo.position || "无锡市",
          }
        })
        if(data.code === 0){
          this.list[this.kind] = data.pois;
        }
        else{
          this.list[this.kind] = [];
        }
      }
    }
  }
</script>

<style lang="scss">
  @import '@/assets/css/index/artistic.scss';
</style>
