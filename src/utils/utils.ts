import { USER_INFO } from "../constants/actionTypes";
// eslint-disable-next-line import/first
import Taro from "@tarojs/taro"


// export const getLateTime = () => {
//     const now = Date.now();
//     const twoHourLate = now + 7200000;
//     const res = new Date(twoHourLate)
//     return res
// }

export const getDate = () => {
    const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth();
    const day = date.getDate();
    return `${year}-${month + 1}-${day}`
}

export const getChineseDate = () => {
    let date = new Date();
    const month = date.getMonth();
    const day = date.getDate();
    return `${month + 1}月${day}日`
}

export const getTime = () => {
    const time = new Date()

    let hours: string | number = time.getHours();
    hours = hours < 10 ? `0${hours}` : `${hours}`
    let min: string | number = time.getMinutes();
    min = min < 10 ? `0${min}` : `${min}`

    return `${hours}:${min}`
}

export const resolveTime = (date: string, time: string) => {
    const dateArr = date.split("-").map((item) => Number(item))
    const timeArr = time.split(":").map((item) => Number(item))
    return new Date(dateArr[0], dateArr[1] - 1, dateArr[2], timeArr[0], timeArr[1]);
}

export const resolveDateToZh = (date: string) => {
    let dateArr = date.split("-");
    if (dateArr[1].charAt(0) === '0') {
        dateArr[1] = dateArr[1].slice(-1);
    }
    return `${dateArr[1]}月${dateArr[2]}日`
}

export const generateRoomID = () => {
    let num = Math.random();
    return Math.floor(num * 100000000)
}


/**
 * @description 将用户信息存储到store
 * @param e onGetUserInfo 中的事件回调参数
 */
export const saveUserInfo = ({ e, storageOpenid, storageNickName, dispatch }) => {
    const data = JSON.parse(e.detail.rawData)
    if (storageOpenid && storageNickName) {
        console.log("username exist");
        dispatch({
            type: USER_INFO,
            openid: storageOpenid,
            nickName: storageNickName
        })
    } else {
        wx.cloud.callFunction({
            name: 'login',
            data: {},
            success: res => {
                console.log("login success")
                console.log(res.result.openid);
                console.log(data.nickName);

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