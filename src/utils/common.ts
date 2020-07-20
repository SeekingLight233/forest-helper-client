import { USER_INFO } from "../constants/actionTypes";
// eslint-disable-next-line import/first
import Taro from "@tarojs/taro"

/**
 * @description 将用户信息存储到store
 * @param e onGetUserInfo 中的事件回调参数
 */
export const saveUserInfo = async ({ e, storageOpenid, storageNickName, dispatch, state }) => {
    const data = JSON.parse(e.detail.rawData)
    if (storageOpenid && storageNickName) {
        // 这个地方不用穿参数，云端可以获取到openid
        let res = await wx.cloud.callFunction({ name: 'getUserInfo' })
        const { subscribeRoomid, createdRoomid } = res.result.data
        dispatch({
            type: USER_INFO,
            ...state,
            openid: storageOpenid,
            nickName: storageNickName,
            subscribeRoomid,
            createdRoomid
        })
        Taro.hideLoading()

    } else {
        let res = await wx.cloud.callFunction({ name: 'login' })
        Taro.setStorageSync("openid", res.result.openid)
        Taro.setStorageSync("nickName", data.nickName)
        dispatch({
            type: USER_INFO,
            openid: res.result.openid,
            nickName: data.nickName
        })
        Taro.hideLoading()
    }
}

