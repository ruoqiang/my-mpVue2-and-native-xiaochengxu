import storage from 'good-storage'
import { noToken } from './config'

const TOKEN_KEY = '__TOKEN__'

export function saveToken(token) {
  storage.set(TOKEN_KEY, token)
  return token
}
export function deleteToken() {
  storage.remove(TOKEN_KEY)
  return noToken
}

export function loadToken() {
  return storage.get(TOKEN_KEY)
}

const USERAPPLYSTEP_KEY = '__userApplyStep__'
export function saveUserApplyStep(stepData) {
  // let stepDatas = storage.get(USERAPPLYSTEP_KEY)
  storage.set(USERAPPLYSTEP_KEY, stepData)
  // console.log('new', JSON.stringify(stepDatas))
  // localStorage.setItem('__userApplyStep__', JSON.stringify(stepDatas))
  return stepData
}

export function loadUserApplyStep() {
  return storage.get(USERAPPLYSTEP_KEY, {})
}
