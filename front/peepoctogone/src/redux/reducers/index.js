import { combineReducers } from 'redux'

import authentication from './authentication'
import business from './business'
import job from './job'
import selection from './selection'

export default combineReducers({
  authentication,
  business,
  job,
  selection
})
