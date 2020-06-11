import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    classificationType: '',
    userSesson: {
      account: '',
      password: ''
    }
  },
  mutations: {
    changeActionType (state, data) {
      state.classificationType = data
    },
    changeUserSesson (state, data) {
      if (state) {
        state.userSesson.account = data.account
        state.userSesson.password = data.password
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
