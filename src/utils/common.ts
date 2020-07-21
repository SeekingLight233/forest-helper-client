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




