/* eslint-disable import/first */
import { store } from "../store/index"
import { updateSubscribeState } from './updateState'
import { updateRoom } from './database'
import Taro from '@tarojs/taro'
import { USER_INFO, CLEAR_ROOMS } from '../constants/actionTypes'
import { SUBSCRIBER_TEMP_ID, CANCEL_TEMP_ID } from '../constants/common'

const { dispatch } = store

export const handleSubscribe = ({ nickName, host, subscribeRoomid, openid, roomid, member, _setSubscribe }) => {
    if (nickName === host) {
        Taro.showToast({
            title: '不用订阅自己哦，到时间会给你发通知的~~',
            icon: 'none',
            duration: 3000
        })
        return
    }
    // 订阅拦截 只允许同时订阅一个房间
    console.log(subscribeRoomid.length);

    if (subscribeRoomid && subscribeRoomid.length >= 3) {
        Taro.showToast({
            title: '最多只允许同时订阅三个房间哦',
            icon: 'none',
            duration: 3000
        })
    } else {
        Taro.requestSubscribeMessage({
            // 这个地方传两个模板id收不到后面的通知，暂时先
            tmplIds: [SUBSCRIBER_TEMP_ID, CANCEL_TEMP_ID],
            success: function (res) {
                console.log(res);
                if (res[SUBSCRIBER_TEMP_ID] === "accept") {
                    let subscribeRoomid = store.getState().userInfo.subscribeRoomid
                    subscribeRoomid.push(roomid)
                    updateSubscribeState(openid, nickName, subscribeRoomid)
                    _setSubscribe(true)
                    member.push(openid);
                    dispatch(updateRoom(roomid, member))

                } else {
                    Taro.showToast({
                        title: "订阅失败",
                        icon: "none",
                        duration: 2000
                    })
                    return
                }

            }

        })

    }
}

export const cancelSubscribe = ({ _setSubscribe, member, openid, roomid, nickName }) => {
    Taro.showModal({
        title: "提示",
        content: '确认取消订阅吗？',
        success: function (res) {
            if (res.confirm) {
                const subscribeRoomid = store.getState().userInfo.subscribeRoomid;
                const newSubscribeRoomid = subscribeRoomid.filter((val) => val !== roomid)
                updateSubscribeState(openid, nickName, newSubscribeRoomid)
                _setSubscribe(false)
                let newMember = member.filter((val) => val !== openid)
                dispatch(updateRoom(roomid, newMember, true))
            }
        }
    })
}
/**
 * @description Share page: Update user status
 */
export const updateUserState = async () => {
    return new Promise(async (resolve, reject) => {
        let res = await wx.cloud.callFunction({
            name: 'login',
        })
        console.log("login success");
        console.log(res.result.result);
        const { subscribeRoomid, createdRoomid, openid } = res.result.result
        const userState = store.getState().userInfo;
        dispatch({
            type: USER_INFO,
            ...userState,
            subscribeRoomid,
            createdRoomid,
            openid
        })
        resolve(res.result.result)
    })

}