import {
  GET_ROOMS
} from '../constants/actionTypes'
// eslint-disable-next-line import/first
import Taro from "@tarojs/taro"

export function getRooms(date: string) {
  return (dispatch, getState) => {
    const db = wx.cloud.database()
    db.collection('rooms').where({
      date
    }).get({
      success: function (res) {
        dispatch({
          type: GET_ROOMS,
          list: res.data
        })
        Taro.hideLoading()
      }
    })

  }
}


// 异步的action
// export function asyncTest(payload) {
//   return async (dispatch, getState) => {
//     setTimeout(() => {
//       dispatch({
//         type: USER_INFO,
//         openid: payload.openid
//       })
//     }, 2000)
//   }
// }
