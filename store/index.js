export const state = () => ({

})

export const mutations = {

}

export const actions = {
  //将菜单信息写入到vuex实例中
  async nuxtServerInit ({ commit }, { req ,app }) {
    {
      const {status,data} = await app.$axios.get('/geo/menu')
      //console.log("----sss------");
      commit('home/setMenu', data.code === 0 ? data.menu : [])
    }

    /*{
      const {status,data} = await app.$axios.get('/search/hotPlace',{
        params: {
           "city": app.store.state.geo.position.replace('市', ''),
        }
      })
      //console.log(data);
      commit('home/setHotPlace', data.code === 0 ? data.top : [])
    }*/
  }
}
