export const state = () => ({
  showSearch: false,
})

export const getters = {
  showSearch: (state) => state.showSearch,
}
export const mutations = {
  setShowSearch(state, value) {
    console.log('value', value)
    state.showSearch = value
  },
  handleSearch(state, value) {
    console.log('value', value)
    // state.showAccount = value
  },
}
