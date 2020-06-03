import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    classificationType: ''
  },
  mutations: {
    changeActionType (state, data) {
      state.classificationType = data
    }
  },
  actions: {
  },
  modules: {
  }
})
