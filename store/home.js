export const state = () => ({
  menu: [],
  hotPlace: []
})

export const mutations = {
  setMenu(state, val) {
    state.menu = val
  },
  setHotPlace(state, val) {
    state.hotPlace = val
  }
}
