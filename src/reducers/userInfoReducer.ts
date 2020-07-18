import { USER_INFO } from '../constants/actionTypes'

export interface UserState {
  openid: string,
  nickName: string,
  deleteRoomid: number, //房间信息中useEffect的依赖，实现路由返回刷新
  subscribeRoomid: number
}

const INITIAL_STATE: UserState = {
  openid: "openid",
  nickName: "nickName",
  deleteRoomid: 0,
  subscribeRoomid: 0
}

export default function userInfo(state = INITIAL_STATE, action): UserState {
  switch (action.type) {
    case USER_INFO:
      return {
        ...state,
        openid: action.openid,
        nickName: action.nickName,
        deleteRoomid: action.deleteRoomid,
        subscribeRoomid: action.subscribeRoomid
      }
    default:
      return state
  }
}
