export const state = () => ({
  showSearch: false,
});

export const getters = {
  showSearch: (state) => state.showSearch,
};
export const mutations = {
  gareth(state, value) {
    console.log(state);
  },
};
