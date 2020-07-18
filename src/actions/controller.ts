/* eslint-disable import/first */
import { store } from "../store/index"
import { updateSubscribeState } from './updateState'
import { updateRoom } from './database'
import Taro from '@tarojs/taro'

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
    if (subscribeRoomid && subscribeRoomid !== 0) {
        Taro.showToast({
            title: '只允许同时订阅一个房间哦',
            icon: 'none',
            duration: 2000
        })
    } else {
        updateSubscribeState(openid, nickName, roomid)
        _setSubscribe(true)
        member.push(openid);
        dispatch(updateRoom(roomid, member))
    }
}

export const cancelSubscribe = ({ _setSubscribe, member, openid, roomid }) => {
    Taro.showModal({
        title: "提示",
        content: '确认取消订阅吗？',
        success: function (res) {
            if (res.confirm) {
                _setSubscribe(false)
                let newMember = member.filter((val) => val !== openid)
                dispatch(updateRoom(roomid, newMember, true))
            }
        }
    })
}