import { combineReducers } from 'redux'
import userInfo, { UserState } from './userInfoReducer'
import roomInfo, { RoomState } from './roomInfoReducer'
import getRooms, { RoomListState } from './getRoomsreducer'


export default combineReducers({
  userInfo,
  roomInfo,
  getRooms
})
