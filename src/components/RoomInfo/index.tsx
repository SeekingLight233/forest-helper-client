/* eslint-disable import/first */
/**
 *@description 选择房间中的单个房间组件
 */
import Nerv, { useState } from "nervjs";
import { View, Text } from "@tarojs/components";
import "./RoomInfo.scss"
import { AtAvatar, AtFab } from "taro-ui";
// eslint-disable-next-line import/first
import Taro from "@tarojs/taro"
import { ROOM_INFO } from "../../constants/actionTypes";

import { store } from "../../store/index"

interface IProps {
    treeImg: string,
    nickName: string,
    startTime: string,
    duration: string,
    treeSpecies: string,
    commit?: string,
    roomid?: string,
}

const RoomInfo: React.FC<IProps> = (props) => {
    const { treeImg, nickName, startTime, duration, commit, roomid, treeSpecies } = props
    const [subscribe, setSubscribe] = useState(false)

    const [touch, setTouch] = useState(false)

    const handleTouchStart = () => {
        console.log("start");
        setTouch(true)
    }

    const handleTouchEnd = () => {
        setTouch(false)
        // @todo dispatch room info
        store.dispatch(
            {
                type: ROOM_INFO,
                roomid,
                nickName: nickName,
                treeSpecies,
                treeImg,
                startTime,
                duration,
                commit
            })
        Taro.navigateTo({ url: "../room/room" })


    }

    const handleSubscribe = () => {
        setSubscribe(true)
    }

    const cancelSubscribe = () => {
        setSubscribe(false)
    }

    const cls = touch ? "room-info touch" : "room-info"

    return (
        <View className={cls} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
            <View className='tree-icon'>
                <AtAvatar image={treeImg} size='large' circle ></AtAvatar>
            </View>
            <View className='room-info-detail' style="style='flex-direction:column;">
                <View className='room-info-item' style="style='flex-direction:row;">
                    <View className='at-icon at-icon-home '></View>
                    <Text className='text-info'>{nickName}</Text>
                </View>

                <View className='room-info-item' style="style='flex-direction:row;">
                    <View className='at-icon at-icon-bell'></View>
                    <Text className='text-info'>{startTime}</Text>
                </View>

                <View className='room-info-item' style="style='flex-direction:row;">
                    <View className='at-icon at-icon-clock'></View>
                    <Text className='text-info'>{duration}</Text>
                </View>

                {
                    commit
                        ?
                        <View className='room-info-item' style="style='flex-direction:row;">
                            <View className='at-icon at-icon-file-generic'></View>
                            <Text className='text-info'>{commit}</Text>
                        </View>
                        :
                        null
                }


            </View>
            <View className='subscribe-area'>
                {subscribe ?
                    <AtFab className='active' onClick={cancelSubscribe}>
                        <Text className='at-fab__icon at-icon at-icon-check'></Text>
                    </AtFab> :
                    <AtFab onClick={handleSubscribe}>
                        <Text className='at-fab__icon at-icon at-icon-bell'></Text>
                    </AtFab>
                }
            </View>
        </View >
    )
}

export default RoomInfo