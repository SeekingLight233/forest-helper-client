/**
 *@description 选择房间页面
 */
import Nerv from "nervjs";
import { View } from "@tarojs/components";
import "./selectRoom.scss"
import RoomInfo from "../../components/RoomInfo";
import DatePagination from "../../components/DatePagination";


const SelectRoom: React.FC = (props) => {
    return (
        <View className='select-room' style='flex-direction:column'>
            <DatePagination></DatePagination>
            <View className='room-info-area'>
                <RoomInfo></RoomInfo>
                <RoomInfo></RoomInfo>
                <RoomInfo></RoomInfo>
                <RoomInfo></RoomInfo>
                <RoomInfo></RoomInfo>
                <RoomInfo></RoomInfo>
                <RoomInfo></RoomInfo>
            </View>
        </View >
    )
}

export default SelectRoom