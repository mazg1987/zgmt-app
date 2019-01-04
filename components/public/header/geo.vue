<template>
  <div class="m-geo">
    <i class="el-icon-location"/>{{ $store.state.geo.position }}
    <nuxt-link
      class="changeCity"
      to="/changeCity">切换城市</nuxt-link>
    [香河 廊坊 天津]
  </div>
</template>


<script>
  export default {
    data(){
      return{
        position:'苏州市',
      }
    },
    async mounted() {
      //获取请求参数信息
      function getUrlParam(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg);  //匹配目标参数
        if (r != null) return decodeURIComponent(r[2]); return null; //返回参数值
      }
      console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk");
      var selCity = getUrlParam("city");
      //如果城市选择的信息，则使用地理定位的功能
      if(!selCity){
        //请求搜狐的地理定位接口
        var oscript = document.createElement('script');
        oscript.src = 'http://pv.sohu.com/cityjson?ie=utf-8';
        document.body.appendChild(oscript);

        //当script标签加载完毕之后改变city信息
        var that = this;
        oscript.onload = async function(){
          //that.position = returnCitySN.cname.substr(3);
          that.$store.commit("geo/setPosition",returnCitySN.cname.substr(3))

          const {status,data} = await that.$axios.get('/search/hotPlace',{
            params: {
              "city": that.$store.state.geo.position.replace('市', ''),
            }
          })
          console.log(data);
          that.$store.commit('home/setHotPlace', data.code === 0 ? data.top : [])
        }
      }
      //如果在选择城市页面选择了对应的城市
      else{
        this.$store.commit("geo/setPosition",selCity)
      }

    },
    methods:{

    }
  }
</script>

<style lang="css">
</style>
