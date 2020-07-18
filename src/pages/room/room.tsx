/**
 * @description 创建成功以后的房间信息页面
 */
import Nerv, { useState, useEffect } from "nervjs";
import { View, Text, Button } from "@tarojs/components";
import { AtFab, AtAvatar, AtButton } from "taro-ui"
import "./room.scss"
import ShareCard from "../../components/ShareCard";

// eslint-disable-next-line import/first
import { connect, ConnectedProps } from "nerv-redux";
import { updateSubscribeState } from '../../actions/updateState';
import { handleSubscribe, cancelSubscribe } from '../../actions/controller';

const mapStateToProps = (state) => {
    const { roomid, host, treeSpecies, startTime, duration, commit, treeImg, isRoomOwner, member, _openid } = state.roomInfo;
    const { openid, nickName, subscribeRoomid } = state.userInfo
    return { roomid, host, treeSpecies, startTime, duration, commit, treeImg, isRoomOwner, member, openid, _openid, subscribeRoomid }
}

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>


const Room: React.FC<ModelState> = (props) => {
    const { treeImg, isRoomOwner, member, openid, _openid, roomid, nickName, host, subscribeRoomid } = props;
    const [roomOwner, setRoomOwner] = useState(isRoomOwner)
    const [subscribe, setSubscribe] = useState(false)

    const _setSubscribe = (state: boolean) => {
        setSubscribe(state)
    }

    useEffect(() => {
        const isSubscribe = member.includes(openid)
        if (isSubscribe) {
            updateSubscribeState(openid, nickName, roomid)
        }
        setSubscribe(isSubscribe)
        if (openid === _openid) {
            setRoomOwner(true)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

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
            _setSubscribe
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
                        <AtFab className='active' onClick={onSubscribe}>
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