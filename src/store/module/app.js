
export default {
  state: {
    loading: true,
  },
  mutations: {
    setLoading (state, payload) {
      state.loading = payload
    },
  },
  actions: {
    saveLoading ({ commit }, payload) {
      commit('setLoading', payload)
    },
  }
}
