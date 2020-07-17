/* eslint-disable import/first */
/**
 *@description 选择房间页面
 */
import Nerv, { useEffect, useState } from "nervjs";
import { View } from "@tarojs/components";
import "./selectRoom.scss"
import DatePagination from "../../components/DatePagination";
import { getRooms } from "../../actions/mainAction";
import Taro, { useReachBottom } from "@tarojs/taro"
import { connect, ConnectedProps } from "nerv-redux";
import { RoomState } from "../../reducers/roomInfoReducer";
import RoomInfo from "../../components/RoomInfo";
import { getTime, getChineseDate } from "../../utils/date";
import { CLEAR_ROOMS } from "../../constants/actionTypes";


const mapStateToProps = (state) => {
    const { list } = state.getRooms;
    const { deleteRoomid } = state.userInfo;
    return { list, deleteRoomid }
}

const connector = connect(mapStateToProps);
type ModelState = ConnectedProps<typeof connector>
const SelectRoom: React.FC<ModelState> = (props) => {
    const list: RoomState[] = props.list;
    const deleteRoomid: number = props.deleteRoomid;
    const dispatch = props.dispatch;

    const [page, setPage] = useState(0)
    const [date, setDate] = useState(Date.now())

    const fetchData = () => {
        const resolveDate = getChineseDate(date)
        dispatch(getRooms(resolveDate, page))
    }
    /**
     * @description 请求首屏数据
     */
    useEffect(() => {
        console.log(deleteRoomid);

        fetchData()
        if (list.length <= 5)
            // 销毁组件清空状态
            return () => {
                dispatch({ type: CLEAR_ROOMS })
                setPage(0)
            }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [date, deleteRoomid])


    /**
     * @description 触底加载下一页
     */
    useReachBottom(() => {
        setPage(val => val + 1)
        Taro.showLoading({
            title: '加载中',
        })
        dispatch(getRooms(date, page))
    })

    const renderRooms = () => {
        return list.map((item, index) => {
            const { treeImg, nickName, startTime, duration, commit, roomid, treeSpecies, member, _openid } = item

            return <RoomInfo _openid={_openid} key={item.roomid} roomid={roomid} member={member} treeSpecies={treeSpecies} treeImg={treeImg} nickName={nickName} startTime={getTime(startTime as any)} duration={duration} commit={commit}></RoomInfo>
        })
    }

    /**
     * @description 改变日期触发重渲染
     */
    const changeDate = (newDate) => {
        setDate(newDate)
        setPage(0)
    }
    return (
        <View className='select-room' style='flex-direction:column'>
            <DatePagination date={date} page={page} changeDate={changeDate}></DatePagination>
            <View className='room-info-area'>
                {renderRooms()}
            </View>
        </View >
    )
}

export default connect(mapStateToProps)(SelectRoom)