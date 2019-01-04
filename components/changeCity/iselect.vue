<template>
  <div class="m-iselect">
    <span class="name">按省份选择:</span>
    <el-select
      v-model="pvalue"
      placeholder="省份">
      <el-option
        v-for="item in province"
        :key="item.value"
        :label="item.label"
        :value="item.value"/>
    </el-select>
    <el-select
      v-model="cvalue"
      :disabled="!city.length"
      placeholder="城市">
      <el-option
        v-for="item in city"
        :key="item.value"
        :label="item.label"
        :value="item.value"/>
    </el-select>

    <!--http://element.eleme.io/#/zh-CN/component/input
        远程搜索 ，输入内容的时候触发querySearchAsync事件，当选择列表内容的时候触发handleSelect方法
      -->
    <el-autocomplete
      v-model="input"
      :fetch-suggestions="querySearchAsync"
      placeholder="请输入城市中文或拼音"
      @select="handleSelect"
    />
  </div>
</template>

<script>
  export default {
    data() {
      return {
        province: [], //省份列表
        pvalue: '',   //省份信息
        city: [],      //城市列表
        cvalue: '',    //城市信息
        input: '',     //直接输入城市名称
        cities: []     //指定条件过滤后的城市列表
      }
    },
    watch: {
      //监听省份的变化，一旦省份变化了就自动请求对应省份下的城市信息的数据
      pvalue: async function(newPvalue) {
        const { status, data} = await this.$axios.get(`/geo/province/${newPvalue}`)
        if (data.code === 0) {
          this.city = data.city.map(item => {
              return {
                value: item.id,
                label: item.name
              }
            })
          this.cvalue = ''
        }
      }
    },
    mounted: async function() {
      //页面挂载完毕的时候请求所有的省份数据
      const { status, data} = await this.$axios.get('/geo/province')
      if (data.code === 0) {
        this.province = data.province.map(item => {
            return {
              value: item.id,
              label: item.name
            }
        })
      }
    },
    methods: {
      //远程搜索：两个参数，一个是查询内容，一个是回调函数
      querySearchAsync: async function(query, cb) {
        if (this.cities.length) {
          // 搜‘北’，显示所有带‘北’的数据
          cb(this.cities.filter(item => item.value.indexOf(query) > -1))
        } else {
          const { status, data} = await this.$axios.get('/geo/city')
          if (data.code === 0) {
            this.cities = data.city.map(item => {
                return {
                  value: item.name
                }
              })
            cb(this.cities.filter(item => item.value.indexOf(query) > -1))
          } else {
            cb([])
          }
        }
      },
      //远程搜索选择了对应的城市信息
      handleSelect: function(item) {
        //console.log(item.value)
        //跳转首页同时传递选中的城市信息
        window.location.href = "/?city="+item.value;
      }
    }
  }
</script>

<style lang="scss">
  @import "@/assets/css/changeCity/iselect.scss";
</style>
