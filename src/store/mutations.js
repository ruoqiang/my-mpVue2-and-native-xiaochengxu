import * as types from './mutation-types'

const mutations = {
  // [types.LOGIN]: (state, data) => {
  //     localStorage.__TOKEN__ = data
  //     state.token = data
  // },
  // [types.LOGOUT]: (state) => {
  //     localStorage.removeItem('token')
  //     state.__TOKEN__ = '11111'
  // },
  // [types.TITLE]: (state, data) => {
  //     state.title = data
  // },
  // [types.SET_TOKEN]: (state, data) => {
  //     state.token = data
  //     localStorage.__TOKEN__ = data
  // },
  [types.SET_USER_APPLY_STEP]: (state, data) => {
    state.userApplyStep = data
  }
}

export default mutations
