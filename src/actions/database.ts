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
        console.log(res);
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

/**
 * @description 更新房间状态
 * @param roomid 房间号 
 * @param member 更新后的member数组
 * @param cancelSubscribe 是否取消订阅
 */
export function updateRoom(roomid: number, member: string[], cancelSubscribe?: boolean): any {
  return (dispatch, getState) => {
    Taro.showLoading({
      title: "请稍等"
    })
    console.log(roomid);
    console.log(member);
    wx.cloud.callFunction({
      name: 'subscribe',
      data: {
        roomid,
        member
      }
    }).then(() => {
      console.log("subscribe ok!!!");
      const userInfoState = store.getState().userInfo;
      Taro.hideLoading()

      if (!cancelSubscribe) {
        Taro.showToast({
          title: "订阅成功！",
          icon: "success"
        })
      }

      if (cancelSubscribe) {
        dispatch({
          type: USER_INFO,
          ...userInfoState,
          subscribeRoomid: 0
        })
      }
    })
  }
}

/**
 * @description 删除房间
 * @param roomid  要删除的房间号
 */
export const deleteRoom = (roomid: number) => {
  db.collection('rooms').where({
    roomid
  }).remove({
    success: function (res) {
      const rooms = store.getState().getRooms;
      Taro.hideLoading()
      const list = rooms.list.filter(item => item.roomid !== roomid)
      Taro.navigateBack({
        complete: () => {
          store.dispatch({
            type: GET_ROOMS,
            ...rooms,
            list
          })
        }
      })
    }
  })
}


