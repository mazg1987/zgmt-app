<template>
  <div class="m-user">
    <template v-if="user">
      欢迎您，
      <span class="username">{{ user }}</span>
      [<router-link to="/exit">退出</router-link>]
    </template>
    <template v-else>
      <nuxt-link
        to="/login"
        class="login">立即登录</nuxt-link>
      <nuxt-link
        class="register"
        to="/register">注册</nuxt-link>
    </template>
  </div>
</template>

<script>
    export default {
      data() {
        return {
          user: ''
        }
      },
      async mounted() {
        const { status, data} = await this.$axios.get('/users/getUser')
        if (status === 200) {
          //console.log(status,data);
          this.user = data.user
        }
      }
    }
</script>

<style>

</style>
