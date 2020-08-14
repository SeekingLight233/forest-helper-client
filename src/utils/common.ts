import { USER_INFO } from "../constants/actionTypes";
// eslint-disable-next-line import/first
import Taro from "@tarojs/taro"

/**
 * @description 将用户信息存储到store
 * @param e onGetUserInfo 中的事件回调参数
 */
export const saveUserInfo = ({ e, storageOpenid, storageNickName, dispatch, state }) => {
    wx.cloud.callFunction({
        name: 'login',
        success: function (res) {
            console.log("login success");
            console.log(res)
            const data = JSON.parse(e.detail.rawData)
            const { subscribeRoomid, createdRoomid, openid } = res.result.result
            dispatch({
                type: USER_INFO,
                nickName: data.nickName,
                subscribeRoomid,
                createdRoomid,
                openid
            })
            Taro.hideLoading()
        },
    })
}

/**
 * @description 自动检测链接密钥
 */
export const filterRoomKey = (commit) => {
    let room_key = null
    if (commit.length > 8) {
        let reg = /(?<=token=).* /
        let res = commit.match(reg)
        try {
            room_key = res[0].trim()
        } catch (error) {
            Taro.showToast({
                title: '额，好像没有检测到房间密钥。。',
                icon: 'none',
                duration: 2000,
            })
            return
        }
    } else {
        room_key = commit
    }
    return room_key
}



