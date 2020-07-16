/* eslint-disable import/first */
/**
 *@description 选择房间中的单个房间组件
 */
import Nerv, { useState } from "nervjs";
import { View, Text } from "@tarojs/components";
import "./RoomInfo.scss"
import { AtAvatar, AtFab } from "taro-ui";

interface IProps {
    treeImg: string,
    nickName: string,
    startTime: string,
    duration: string,
    commit?: string
}

const RoomInfo: React.FC<IProps> = (props) => {
    const { treeImg, nickName, startTime, duration, commit } = props
    const [subscribe, setSubscribe] = useState(false)

    const handleSubscribe = () => {
        setSubscribe(true)
    }

    const cancelSubscribe = () => {
        setSubscribe(false)
    }
    return (
        <View className='room-info'>
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
                    commit ?
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