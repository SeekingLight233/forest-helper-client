/* eslint-disable import/first */
/**
 *@description 选择房间中的单个房间组件
 */
import Nerv, { useState } from "nervjs";
import { View, Text } from "@tarojs/components";
import "./RoomInfo.scss"
import { AtAvatar, AtFab } from "taro-ui";


const RoomInfo: React.FC = () => {
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
                <AtAvatar image='cloud://server-ncazq.7365-server-ncazq-1302589525/trees/candy_tree_4.png' size='large' circle ></AtAvatar>
            </View>
            <View className='room-info-detail' style="style='flex-direction:column;">
                <View className='room-info-item' style="style='flex-direction:row;">
                    <View className='at-icon at-icon-home '></View>
                    <Text className='text-info'>SeekingLight</Text>
                </View>

                <View className='room-info-item' style="style='flex-direction:row;">
                    <View className='at-icon at-icon-bell'></View>
                    <Text className='text-info'>14:00</Text>
                </View>

                <View className='room-info-item' style="style='flex-direction:row;">
                    <View className='at-icon at-icon-clock'></View>
                    <Text className='text-info'>120分钟</Text>
                </View>

                <View className='room-info-item' style="style='flex-direction:row;">
                    <View className='at-icon at-icon-file-generic'></View>
                    <Text className='text-info'>this is test para this is test para this is test para </Text>
                </View>

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