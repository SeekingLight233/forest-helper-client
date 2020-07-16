import { USER_INFO } from '../constants/actionTypes'

export interface UserState {
  openid: string,
  nickName: string,
}

const INITIAL_STATE: UserState = {
  openid: "openid",
  nickName: "nickName",
}

export default function userInfo(state = INITIAL_STATE, action) {
  switch (action.type) {
    case USER_INFO:
      return {
        ...state,
        openid: action.openid,
        nickName: action.nickName
      }
    default:
      return state
  }
}
