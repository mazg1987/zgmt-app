<template>
  <div class="page-cart">
    <el-row>
      <el-col
        v-if="cart.length"
        :span="24"
        class="m-cart">
        <list :cart-data="cart"/>
        <p>
          应付金额：<em class="money">￥{{ total }}</em>
        </p>
        <div class="post">
          <el-button
            type="primary"
            @click="submit">提交订单</el-button>
        </div>
      </el-col>
      <el-col
        v-else
        class="empty">购物车为空</el-col>
    </el-row>
  </div>
</template>

<script>
  import List from '../components/cart/list.vue'
  import checklogin from '../middleware/checklogin'
  export default {
    components: {
      List
    },
    data() {
      return {
        cartNo:"",
        cart: [{
          name:"商品1",
          price:101,
          count:3
        },
          {
            name:"商品2",
            price:99,
            count:3
          }]
      }
    },
    computed: {
      total() {
        let total = 0
        this.cart.forEach(item => {
            total += item.price * item.count
        })
        return total
      }
    },
    methods:{
      async submit(){
        const { status, data} = await this.$axios.post('/order/createOrder', {
          count: this.cart[0].count,
          price: this.cart[0].price,
          id:this.cartNo
        })
        //console.log(data);
        if (data.code === 0) {
          this.$alert(`恭喜您，已成功下单，订单号:${data.id}`, '下单成功', {
            confirmButtonText: '确定',
            callback: action => {
              location.href = '/order'
            }
          })
        }
      }
    },
    async asyncData(ctx) {
      const { status, data} = await ctx.$axios.get('/cart/getCart', {
        params: {
          id: ctx.query.id
        }
      })

      if(data.code == 0 && JSON.stringify(data.cart) != "{}"){
        return {
          cart : [{
              name: data.cart.name,
              price: data.cart.price,
              count: 1,
            }
          ],
          cartNo : ctx.query.id
        }
      }
    },
    middleware:checklogin
  }
</script>

<style lang="scss">
  @import "@/assets/css/cart/index.scss";
</style>
