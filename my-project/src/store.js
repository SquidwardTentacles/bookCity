import vue from 'vue'
import vuex from 'vuex'

vue.use(vuex)

const store = new vuex.Store({
  state: {
    stateHeight: 0
  },
  mutations: {
    setStatusHeight: (state, height) => {
      state.stateHeight = height
    }
  }
})

export default store
