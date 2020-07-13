import {
  USER_INFO
} from '../constants/actionTypes'



// 异步的action
export function asyncTest(payload) {
  return async (dispatch, getState) => {
    setTimeout(() => {
      dispatch({
        type: USER_INFO,
        openid: payload.openid
      })
    }, 2000)
  }
}
