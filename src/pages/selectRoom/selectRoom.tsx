/* eslint-disable import/first */
/**
 *@description 选择房间页面
 */
import Nerv, { useEffect } from "nervjs";
import { View } from "@tarojs/components";
import "./selectRoom.scss"
import DatePagination from "../../components/DatePagination";
import { getRooms } from "../../actions/mainAction";
import Taro from "@tarojs/taro"
import { connect, ConnectedProps } from "nerv-redux";
import { RoomState } from "../../reducers/roomInfoReducer";
import RoomInfo from "../../components/RoomInfo";
import { getTime } from "../../utils/date";


const mapStateToProps = (state) => {
    const { list } = state.getRooms;
    return { list }
}
const connector = connect(mapStateToProps);
type ModelState = ConnectedProps<typeof connector>
const SelectRoom: React.FC<ModelState> = (props) => {
    const list: RoomState[] = props.list;
    const dispatch = props.dispatch;
    // const [list, setList] = useState([])
    const fetchData = () => {
        Taro.showLoading({
            title: '加载中',
        })
        dispatch(getRooms("7月16日"))
    }

    useEffect(() => {
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const renderRooms = () => {
        return list.map((item, index) => {
            const { treeImg, nickName, startTime, duration, commit } = item
            return <RoomInfo key={item.roomid} treeImg={treeImg} nickName={nickName} startTime={getTime(startTime as any)} duration={duration} commit={commit}></RoomInfo>
        })
    }

    return (
        <View className='select-room' style='flex-direction:column'>
            <DatePagination></DatePagination>
            <View className='room-info-area'>
                {renderRooms()}
            </View>
        </View >
    )
}

export default connect(mapStateToProps)(SelectRoom)