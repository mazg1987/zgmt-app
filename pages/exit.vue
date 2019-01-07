<template>
  <div/>
</template>

<script>
  import exitlogin from '../middleware/exitlogin'
  export default {
    data(){
      return {
        mydata:"测试"
      }
    },
    layout: 'blank',
    // 在应用中的特定页面设置中间件
    middleware: exitlogin
  }
</script>
