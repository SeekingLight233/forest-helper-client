import { ROOM_INFO } from '../constants/actionTypes'

export interface RoomState {
    roomid: number,
    nickName: string,
    treeSpecies: string,
    treeImg: string,
    startTime: string,
    duration: string,
    commit: string,
    isRoomOwner?: boolean
}

const INITIAL_STATE: RoomState = {
    roomid: 0,
    nickName: "",
    treeSpecies: "",
    treeImg: "",
    startTime: "",
    duration: "",
    commit: "",
    isRoomOwner: false
}

export default function roomInfo(state = INITIAL_STATE, action): RoomState {
    const { roomid, nickName, treeSpecies, treeImg, startTime, duration, commit } = action
    switch (action.type) {
        case ROOM_INFO:
            return {
                ...state,
                roomid, nickName, treeSpecies, startTime, duration, commit, treeImg
            }
        default:
            return state
    }
}
