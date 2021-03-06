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
 * @description 检测链接密钥
 */
export const filterRoomKey = (commit: string) => {
    let room_key = ""

    if (commit.length > 10) {
        const start = commit.indexOf('token=');
        if (start > 0) {
            const tmp = commit.slice(start + 6);
            if (tmp.length === 6 || tmp.length === 7) {
                room_key = tmp
            } else {
                let res = tmp.slice(0, -2);
                room_key = res;
            }
            Taro.showToast({
                title: '检测到密钥',
                duration: 1000
            })
        }

    } else {
        room_key = commit
    }

    return room_key
}

/**
 * @description 改变树种列表
 */

export const hoistTree = (TREES, treeIndex: number) => {
    let tmp = TREES.splice(treeIndex, 1)
    TREES.unshift(...tmp)
    Taro.setStorageSync('TREES', TREES)
}


