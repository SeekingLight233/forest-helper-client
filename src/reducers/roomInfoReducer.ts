import { ROOM_INFO } from '../constants/actionTypes'

export interface RoomState {
    _openid: string,
    roomid: number,
    nickName: string,
    treeSpecies: string,
    treeImg: string,
    startTime: string,
    duration: string,
    commit: string,
    member: string[]
    isRoomOwner?: undefined | boolean
}

const INITIAL_STATE: RoomState = {
    _openid: "",
    roomid: 0,
    nickName: "",
    treeSpecies: "",
    treeImg: "",
    startTime: "",
    duration: "",
    commit: "",
    isRoomOwner: undefined,
    member: []
}

export default function roomInfo(state = INITIAL_STATE, action): RoomState {
    const { roomid, nickName, treeSpecies, treeImg, startTime, duration, commit, isRoomOwner, member, _openid } = action
    switch (action.type) {
        case ROOM_INFO:
            return {
                ...state,
                roomid, nickName, treeSpecies, startTime, duration, commit, treeImg, isRoomOwner, member, _openid
            }
        default:
            return state
    }
}
