<template>
  <div class="m-menu">
    <!--@mouseleave="navLeave" 鼠标离开dl的时候让detail隐藏，只需要修改kind为空字符串就可以了-->
    <dl
      class="nav"
      @mouseleave="navLeave">
      <dt>全部分类</dt>
      <!-- @mouseenter="navEnter" 鼠标进入每一个dd的时候给kind赋值
         <i :class="item.type"/>  绑定item的type值，在navEnter中会用到，给kind赋值
        -->
      <dd
        v-for="(item, index) in $store.state.home.menu"
        :key="index"
        @mouseenter="navEnter">
        <i :class="item.type"/>
        {{ item.name }}
        <span class="arrow"/>
      </dd>
    </dl>
    <!--
    curdetail : 计算属性,根据当前的kind从menu中筛选结果
    -->
    <div
      v-if="kind"
      class="detail"
      @mouseenter="detailEnter"
      @mouseleave="detailLeave">
      <template v-for="(item, index) in curdetail.child">
        <h4 :key="index">{{ item.title }}</h4>
        <span
          v-for="v in item.child"
          :key="v">{{ v }}</span>
      </template>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
         //当前移动到主菜单的类型
         kind: '',
         //主菜单数据
         menu: [
           {
             type: 'food',
             name: '美食',
             child: [
               {
                 title: '美食',
                 child: ['代金券', '甜点饮品', '火锅', '自助餐', '小吃快餐']
               },
               {
                 title: '美食1',
                 child: ['代金券1', '甜点饮品1', '火锅1', '自助餐1', '小吃快餐1']
               }
             ]
           },
           {
             type: 'takeout',
             name: '外卖',
             child: [
               {
                 title: '外卖',
                 child: ['美团外卖']
               }
             ]
           }
         ]
      }
    },
    computed: {
      //从主菜单中筛选出符合当前kind条件下的菜单信息
      curdetail() {
         return this.$store.state.home.menu.filter(item => {
           return item.type === this.kind
         })[0]
      }
    },
    methods: {
      //鼠标进入每一个dd菜单
      navEnter(e) {
        this.kind = e.target.querySelector('i').className
      },
      //鼠标离开nav延迟150毫秒让kind清空。这边需要延迟，原因是如果立马清空kind则移出dl，移入右侧的detail的时候detail不会显示
      navLeave() {
        this._timer = setTimeout(() => {
            this.kind = ''
        }, 150)
      },
      //如果鼠标移出nav然后立马移入detail，则不需要清除kind，此时右侧的detail仍然会显示
      detailEnter() {
        clearTimeout(this._timer)
      },
      //当移出detail的时候清空kind
      detailLeave() {
        this.kind = ''
      }
    },

  }
</script>

<style lang="scss">
</style>
