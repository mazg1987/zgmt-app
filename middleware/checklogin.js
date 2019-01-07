export default async function ({ app , req , redirect , route }){
  //如果用户没有登陆，跳转首页。在pages下的cart.vue中挂载此中间件
  if(!req.isAuthenticated()){
    //重定向页面
    redirect({ path: '/' })
  }
}
