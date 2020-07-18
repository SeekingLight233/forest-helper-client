import { USER_INFO, ROOM_INFO } from '../constants/actionTypes'
import { store } from "../store/index"

const { dispatch } = store

/**
 * @description 更新store中用户订阅的状态
 */
export const updateSubscribeState = (__openid, __nickName, __roomid) => {
    dispatch({
        type: USER_INFO,
        openid: __openid,
        nickName: __nickName,
        subscribeRoomid: __roomid
    })
}

/**
 * @description 这里主要是为了实现房间详情信息页面的复用
 */
export const updateRoomInfoState = ({ __roomid, __host, __treeSpecies, __treeImg, __startTime, __duration, __commit, __openid }) => {
    dispatch({
        type: ROOM_INFO,
        roomid: __roomid,
        host: __host,
        treeSpecies: __treeSpecies,
        treeImg: __treeImg,
        startTime: __startTime,
        duration: __duration,
        commit: __commit,
        isRoomOwner: false,
        _openid: __openid
    })
}
