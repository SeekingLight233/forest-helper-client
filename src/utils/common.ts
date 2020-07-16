import { USER_INFO } from "../constants/actionTypes";
// eslint-disable-next-line import/first
import Taro from "@tarojs/taro"

/**
 * @description 将用户信息存储到store
 * @param e onGetUserInfo 中的事件回调参数
 */
export const saveUserInfo = ({ e, storageOpenid, storageNickName, dispatch }) => {
    const data = JSON.parse(e.detail.rawData)
    if (storageOpenid && storageNickName) {
        console.log("exist");
        dispatch({
            type: USER_INFO,
            openid: storageOpenid,
            nickName: storageNickName
        })
    } else {
        wx.cloud.callFunction({
            name: 'login',
            success: res => {
                console.log("login success");
                Taro.setStorageSync("openid", res.result.openid)
                Taro.setStorageSync("nickName", data.nickName)
                dispatch({
                    type: USER_INFO,
                    openid: res.result.openid,
                    nickName: data.nickName
                })
            },
            fail: err => {
                console.error(err)
            }
        })
    }
}