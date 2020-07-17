/**
 * @description 创建成功以后的房间信息页面
 */
import Nerv, { useState, useEffect } from "nervjs";
import { View, Text, Button } from "@tarojs/components";
import { AtFab, AtAvatar } from "taro-ui"
import "./room.scss"
import ShareCard from "../../components/ShareCard";

// eslint-disable-next-line import/first
import { connect, ConnectedProps } from "nerv-redux";

const mapStateToProps = (state) => {
    const { roomid, nickName, treeSpecies, startTime, duration, commit, treeImg, isRoomOwner, member, _openid } = state.roomInfo;
    const { openid } = state.userInfo
    return { roomid, nickName, treeSpecies, startTime, duration, commit, treeImg, isRoomOwner, member, openid, _openid }
}

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>


const Room: React.FC<ModelState> = (props) => {
    const { treeImg, isRoomOwner, member, openid, _openid } = props;
    const [roomOwner, setRoomOwner] = useState(isRoomOwner)
    const [subscribe, setSubscribe] = useState(false)

    useEffect(() => {
        console.log(openid);
        console.log(_openid);
        if (openid === _openid) {
            setRoomOwner(true)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

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
                    <AtFab>
                        <Text className='at-fab__icon at-icon at-icon-share-2'></Text>
                    </AtFab>
                </View>
                :
                <View className='subscribe-area'>
                    {/* @todo 禁止房主订阅 */}
                    {subscribe ? (
                        <AtFab className='active' >
                            <Text className='at-fab__icon at-icon at-icon-check'></Text>
                        </AtFab>
                    ) : (
                            <AtFab >
                                <Text className='at-fab__icon at-icon at-icon-bell'></Text>
                            </AtFab>
                        )}
                </View>
            }
        </View >
    )
}

export default connect(mapStateToProps)(Room)