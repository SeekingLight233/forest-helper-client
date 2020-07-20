/* eslint-disable import/no-duplicates */
/* eslint-disable import/first */
/**
 * @description 创建成功以后的房间信息页面
 */
import Nerv, { useState, useEffect } from "nervjs";
import { View, Text, Button } from "@tarojs/components";
import { AtFab, AtAvatar, AtButton } from "taro-ui"
import "./room.scss"
import ShareCard from "../../components/ShareCard";
import { connect, ConnectedProps } from "nerv-redux";
import { updateSubscribeState } from '../../actions/updateState';
import { handleSubscribe, cancelSubscribe, updateUserState } from '../../actions/controller';
import { useShareAppMessage } from '@tarojs/taro';
import Taro, { useRouter } from '@tarojs/taro'
import { queryRoomById } from '../../actions/database';
import { set as setGlobalData, get as getGlobalData } from "../../store/global_data"

const mapStateToProps = (state) => {
    const { roomid, host, treeSpecies, startTime, duration, commit, treeImg, isRoomOwner, member, _openid } = state.roomInfo;
    const { openid, nickName, subscribeRoomid, createdRoomid } = state.userInfo
    return {
        createdRoomid, nickName, roomid, host, treeSpecies, startTime, duration, commit, treeImg, isRoomOwner, member, openid, _openid, subscribeRoomid
    }
}

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>


const Room: React.FC<ModelState> = (props) => {
    const { createdRoomid, duration, treeImg, isRoomOwner, member, openid, _openid, roomid, nickName, host, subscribeRoomid, startTime, treeSpecies } = props;
    const [roomOwner, setRoomOwner] = useState(_openid == openid)
    const [subscribe, setSubscribe] = useState(false)
    const [share, setShare] = useState(false)
    const router = useRouter()

    const _setSubscribe = (state: boolean) => {
        setSubscribe(state)
    }



    useEffect(async () => {
        // 分享进入时的入口参数
        const shareid = wx.getEnterOptionsSync().query.shareid;
        if (shareid && !router.params.select_room) {
            const sharer = wx.getEnterOptionsSync().query.sharer;
            const info: any = await updateUserState()
            // 允许分享者通过卡片删除
            if (sharer == info.openid) { // At this time, the openid here is for the visitor
                setRoomOwner(true)
            }

            if (shareid == info.subscribeRoomid) {
                setSubscribe(true)
            }
            queryRoomById(Number(shareid))
        } else {
            // 判断该房间是否为已订阅的状态
            const isSubscribe = subscribeRoomid === roomid;
            if (isSubscribe) {
                updateSubscribeState(openid, nickName, roomid)
            }
            setSubscribe(isSubscribe)
            if (roomid === createdRoomid) {
                setRoomOwner(true)
            }
            return () => {

            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useShareAppMessage(res => {
        if (res.from === 'button') {
            console.log(res.target)
        }
        return {
            title: `我将在 ${startTime} 种下一颗"${treeSpecies}",时长是${duration},快来订阅吧！`,
            path: `/pages/room/room?shareid=${roomid}&sharer=${openid}`,
            imageUrl: treeImg
        }
    })

    const onCancelSubscribe = () => {
        handleSubscribe({
            nickName,
            host,
            subscribeRoomid,
            openid,
            roomid,
            member,
            _setSubscribe
        })
    }

    const onSubscribe = () => {
        cancelSubscribe({
            member,
            openid,
            roomid,
            _setSubscribe,
            nickName
        })
    }

    return (
        <View className='room' style='flex-direction:column'>
            <View className='title'>
                <View className='icon'></View><Text className='title-text'>房间信息</Text>
            </View>

            <View className='tree-img' style='flex-direction:row'>
                <AtAvatar image={treeImg} size='large' circle ></AtAvatar>
            </View>

            <View className='share-card-content'>
                <ShareCard {...props} roomOwner={roomOwner}></ShareCard>
            </View>

            {roomOwner ?
                <View className='share-btn'>
                </View>
                :
                <View className='subscribe-area'>
                    {subscribe ? (

                        <AtFab className='active' onClick={onSubscribe} >
                            <Text className='at-fab__icon at-icon at-icon-check'></Text>
                        </AtFab>
                    ) : (
                            <AtFab onClick={onCancelSubscribe}>
                                <Text className='at-fab__icon at-icon at-icon-bell'></Text>
                            </AtFab>
                        )}
                </View>
            }
        </View >
    )
}

export default connect(mapStateToProps)(Room)