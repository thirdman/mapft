// stores handled in individual store files
export const state = () => ({
  counter: 0, // TODO refactor this out.
})

export const mutations = {
  increment(state) {
    state.counter++ // TODO refactor this out.
  },
}
