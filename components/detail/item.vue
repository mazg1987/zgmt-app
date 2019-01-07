<template>
  <li
    v-if="meta.photos.length"
    class="m-detail-item">
    <dl class="section">
      <dd>
        <img
          :src="meta.photos&&meta.photos.length!=0?meta.photos[0].url:''"
          :alt="meta.photos&&meta.photos.length!=0?meta.photos[0].title:'默认'">
      </dd>
      <dd>
        <h4>{{ meta.name }}</h4>
        <p>
          <span v-if="meta.ticket_ording">剩余：{{ meta.ticket_ording }}</span>
          <span v-if="meta.dealine">截止日期：{{ meta.dealine }}</span>
        </p>
        <p>
          <span class="price">{{ Number(meta.cost) }}</span>
          <sub>门店价{{ Number(meta.cost) }}</sub>
        </p>
      </dd>
      <dd>
        <el-button
          type="warning"
          round
          @click="createCart">立即抢购</el-button>
      </dd>
    </dl>
  </li>
</template>

<script>
  export default {
    props: {
      meta: {
        type: Object,
        default:()=> {
          return {}
        }
      }
    },
    methods: {
      async createCart(){
        const {status,data} = await this.$axios.post('/cart/create', {
            //随机生成一个id
            id: Math.random().toString().slice(3, 9),
            detail: {
              name: this.meta.name,
              price: this.meta.cost,
              imgs: this.meta.photos
            }
        })
        if (data.code == 0) {
          //这里如果要做购物车的登陆拦截的话应该用window.location.href而非this.$router.push
          //因为window.location.href 会重新刷新页面导致pages/cart.vue中间件的方法在服务端执行
          //而this.$router.push方法不会刷新页面导致pages/cart.vue中间件的方法在客户端执行，拿不到req对象
          window.location.href = `/cart/?id=${data.id}`
          //this.$router.push({path: '/cart', query: {id: data.id}})
        } else {
          console.log('error')
        }
      }
    }
  }
</script>
