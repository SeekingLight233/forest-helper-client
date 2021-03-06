import {
  GET_ROOMS,
  SUBSCRIBE_ROOM,
  USER_INFO,
  ROOM_INFO
} from '../constants/actionTypes'
// eslint-disable-next-line import/first
import Taro from "@tarojs/taro"
import { MAX_PAGE_LENGTH } from '../constants/common'
import { store } from "../store/index"
import { resolveTime, getTime } from '../utils/date'

const db = wx.cloud.database()


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
 * @description 根据房间号查询
 */
export function queryRoomById(roomid: number) {
  db.collection('rooms').where({
    roomid
  }).get({
    success: function (res) {
      const roomInfo = res.data[0]
      let startTime = roomInfo.startTime;
      startTime = getTime(startTime);
      const roomState = store.getState().roomInfo;
      store.dispatch({
        type: ROOM_INFO,
        ...roomState,
        ...roomInfo,
        startTime
      })
    }
  })
}

/**
 * @description 更新房间状态
 * @param roomid 房间号 
 * @param member 更新后的member数组
 * @param cancelSubscribe 是否取消订阅
 */
export function updateRoom(roomid: number, member: string[], cancelSubscribe?: boolean): any {
  return (dispatch, getState) => {
    let subscribeRoomid = getState().userInfo.subscribeRoomid
    console.log(subscribeRoomid);
    Taro.showLoading({
      title: "请稍等"
    })
    wx.cloud.callFunction({
      name: 'subscribe',
      data: {
        roomid,
        member,
        cancelSubscribe,
        subscribeRoomid
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
        Taro.showToast({
          title: "取消订阅",
          icon: "none"
        })
        // dispatch({
        //   type: USER_INFO,
        //   ...userInfoState,
        //   subscribeRoomid: 0
        // })
      }
    })
  }
}
//＠todo 这个逻辑需要挪到服务端
/**
 * @description 删除房间
 * @param roomid  要删除的房间号
 */
export const deleteRoom = (roomid: number) => {
  wx.cloud.callFunction({
    name: 'deleteRoom',
    data: {
      roomid,
    }
  }).then(() => {
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
  })
}




