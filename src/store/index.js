import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import state from './state'
import mutations from './mutations'

// import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  actions,
  getters,
  state,
  mutations
  // strict: debug
  // plugins: [
  //   createPersistedState({
  //     storage: {
  //       getItem: key => wx.getStorageSync(key),
  //       setItem: (key, value) => wx.setStorageSync(key, value),
  //       removeItem: key => wx.clearStorage()
  //     }
  //   })
  // ]
})
