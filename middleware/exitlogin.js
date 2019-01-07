//退出登录的中间件
export default async function ({ app , req , redirect , route }){
  const { status, data } = await app.$axios.get('/users/exit')
  //console.log(status,data);
  if (status === 200 && data && data.code === 0) {
    //刷新页面
    window.location.href = "/"
  }
}
