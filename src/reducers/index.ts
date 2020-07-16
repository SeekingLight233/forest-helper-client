import { combineReducers } from 'redux'
import userInfo from './userInfoReducer'
import roomInfo from './roomInfoReducer'
import getRooms from './getRoomsreducer'


export default combineReducers({
  userInfo,
  roomInfo,
  getRooms
})
