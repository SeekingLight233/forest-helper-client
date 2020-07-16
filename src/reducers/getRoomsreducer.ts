import { GET_ROOMS } from '../constants/actionTypes'
import { RoomState } from './roomInfoReducer'

export interface RoomListState {
    list: RoomState[]
}

const INITIAL_STATE: RoomListState = {
    list: []
}

export default function getRooms(state = INITIAL_STATE, action): RoomListState {
    const { list } = action
    switch (action.type) {
        case GET_ROOMS:
            return {
                ...state,
                list
            }
        default:
            return state
    }
}
