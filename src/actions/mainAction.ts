import {
  GET_ROOMS
} from '../constants/actionTypes'
// eslint-disable-next-line import/first
import Taro from "@tarojs/taro"
import { MAX_PAGE_LENGTH } from '../constants/common'

// @todo 不太确定小程序是否支持async和await，就先这样吧
export function getRooms(date: string, page: number) {
  return (dispatch, getState) => {
    const list: Array<any> = getState().getRooms.list
    const db = wx.cloud.database()
    db.collection('rooms').skip(page * MAX_PAGE_LENGTH).limit(MAX_PAGE_LENGTH).where({
      date
    }).get({
      success: function (res) {
        dispatch({
          type: GET_ROOMS,
          list: list.concat(res.data)
        })
        Taro.hideLoading()
        if (res.data.length < 1) {
          if (page === 0 && list.length === 0) {
            Taro.showToast({
              title: "还没有人创建房间哦",
              icon: "none",
              duration: 3000
            })
            return
          }
          Taro.showToast({
            title: "已经没有数据啦~~",
            icon: "none"
          })
        }
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
