import { combineReducers } from 'redux'
import userInfo from './userInfoReducer'
import roomInfo from './roomInfoReducer'

export default combineReducers({
  userInfo,
  roomInfo
})
