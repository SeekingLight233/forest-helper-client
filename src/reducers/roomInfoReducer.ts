import { ROOM_INFO } from '../constants/actionTypes'

export interface RoomState {
    roomid: number,
    nickName: string,
    treeSpecies: string,
    treeImg: string,
    startTime: string,
    duration: string,
    commit: string
}

const INITIAL_STATE: RoomState = {
    roomid: 0,
    nickName: "",
    treeSpecies: "",
    treeImg: "",
    startTime: "",
    duration: "",
    commit: ""
}

export default function roomInfo(state = INITIAL_STATE, action) {
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
