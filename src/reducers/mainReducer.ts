import { ADD, MINUS, USER_INFO } from '../constants/actionTypes'

export interface UserState {
  openid: string
}

const INITIAL_STATE: UserState = {
  openid: "abcdefg"
}

export default function counter(state = INITIAL_STATE, action) {
  switch (action.type) {
    case USER_INFO:
      return {
        ...state,
        openid: action.openid
      }
    default:
      return state
  }
}
