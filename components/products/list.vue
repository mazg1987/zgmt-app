<template>
  <div class="m-products-list">
    <dl>
      <dd
        v-for="item in nav"
        :key="item.name"
        :class="[item.name,item.active?'s-nav-active':'']"
        @click="navSelect"
      >{{ item.txt }}</dd>
    </dl>
    <ul>
      <Item
        v-for="(item,idx) in list"
        :key="idx"
        :meta="item"/>
    </ul>
  </div>
</template>

<script>
  import Item from './product.vue'
  export default {
    components: {
      Item
    },
    props: {
      list: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        nav: [
          {
            name: 's-default',
            txt: '智能排序',
            active: true
          },
          {
            name: 's-price',
            txt: '价格最低',
            active: false
          },
          {
            name: 's-visit',
            txt: '人气最高',
            active: false
          },
          {
            name: 's-comment',
            txt: '评价最高',
            active: false
          }
        ]
      }
    },
    methods: {
      navSelect: function(e) {
        var ele = e.target;
        this.nav.map(item=>{
          item.active = false;
          if(item.txt === ele.innerText){
            item.active = true;
          }
        })

        this.list.sort((item1,item2)=>{
          if(ele.innerText === "价格最低"){
            return item1.price - item2.price;
          }
          else if(ele.innerText === "人气最高"){
            return item2.comment - item1.comment;
          }
          else if(ele.innerText === "评价最高"){
            return item2.rate - item1.rate;
          }
        })
      }
    }
  }
</script>
