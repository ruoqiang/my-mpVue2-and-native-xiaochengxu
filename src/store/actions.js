import * as types from './mutation-types'
import {saveUserApplyStep} from './cache'

// export const saveToken = function ({commit}, token) {
//   commit(types.SET_TONEN, saveToken(token))
// }
//
// export const deleteToken = function ({commit}, token) {
//   commit(types.SET_TONEN, deleteToken(token))
// }
export const saveUserApplyStepList = function ({commit}, data) {
  commit(types.SET_USER_APPLY_STEP, saveUserApplyStep(data))
}
