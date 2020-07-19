/* eslint-disable import/first */
import Nerv, { useState } from "nervjs";
import { View, Button } from "@tarojs/components";
import { AtCard, AtIcon, AtActionSheet, AtActionSheetItem, AtButton } from "taro-ui"
import "./ShareCard.scss"
import Taro from '@tarojs/taro'
import { RoomState } from "../../reducers/roomInfoReducer";
import { deleteRoom } from '../../actions/database';


interface IProps {
    roomOwner: boolean
}

const ShareCard: React.FC<RoomState & IProps> = (props) => {
    const { host, treeSpecies, startTime, duration, commit, roomOwner, roomid } = props
    const onDeleteRoom = () => {
        Taro.showActionSheet({
            itemList: ["确认"],
            success: function (res) {
                if ((res as any).tapIndex === 0) {
                    Taro.showLoading({
                        title: "正在删除..."
                    })
                    deleteRoom(roomid)
                }
            },
            fail: function (res) {
                console.log(res.errMsg)
            }
        })

    }

    const onShareRoom = () => {
        console.log("share btn");
    }
    return (
        <View className='share-card' style='flex-direction:column'>
            <View className='share-item'>
                <AtCard extra={host} title='房主' renderIcon={<AtIcon value='home' size={15} color='#2C405A'></AtIcon>}>
                </AtCard>
            </View>

            <View className='share-item'>
                <AtCard extra={treeSpecies} title='树种' renderIcon={<AtIcon value='tag' size={15} color='#2C405A'></AtIcon>}>
                </AtCard>
            </View>
            <View className='share-item'>
                <AtCard extra={startTime} title='开始时间' renderIcon={<AtIcon value='bell' size={15} color='#2C405A'></AtIcon>}>
                </AtCard>
            </View>

            <View className='share-item'>
                <AtCard extra={duration} title='发车时长' renderIcon={<AtIcon value='clock' size={15} color='#2C405A'></AtIcon>}>
                </AtCard>
            </View>

            {commit ? <View className='share-item'>
                <AtCard extra={commit} title='备注信息' renderIcon={<AtIcon value='file-generic' size={15} color='#2C405A'></AtIcon>}>
                </AtCard>
            </View> : null}

            {roomOwner ? <View className='delete-area'>
                <Button type='warn' onClick={onDeleteRoom}>删除房间</Button>
                <Button type='primary' openType='share' onClick={onShareRoom}>分享</Button>
            </View> : null}
        </View>
    )
}

export default ShareCard