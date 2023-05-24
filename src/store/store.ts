// store.ts

import { createStore, Store } from 'vuex'

interface State {
  count: number
}

const store: Store<State> = createStore({
  state(): State {
    return {
      count: 0
    }
  },
  mutations: {
    increment(state: State) {
      state.count++
    },
    decrement(state: State) {
      state.count--
    }
  },
  actions: {
    asyncIncrement({ commit }) {
      setTimeout(() => {
        commit('increment')
      }, 1000)
    }
  },
  modules: {}
})

export default store