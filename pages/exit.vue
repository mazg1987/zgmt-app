<template>
  <div/>
</template>

<script>
  export default {
    layout: 'blank',
    // 在应用中的特定页面设置中间件
    middleware: async ctx => {
      const { status, data } = await ctx.$axios.get('/users/exit')
      if (status === 200 && data && data.code === 0) {
        window.location.href = '/'
      }
    }
  }
</script>
