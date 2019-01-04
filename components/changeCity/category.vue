<template>
  <div class>
    <!--A-Z的拼音字母-->
    <dl class="m-categroy">
      <dt>按拼音首字母选择：</dt>
      <dd
        v-for="item in list"
        :key="item">
        <!--点击每一个字母使用锚点定位到对应的id-->
        <a :href="'#city-' + item">{{ item }}</a>
      </dd>
    </dl>

    <!--具体城市信息-->
    <dl
      v-for="item in block"
      :key="item.title"
      class="m-categroy-section">
      <!--A-Z的标题信息-->
      <dt :id="'city-' + item.title">{{ item.title }}</dt>
      <!--A-Z下的城市信息-->
      <dd>
        <span
          v-for="c in item.city"
          :key="c">{{ c }}</span>
      </dd>
    </dl>
  </div>
</template>

<script>
  //处理汉子到拼音
  import pyjs from 'js-pinyin'
  export default {
    data() {
      return {
        list: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
        //城市信息
        block: [{title:"A",city:["鞍山，安庆"]}]
      }
    },
    async mounted() {
      const blocks = []
      const {status,data} = await this.$axios.get('/geo/city')
      if (status === 200) {
        //A-Z的信息
        let p
        //A-Z的ascii值
        let c
        //保存城市信息的对象
        const d = {}
        data.city.forEach(item => {
          // pyjs.getFullChars() 字母拼音
          p = pyjs.getFullChars(item.name).toUpperCase().slice(0, 1)
          // 获取A-Z的ascii的值
          c = p.charCodeAt(0)
          if (c > 64 && c < 91) {
            //如果d对象中指定的key不存在，则初始化
            if (!d[p]) {
              d[p] = []
            }
            //否则将城市内容添加到d对象中

            d[p].push(item.name)
          }
        })
        //将d对象转换为数组
        for (const [k, v] of Object.entries(d)) {
          blocks.push({
            title: k,
            city: v
          })
        }
        //将数组按照A-Z排序
        blocks.sort((a, b) => a.title.charCodeAt(0) - b.title.charCodeAt(0))
        this.block = blocks
      }
    }
  }
</script>

<style lang="scss">
  @import "@/assets/css/changeCity/categroy.scss";
</style>
