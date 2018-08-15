
import {loadUserApplyStep} from './cache'

const state = {
  userApplyStep: loadUserApplyStep() || {qw: '122'}
}

export default state
