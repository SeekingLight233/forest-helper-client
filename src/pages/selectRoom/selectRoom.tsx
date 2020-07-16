/**
 *@description 选择房间页面
 */
import Nerv, { useEffect } from "nervjs";
import { View } from "@tarojs/components";
import "./selectRoom.scss"
import RoomInfo from "../../components/RoomInfo";
import DatePagination from "../../components/DatePagination";


const SelectRoom: React.FC = (props) => {

    const fetchData = () => {
        const db = wx.cloud.database()
        db.collection('rooms').where({
            date: '7月16日',
        }).get({
            success: function (res) {
                console.log(res.data)
            }
        })
    }

    useEffect(() => {
        fetchData()
    }, [])
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