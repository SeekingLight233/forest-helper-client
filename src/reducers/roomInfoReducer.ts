import { ROOM_INFO } from '../constants/actionTypes'

export interface RoomState {
    roomid: string,
    nickName: string,
    treeSpecies: string,
    treeImg: string,
    startTime: string,
    duration: string,
    commit: string,
    isRoomOwner?: undefined | boolean
}

const INITIAL_STATE: RoomState = {
    roomid: "",
    nickName: "",
    treeSpecies: "",
    treeImg: "",
    startTime: "",
    duration: "",
    commit: "",
    isRoomOwner: undefined
}

export default function roomInfo(state = INITIAL_STATE, action): RoomState {
    const { roomid, nickName, treeSpecies, treeImg, startTime, duration, commit, isRoomOwner } = action
    switch (action.type) {
        case ROOM_INFO:
            return {
                ...state,
                roomid, nickName, treeSpecies, startTime, duration, commit, treeImg, isRoomOwner
            }
        default:
            return state
    }
}
