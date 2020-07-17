import {
  GET_ROOMS,
  SUBSCRIBE_ROOM,
  USER_INFO
} from '../constants/actionTypes'
// eslint-disable-next-line import/first
import Taro from "@tarojs/taro"
import { MAX_PAGE_LENGTH } from '../constants/common'
import { store } from "../store/index"

const db = wx.cloud.database()

// @todo 不太确定小程序是否支持async和await，就先这样吧
export function getRooms(date: string, page: number) {
  return (dispatch, getState) => {
    const list: Array<any> = getState().getRooms.list
    Taro.showLoading({
      title: '加载中',
    })
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

export function subscribeRoom(roomid: number, member: string[]) {
  console.log(member);
  return (dispatch, getState) => {
    console.log("I am here!!!");
    db.collection('rooms').where({
      roomid
    }).update({
      data: {
        member
      },
      success: function (res) {
        Taro.hideLoading()
        console.log("OK!!!");
        console.log(res.data)
      }
    })

  }
}

export const deleteRoom = (roomid: number) => {
  db.collection('rooms').where({
    roomid
  }).remove({
    success: function (res) {
      Taro.hideLoading()
      console.log("delete OK!!!");
      Taro.navigateBack({
        complete: () => {
          const state = store.getState().userInfo;
          store.dispatch({
            type: USER_INFO,
            ...state,
            deleteRoomid: roomid
          })
        }
      })
    }
  })
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
